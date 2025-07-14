import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { TourCard } from "@/components/TourCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Menu } from "lucide-react"; // Icon for Hamburger Menu
import Database from "@/hooks/Database";

const Tours = () => {
  const { tours } = Database();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [durationRange, setDurationRange] = useState([0, 5]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Toggle state for filter

  const handlePriceChange = (event) => {
    const { value } = event.target;
    const range = value.split("-").map(Number);
    setPriceRange(range);
  };

  const handleDurationChange = (event) => {
    const { value } = event.target;
    const range = value.split("-").map(Number);
    setDurationRange(range);
  };

  const filteredTours = tours.filter((tour) => {
    const {
      title = "",
      category = "",
      price = 0,
      availableDate = null,
      duration = "0",
    } = tour;

    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || category === selectedCategory;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    const matchesDate = !selectedDate || new Date(availableDate) >= selectedDate;

    let durationInHours = 0;
    if (/day/i.test(duration)) {
      const daysMatch = duration.match(/(\d+)\s*day/i);
      if (daysMatch) {
        durationInHours += parseInt(daysMatch[1], 10) * 24;
      }
    }

    if (/hour/i.test(duration)) {
      const hoursMatch = duration.match(/(\d+)\s*hour/i);
      if (hoursMatch) {
        durationInHours += parseInt(hoursMatch[1], 10);
      }
    }

    const matchesDuration =
      durationInHours >= durationRange[0] * 24 &&
      durationInHours <= durationRange[1] * 24;

    return matchesSearch && matchesCategory && matchesPrice && matchesDate && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 bg-primary text-white"
      >
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">All Tours</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We're dedicated to creating unforgettable travel experiences that inspire and connect people around the world.
          </p>
        </div>
      </motion.section>
      <div className="pt-8 pb-6">
        <div className="container w-full px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Hamburger Toggle for Filters */}
          <div className="block md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <Menu className="h-5 w-5" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white p-4 rounded-lg border border-gray-200 h-fit md:block ${
              isFilterOpen ? "block" : "hidden"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Filter Tours</h2>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Search</h3>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tours..."
              />
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Category</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="all">All</option>
                <option value="Adventure">Adventure</option>
                <option value="Relaxation">Relaxation</option>
                <option value="Cultural">Cultural</option>
                <option value="Romantic">Romantic</option>
              </select>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <select
                value={priceRange.join("-")}
                onChange={handlePriceChange}
                className="w-full p-2 border rounded"
              >
                <option value="0-100">€0 - €100</option>
                <option value="101-200">€101 - €200</option>
                <option value="201-300">€201 - €300</option>
                <option value="301-500">€301 - €500</option>
              </select>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Duration (Days)</h3>
              <select
                value={durationRange.join("-")}
                onChange={handleDurationChange}
                className="w-full p-2 border rounded"
              >
                <option value="0-1">0 - 1 day</option>
                <option value="1-3">1 - 3 days</option>
                <option value="3-5">3 - 5 days</option>
                <option value="5-7">5 - 7 days</option>
              </select>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Available Date</h3>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full p-2 border rounded"
                placeholderText="Select a date"
              />
            </div>
          </motion.div>

          {/* Tours Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredTours.length ? (
              filteredTours.map((tour) => <TourCard key={tour.id} {...tour} />)
            ) : (
              <p>No tours match your filters.</p>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tours;
