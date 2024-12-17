import { motion } from "framer-motion";
import { Clock, Map, MessageCircle, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: <Clock className="w-8 h-8 text-primary-orange" />,
    title: "Easy & Quick Booking",
    description: "Book your dream tour in just a few clicks"
  },
  {
    icon: <Map className="w-8 h-8 text-primary-orange" />,
    title: "Best Guide",
    description: "Experienced and knowledgeable tour guides"
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-primary-orange" />,
    title: "Enriched Communication",
    description: "24/7 support for all your queries"
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8 text-primary-orange" />,
    title: "Customer Care 24/7",
    description: "Round-the-clock assistance for your needs"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};