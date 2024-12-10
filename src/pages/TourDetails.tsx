import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { PersonCounter } from "@/components/PersonCounter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const tours = {
  "1": {
    id: "1",
    title: "Mountain Biking Adventure",
    description: "Experience thrilling mountain biking trails with breathtaking views. This tour includes professional guides, equipment, and lunch.",
    price: 149,
    image: "/lovable-uploads/15850510-55ec-40d6-bad3-25dd9e8a6f73.png",
    duration: "1 day",
    included: ["Professional guide", "Equipment rental", "Lunch", "Transportation"],
    location: "Alps Mountains"
  },
  "2": {
    title: "Beach Paradise Tour",
    description: "Relax on pristine beaches and enjoy water activities.",
    price: 299,
    image: "/lovable-uploads/f6ecf2fe-5dcf-4fd8-94bd-fe623b3506d5.png",
    duration: "3 days",
    included: ["Hotel accommodation", "Breakfast", "Beach activities", "Guide"],
    location: "Mediterranean Coast"
  }
};

const TourDetails = () => {
  const { id } = useParams();
  const tour = tours[id as keyof typeof tours];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [counts, setCounts] = useState({
    adult: 0,
    youth: 0,
    child: 0,
    infant: 0
  });

  const updateCount = (type: keyof typeof counts, increment: boolean) => {
    setCounts(prev => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const totalParticipants = Object.values(counts).reduce((a, b) => a + b, 0);
  const totalPrice = tour.price * (counts.adult + counts.youth) + 
                    tour.price * 0.5 * counts.child;

  if (!tour) return <div>Tour not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tour Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:col-span-2"
            >
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-[400px] object-cover rounded-lg mb-6"
              />
              <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
              <p className="text-gray-600 mb-6">{tour.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Duration</h3>
                  <p>{tour.duration}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p>{tour.location}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4">What's Included</h2>
              <ul className="list-disc list-inside mb-6">
                {tour.included.map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </motion.div>

            {/* Booking Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg h-fit sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-4">Book This Tour</h2>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Select Date</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                  className="w-full p-2 border rounded"
                  placeholderText="Choose a date"
                />
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Select Participants</h3>
                <PersonCounter
                  label="Adult"
                  ageRange="24 - 90"
                  count={counts.adult}
                  onIncrement={() => updateCount("adult", true)}
                  onDecrement={() => updateCount("adult", false)}
                />
                <PersonCounter
                  label="Youth"
                  ageRange="11 - 23"
                  count={counts.youth}
                  onIncrement={() => updateCount("youth", true)}
                  onDecrement={() => updateCount("youth", false)}
                />
                <PersonCounter
                  label="Child"
                  ageRange="3 - 10"
                  count={counts.child}
                  onIncrement={() => updateCount("child", true)}
                  onDecrement={() => updateCount("child", false)}
                />
                <PersonCounter
                  label="Infant"
                  ageRange="0 - 2"
                  count={counts.infant}
                  onIncrement={() => updateCount("infant", true)}
                  onDecrement={() => updateCount("infant", false)}
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span>Total Participants:</span>
                  <span>{totalParticipants}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-bold">Total Price:</span>
                  <span className="font-bold text-primary-orange">€{totalPrice}</span>
                </div>
                <Button 
                  className="w-full bg-primary-orange hover:bg-primary-orange/90"
                  disabled={totalParticipants === 0 || !selectedDate}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;