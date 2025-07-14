import { motion } from "framer-motion";

const adventures = [
  {
    title: "Adventure",
    image: "/tourOne.jpg",
  },
  {
    title: "Mountain Biking",
    image: "/tour4.jpg",
  },
  {
    title: "Boat Riding",
    image: "/seine.jpg",
  },
 
];

export const AdventureSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-16">
        <div className="text-center mb-12">
          <span className="text-primary-orange italic">Popular Activities</span>
          <h2 className="text-3xl font-bold mt-2">Discover Actual Adventure</h2>
          <p className="text-gray-600 mt-4">Experience the thrill of real adventures with our expert guides</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {adventures.map((adventure, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <img 
                src={adventure.image} 
                alt={adventure.title}
                className="w-full h-64 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-xl font-semibold">{adventure.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};