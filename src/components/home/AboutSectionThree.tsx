import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const AboutSectionThree = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');
  };

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4 sm:px-24">
        <div className="flex flex-col sm:flex-row-reverse items-center gap-12">
          <div className="w-full flex items-center justify-center sm:w-[40%] relative">
            <div className="relative w-full h-72 sm:w-full sm:h-96">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src="/tourOne.jpg"
                  alt="Paris"
                  className="w-full h-full rounded-lg"
                />
              </motion.div>
            </div>
          </div>
          <div className="w-full sm:w-[60%]">
            <span className="text-primary-orange italic">What Sets Us Apart</span>
            <h2 className="text-3xl font-bold mt-2 mb-6">
              We Go Above and Beyond to Redefine Your Travel Experience.
            </h2>
            <ul className="text-gray-600 mb-8 list-disc list-inside space-y-4">
              <li>
                <strong>Personalized Service:</strong> We go beyond simply booking flights and hotels. Our dedicated team works closely with you to understand your travel preferences, creating a bespoke itinerary tailored to your interests and budget.
              </li>
              <li>
                <strong>Concierge Expertise:</strong> Our experienced concierges are available 24/7 to assist you with any travel-related needs, from restaurant reservations and transportation arrangements to local tips and insider recommendations.
              </li>
              <li>
                <strong>Exclusive Experiences:</strong> We unlock access to unique experiences, from private tours and VIP access to hidden gems and off-the-beaten-path adventures.
              </li>
              <li>
                <strong>A Commitment to Excellence:</strong> We strive to provide the highest level of service, ensuring your travel experience is seamless, enjoyable, and unforgettable.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
