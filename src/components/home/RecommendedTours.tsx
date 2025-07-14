import { motion } from "framer-motion";
import { TourCard } from "../TourCard";
import Database from "@/hooks/Database";

export const RecommendedTours = () => {
  const { tours } = Database();

  // Function to shuffle the tours array
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  };

  // Shuffle and slice the array to get a maximum of 4 tours
  const shuffledTours = [...tours]; // Create a copy of the tours array to avoid mutating the original
  shuffleArray(shuffledTours);
  const randomTours = shuffledTours.slice(0, 4);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-16">
        <div className="text-center mb-12">
          <span className="text-primary-orange italic">Recommended Tours</span>
          <h2 className="text-3xl font-bold mt-2">Uncover Real Adventures</h2>
          <p className="text-gray-600 mt-4">Embark on thrilling experiences guided by seasoned experts</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:col-span-3 grid sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {randomTours.length ? (
            randomTours.map((tour) => <TourCard key={tour.id} {...tour} />)
          ) : (
            <p>No tours yet.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};
