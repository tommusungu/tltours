import { useEffect } from "react";
import { Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";
import PageMeta from "@/components/blogs/PageMeta";

const Success: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extracting data from the URL
  const tourId = searchParams.get("tourId") || "";
  const tourTitle = decodeURIComponent(searchParams.get("tourTitle") || "");
  const participants = searchParams.get("participants") || "";
  const myPrice = searchParams.get("price") || "";
  const selectedDate = decodeURIComponent(searchParams.get("selectedDate") || "");
  const fullName = decodeURIComponent(searchParams.get("fullName") || "");
  const phoneNumber = decodeURIComponent(searchParams.get("phoneNumber") || "");
  const email = decodeURIComponent(searchParams.get("email") || "");

  const price = parseFloat(myPrice) / 100;

  // Generate a random ticket ID of length 10
  const generateRandomTicketId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const ticketId = generateRandomTicketId();

  useEffect(() => {
    const hasSubmitted = localStorage.getItem(`hasSubmitted_${tourId}`);

    if (!hasSubmitted) {
      const handleSubmit = async () => {
        try {
          // Prepare data to be added to the Firestore collection
          const ticketData = {
            tourId,
            tourTitle,
            participants,
            price,
            selectedDate,
            fullName,
            phoneNumber,
            email,
            ticketId,
            ticketStatus: false, // Set ticketStatus to false
            createdAt: new Date(),
          };

          await addDoc(collection(firestore, "Tickets"), ticketData);
          console.log("Ticket added successfully to Firestore");

          // Mark submission as done in local storage
          localStorage.setItem(`hasSubmitted_${ticketId}`, "true");
        } catch (error) {
          console.error("Error adding ticket:", error);
        }
      };

      handleSubmit();
    }
  }, [tourId, tourTitle, participants, price, selectedDate, fullName, phoneNumber, email, ticketId]);

  return (
    <div className="w-full flex justify-center flex-col items-center bg-gray-200 h-full">
      <PageMeta title="Payment Successful" description="Your booking has been successfully completed!" />

      <div className="container py-12 sm:px-12 md:px-24 lg:px-32 flex flex-wrap items-center bg-gray-50">
        <div className="w-full py-4 flex justify-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              TL<span className="text-primary-orange"> TOURS</span>
            </span>
          </Link>
        </div>

        <div className="w-full flex flex-col justify-center bg-primary rounded-md">
          <div className="pt-8 py-4 w-full flex justify-center items-center gap-2">
            <div className="h-[2px] bg-gray-400 w-8" />
            <Mail className="h-6 sm:h-8 w-auto text-gray-100" />
            <div className="h-[2px] bg-gray-400 w-8" />
          </div>
          <h2 className="uppercase font-semibold text-gray-100 text-lg w-full text-center">
            Thank you for booking a tour with us!
          </h2>
          <h2 className="pb-8 py-4 font-bold text-gray-100 text-3xl w-full text-center">
            Ticket Purchase Confirmation
          </h2>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="w-3/4 flex flex-col justify-center items-center py-8">
            <h2 className="font-semibold text-gray-700 text-3xl w-full text-center">
              Hi {fullName},
            </h2>
            <h2 className="py-4 text-gray-600 text-xl w-full text-center">
              You have successfully purchased a ticket! The following is the
              information about the tour. The ticket will be sent to{" "}
              <span className="text-2xl text-primary">{email}</span> shortly.
            </h2>
            <ul className="list-disc text-start w-full pl-6">
              <li className="py-1 text-gray-600 text-xl">
                <span className="font-bold text-gray-800">Tour:</span> {tourTitle}
              </li>
              <li className="py-1 text-gray-600 text-xl">
                <span className="font-bold text-gray-800">Date:</span>{" "}
                {new Date(selectedDate).toLocaleString()}
              </li>
              <li className="py-1 text-gray-600 text-xl">
                <span className="font-bold text-gray-800">Total Amount:</span> € {price}
              </li>
              <li className="py-1 text-gray-600 text-xl">
                <span className="font-bold text-gray-800">Contact:</span> {phoneNumber}
              </li>
            </ul>
            <h2 className="py-4 text-gray-600 text-xl w-full text-center">
              For more information,{" "}
              <a className="text-primary" href="mailto:contact@tltours.com">
                contact us
              </a>
              .
            </h2>
            <div className="w-full flex justify-center">
              <Link
                className="bg-primary-orange rounded-md py-3 text-lg px-10 text-center uppercase w-fit text-gray-100"
                to="/"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
