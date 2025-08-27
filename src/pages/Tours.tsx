import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { TourCard } from "@/components/TourCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Menu } from "lucide-react";
import Database from "@/hooks/Database";

const Tours = () => {
  const { tours } = Database();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [durationRange, setDurationRange] = useState([0, 5]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [countryFilter, setCountryFilter] = useState(null);

  const params = useParams();
  
  // Extract country from URL params
  useEffect(() => {
    if (params.country) {
      // Check if it's a country (not a tour ID)
      // Assume tour IDs are numeric or have a specific pattern
      const isCountry = isNaN(parseInt(params.country)) && params.country.length > 2;
      
      if (isCountry) {
        // Capitalize first letter and decode any URL encoding
        const formattedCountry = decodeURIComponent(params.country)
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        setCountryFilter(formattedCountry);
      } else {
        setCountryFilter(null);
      }
    } else {
      setCountryFilter(null);
    }
  }, [params.country]);

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
      country = "",
    } = tour;

    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || category === selectedCategory;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    const matchesDate = !selectedDate || new Date(availableDate) >= selectedDate;
    
    // Country filtering based on URL
    const matchesCountry = !countryFilter || 
      country.toLowerCase() === countryFilter.toLowerCase();

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

    return matchesSearch && matchesCategory && matchesPrice && matchesDate && matchesDuration && matchesCountry;
  });

  // Get unique countries for filter dropdown
  const uniqueCountries = [...new Set(tours.map(tour => tour.country).filter(Boolean))];

  // Dynamic page title based on country filter
  const pageTitle = countryFilter ? `Tours in ${countryFilter}` : "All Tours";
  const pageDescription = countryFilter 
    ? `Discover amazing travel experiences in ${countryFilter}. Find the perfect tour for your next adventure.`
    : "We're dedicated to creating unforgettable travel experiences that inspire and connect people around the world.";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-12 bg-primary text-white"
      >
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{pageTitle}</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            {pageDescription}
          </p>
          {countryFilter && (
            <div className="mt-4">
              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm">
                Showing tours in {countryFilter}
              </span>
            </div>
          )}
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
            
            {/* Country Filter Display (when filtering by URL) */}
            {countryFilter && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <h3 className="font-semibold mb-1 text-blue-800">Current Filter</h3>
                <p className="text-sm text-blue-600">Showing tours in: {countryFilter}</p>
                <a 
                  href="/tours" 
                  className="text-xs text-blue-500 hover:text-blue-700 underline"
                >
                  View all countries
                </a>
              </div>
            )}

            {/* Additional Country Filter (for manual selection) */}
            {!countryFilter && uniqueCountries.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Country</h3>
                <select
                  onChange={(e) => {
                    const selectedCountry = e.target.value;
                    if (selectedCountry && selectedCountry !== 'all') {
                      const countrySlug = selectedCountry.toLowerCase().replace(/\s+/g, '-');
                      window.location.href = `/tours/${countrySlug}`;
                    }
                  }}
                  className="w-full p-2 border rounded"
                  defaultValue="all"
                >
                  <option value="all">All Countries</option>
                  {uniqueCountries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
                <option value="0-50">€0 - €50</option>
                <option value="51-100">€51 - €100</option>
                <option value="101-200">€101 - €200</option>
                <option value="201-1000">Above €201</option>
                <option value="0-1000">Reset</option>
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
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500 text-lg mb-2">
                  {countryFilter 
                    ? `No tours found in ${countryFilter} matching your filters.`
                    : "No tours match your filters."
                  }
                </p>
                {countryFilter && (
                  <a 
                    href="/tours" 
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    Browse all tours
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tours;