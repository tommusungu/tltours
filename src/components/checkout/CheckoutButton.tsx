import React, { useState } from "react";

interface CheckoutButtonProps {
  tourId: string;
  tourTitle: string;
  imageURL: string,
  participants: {
    adult: number;
    youth: number;
    child: number;
    infant: number;
  };
  totalPrice: number; // Ensure totalPrice is provided in the props
  selectedDate: Date | null;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  tourId,
  tourTitle,
  imageURL,
  participants,
  totalPrice,
  selectedDate,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!selectedDate) {
      alert("Please select a date before proceeding to checkout.");
      return;
    }
    if (!fullName) {
      alert("Please enter your full name.");
      return;
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter your phone number.");
      return;
    }
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setIsLoading(true);

    const payload = {
      tourId,
      tourTitle,
      imageURL,
      participants: JSON.stringify(participants),
      price: totalPrice * 100, // Convert to cents if needed
      selectedDate: selectedDate.toISOString(),
      fullName,
      phoneNumber,
      email,
    };

    try {
      const response = await fetch("https://server.tltours.com/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url; // Redirect to the checkout URL
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to process checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className={`w-full bg-primary-orange hover:bg-primary-orange/90 text-white font-bold py-2 px-4 rounded ${
          totalPrice === 0 || !selectedDate ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => setShowModal(true)}
        disabled={totalPrice === 0 || !selectedDate}
      >
        {isLoading ? "Processing..." : "Proceed to Checkout"}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Enter Your Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full p-2 border rounded"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 bg-primary-orange text-white rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Proceed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutButton;
