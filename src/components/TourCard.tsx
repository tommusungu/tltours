import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface TourCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: object;
  duration: string;
}

export const TourCard = ({ id, title, description, price, image, duration }: TourCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-lg overflow-hidden"
    >
      <Link to={`/tours/${id}`}>
      <img src={image[0].downloadURL} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6 px-2">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-primary-orange text-2xl font-bold">€{price}</span>
            <span className="text-gray-500 ml-2">{duration}</span>
          </div>
         
        </div>
      </div>
      </Link>
    </motion.div>
  );
};