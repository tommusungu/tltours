import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MapPin, Globe, HelpCircle, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AccordionItem = ({ headerTitle, children, isOpen, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Gradient glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative border border-gray-200/30 rounded-2xl mb-4 overflow-hidden bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary-orange/30">
        <button
          onClick={onToggle}
          className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/30 transition-all duration-500 group/button"
        >
          <h3 className="text-lg font-bold text-gray-900 group-hover/button:text-primary-orange transition-colors duration-300 pr-4">
            {headerTitle}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex-shrink-0 p-2 rounded-full bg-gradient-to-r from-gray-100 to-blue-50 group-hover/button:from-primary-orange/10 group-hover/button:to-orange-100"
          >
            <ChevronDown className="h-5 w-5 text-gray-600 group-hover/button:text-primary-orange transition-colors duration-300" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-6 border-t border-gradient-to-r from-gray-100/50 to-blue-100/30">
                <motion.div 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="pt-5"
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CategoryTab = ({ icon: Icon, label, isActive, onClick, count, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
    className="relative group"
  >
    {/* Dynamic gradient glow based on category */}
    <div className={`absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${
      isActive 
        ? "bg-gradient-to-r from-primary-orange/40 to-red-500/40" 
        : index === 0 
          ? "bg-gradient-to-r from-blue-400/30 to-purple-600/30"
          : index === 1
            ? "bg-gradient-to-r from-orange-400/30 to-red-600/30"
            : "bg-gradient-to-r from-purple-400/30 to-pink-600/30"
    }`}></div>
    
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-500 shadow-xl hover:shadow-2xl border ${
        isActive
          ? "bg-gradient-to-r from-primary-orange to-red-600 text-white border-transparent"
          : "bg-white/90 backdrop-blur-md text-gray-700 hover:bg-white hover:text-gray-900 border-gray-200/30 hover:border-primary-orange/30"
      }`}
    >
      <Icon className={`h-5 w-5 transition-colors duration-300 ${
        isActive ? "text-white" : "text-gray-600 group-hover:text-primary-orange"
      }`} />
      <span>{label}</span>
      <span className={`text-xs px-3 py-1 rounded-full font-bold transition-all duration-300 ${
        isActive 
          ? "bg-white/20 text-white" 
          : "bg-gradient-to-r from-gray-100 to-blue-50 text-gray-700 group-hover:from-primary-orange/10 group-hover:to-orange-100"
      }`}>
        {count}
      </span>
    </motion.button>
  </motion.div>
);

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const faqData = {
    general: [
      {
        id: "general-1",
        question: "What are your business hours?",
        answer: "Our business hours are from 9 AM to 6 PM, Monday through Sunday. Our customer support team is available during these hours to assist with any inquiries."
      },
      {
        id: "general-2",
        question: "Do I get a refund if I missed a tour?",
        answer: "We do not issue refunds for missed tours. The refund policy covers all possible scenarios in which guests are eligible for refunds. Kindly consult our refund policy for all categories of refunds <a href=\"/refund-policy\" class=\"text-primary-orange hover:underline font-semibold transition-colors duration-300\">HERE</a>."
      },
      {
        id: "general-3",
        question: "How can I beat the waiting time?",
        answer: "Booking prepaid tickets for your visit allows you to skip the line. We also recommend arriving at the meeting point 15 minutes early to ensure a smooth check-in process."
      },
      {
        id: "general-4",
        question: "Do you provide the tickets in advance?",
        answer: "We offer a prepaid ticket (subject to your availability) which allows you to skip the line. If you booked a prepaid ticket tour with us, we will send you your ticket within 24 hours before your tour time."
      },
      {
        id: "general-5",
        question: "How soon is my refund processed?",
        answer: "First, you need to check our refund policy for the product you booked to be sure you qualify for a refund. If you qualify, then note that refunds are issued by the Online Travel Agency (OTA) platform where you made your booking in the first place. All refunds issues or questions must be addressed to the OTA platform."
      },
      {
        id: "general-6",
        question: "Can I move my tour time to a different time?",
        answer: "In general, the answer is NO because we make preparations for your visit ahead, and such preparations may involve prior reservations and pre-bookings with other entities. However, in very few cases, we are able to make an exception. Please direct inquiries pertaining to changes of time to <a href=\"mailto:tltraveltours@gmail.com\" class=\"text-primary-orange hover:underline font-semibold transition-colors duration-300\">tltraveltours@gmail.com</a>."
      },
      {
        id: "general-7",
        question: "Will my USD get converted when I make a purchase?",
        answer: "All our transactions are made in Euros. You may need to check with your bank or the OTA on how your payment is processed. Currency conversion rates may apply depending on your payment method."
      }
    ],
    ghana: [
      {
        id: "ghana-1",
        question: "What is the best time to visit Ghana?",
        answer: "The best time to visit Ghana is during the dry season from November to March, when temperatures are more comfortable and rainfall is minimal. This is ideal for exploring historical sites, national parks, and coastal areas."
      },
      {
        id: "ghana-2",
        question: "Do I need a visa to visit Ghana?",
        answer: "Most visitors need a visa to enter Ghana. We recommend checking with the Ghanaian embassy or consulate in your country for specific visa requirements. Some nationalities may be eligible for visa-on-arrival or e-visa options."
      },
      {
        id: "ghana-3",
        question: "What vaccinations are required for Ghana tours?",
        answer: "Yellow fever vaccination is mandatory for entry into Ghana. We also recommend vaccinations for hepatitis A, hepatitis B, typhoid, and malaria prophylaxis. Please consult your healthcare provider at least 4-6 weeks before travel."
      },
      {
        id: "ghana-4",
        question: "What should I pack for my Ghana tour?",
        answer: "Pack lightweight, breathable clothing in natural fabrics, comfortable walking shoes, hat, sunscreen, insect repellent, and a light rain jacket. Don't forget your yellow fever vaccination certificate and any necessary medications."
      },
      {
        id: "ghana-5",
        question: "Is it safe to drink tap water in Ghana?",
        answer: "We recommend drinking bottled or filtered water during your stay in Ghana. Most hotels and restaurants provide safe drinking water, but it's best to avoid tap water and ice cubes to prevent stomach issues."
      }
    ],
    paris: [
      {
        id: "paris-1",
        question: "What's the best way to get around Paris during tours?",
        answer: "Paris has excellent public transportation with metro, buses, and RER trains. Most of our tours include transportation or are designed around walking and public transport. We recommend getting a Navigo weekly pass for extended stays."
      },
      {
        id: "paris-2",
        question: "Do I need to book Louvre or Eiffel Tower tickets in advance?",
        answer: "Yes, we highly recommend booking tickets in advance for popular attractions like the Louvre, Eiffel Tower, and Arc de Triomphe. Our tours include skip-the-line access to avoid long queues, especially during peak season."
      },
      {
        id: "paris-3",
        question: "What's the dress code for Paris attractions and restaurants?",
        answer: "Paris is a fashion-conscious city. For most attractions, casual smart attire is fine. For fine dining restaurants and some cultural venues, more formal dress may be required. Comfortable walking shoes are essential for city tours."
      },
      {
        id: "paris-4",
        question: "Is English widely spoken in Paris?",
        answer: "While French is the primary language, many people in tourist areas, hotels, and restaurants speak English. Our tour guides are fluent in English and can help with any language barriers during your visit."
      },
      {
        id: "paris-5",
        question: "What's included in Paris food tours?",
        answer: "Our Paris food tours typically include visits to local markets, bakeries, cheese shops, and wine tastings. You'll sample authentic French pastries, cheeses, wines, and regional specialties. Vegetarian and dietary restriction options are available with advance notice."
      }
    ]
  };

  const toggleItem = (itemId) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const categories = [
    { key: "general", label: "General", icon: HelpCircle, count: faqData.general.length },
    { key: "ghana", label: "Ghana Tours", icon: MapPin, count: faqData.ghana.length },
    { key: "paris", label: "Paris Tours", icon: Globe, count: faqData.paris.length }
  ];

  const filteredFAQs = faqData[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-red-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary-orange font-semibold tracking-wide uppercase text-sm"
          >
            Support Center
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Find answers to common questions about our tours, bookings, and travel experiences. 
            We're here to make your journey seamless and unforgettable.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-lg mx-auto mb-12"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-orange/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 group-focus-within:opacity-60 transition-opacity duration-500"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-primary-orange transition-colors duration-300" />
              <Input
                type="text"
                placeholder="Search your questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-4 text-base border-gray-200/50 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl focus:ring-2 focus:ring-primary-orange/30 focus:border-primary-orange transition-all duration-500 placeholder:text-gray-400"
              />
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <CategoryTab
              key={category.key}
              icon={category.icon}
              label={category.label}
              count={category.count}
              index={index}
              isActive={activeCategory === category.key}
              onClick={() => {
                setActiveCategory(category.key);
                setOpenItems({});
              }}
            />
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {filteredFAQs.length > 0 ? (
            <div className="space-y-3">
              {filteredFAQs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  headerTitle={faq.question}
                  isOpen={openItems[faq.id]}
                  onToggle={() => toggleItem(faq.id)}
                  index={index}
                >
                  <p 
                    className="text-gray-600 text-base leading-8"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </AccordionItem>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-blue-100/50 rounded-full blur-2xl opacity-60"></div>
                <div className="relative bg-white/90 backdrop-blur-md rounded-full p-8 w-32 h-32 mx-auto flex items-center justify-center shadow-2xl">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No results found</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                Try adjusting your search terms or browse through our different FAQ categories
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-orange/20 to-purple-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-3xl mx-auto border border-gray-200/30">
              <div className="mb-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="w-20 h-20 bg-gradient-to-r from-primary-orange to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl"
                >
                  <HelpCircle className="w-10 h-10 text-white" />
                </motion.div>
                
                <div className="flex justify-center items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.1 + i * 0.1 }}
                    >
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                  <span className="ml-3 text-gray-600 font-semibold">4.9/5 Customer Rating</span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
                  Can't find the answer you're looking for? Our friendly expert team is here to help you plan your perfect journey and answer any questions you may have.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary-orange to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Support
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/50 px-10 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  onClick={() => window.location.href = 'mailto:tltraveltours@gmail.com'}
                >
                  Email Us
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}