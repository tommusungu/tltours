import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";
import { AlertDialog } from "@radix-ui/react-alert-dialog";

// Define the structure of the contact data
interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

// Define the return type of the hook
interface UseAddContact {
  isAdding: boolean;
  addContact: (contactData: ContactData) => Promise<void>;
  showDialog: boolean;
  closeDialog: () => void;
}

const useAddContact = (): UseAddContact => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false); // To control the dialog visibility

  const addContact = async (contactData: ContactData): Promise<void> => {
    setIsAdding(true);

    try {
      if (!validateContactData(contactData)) {
        showErrorDialog("Please fill out all fields before sending the message.");
        setIsAdding(false);
        return;
      }

      await addDoc(collection(firestore, "contact"), contactData);
      showSuccessDialog("Message sent successfully.");
    } catch (error) {
      showErrorDialog("Error sending message.");
    } finally {
      setIsAdding(false);
    }
  };

  const validateContactData = (contactData: ContactData): boolean => {
    const { firstName, lastName, email, message } = contactData;
    return !!(firstName && lastName && email && message); // Ensure all fields are non-empty
  };

  const showSuccessDialog = (message: string) => {
    setShowDialog(true);
    // You can handle success message dialog here if needed
  };

  const showErrorDialog = (message: string) => {
    setShowDialog(true);
    // You can handle error message dialog here if needed
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return { isAdding, addContact, showDialog, closeDialog };
};

export default useAddContact;
