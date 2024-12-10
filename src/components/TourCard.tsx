import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface TourCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  duration: string;
}

export const TourCard = ({ id, title, description, price, image, duration }: TourCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-primary-orange text-2xl font-bold">€{price}</span>
            <span className="text-gray-500 ml-2">{duration}</span>
          </div>
          <Link to={`/tours/${id}`}>
            <Button className="bg-primary hover:bg-primary/90">Book Now</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};