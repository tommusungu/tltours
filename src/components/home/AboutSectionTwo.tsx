import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const AboutSectionTwo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');
  };

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4 sm:px-24">
        <div className="flex flex-col sm:flex-row items-center gap-10">
          <div className="w-full flex items-center justify-center sm:w-[40%] relative">
            <div className="relative w-full h-72 sm:w-full sm:h-[26rem]">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src="/seine2.jpg"
                  alt="Seine"
                  className="w-full h-full rounded-lg"
                />
              </motion.div>
            </div>
          </div>
          <div className="w-full sm:w-[60%]">
            <span className="text-primary-orange italic">Who we are</span>
            <h2 className="text-3xl font-bold mt-2 mb-3">
              We Are The Leading Travel And Adventure Company.
            </h2>
            <p className="text-gray-600 mb-2">
              At TL Travel Tours, we believe that travel should be an enriching and unforgettable experience. We are passionate about crafting unique and personalized journeys that go beyond the ordinary.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Our Mission:</strong> To provide exceptional travel experiences that exceed expectations, combining expert planning with a deep understanding of your individual needs and desires.
            </p>
            <ul className="text-gray-600 mb-2 list-disc list-inside space-y-2">
              <li>
                <strong>Concierge Services:</strong> Personalized itinerary planning, 24/7 support, exclusive experiences, and more.
              </li>
              <li>
                <strong>Travel Planning:</strong> Flights, accommodation, transportation, and travel insurance.
              </li>
              <li>
                <strong>Destination Expertise:</strong> In-depth knowledge of various destinations, including local culture, hidden gems, and insider tips.
              </li>
              <li>
                <strong>Group Travel:</strong> Customized packages for groups of all sizes, from corporate retreats to family vacations.
              </li>
            </ul>
            {/* <p className="text-gray-600">
              Whether you're planning a romantic getaway, a family adventure, or a corporate retreat, TL Travel Tours is your partner in creating unforgettable travel experiences.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};
