import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { PersonCounter } from "@/components/PersonCounter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Database from "@/hooks/Database";
import BlogDetails from "@/components/blogs/BlogDetails";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import { MapPin } from "lucide-react";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Simple Map Component using Google Maps Embed API
const LocationMap = ({ lat, lng, title }: { lat: string; lng: string; title: string }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${lat},${lng}&zoom=15`;
  
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${title} location`}
      />
    </div>
  );
};

// Alternative: Interactive Map using OpenStreetMap (no API key needed)
const OpenStreetMap = ({ lat, lng, title }: { lat: string; lng: string; title: string }) => {
  const openMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lng)-0.01},${parseFloat(lat)-0.01},${parseFloat(lng)+0.01},${parseFloat(lat)+0.01}&layer=mapnik&marker=${lat},${lng}`;
  
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
      <iframe
        src={openMapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        title={`Map showing ${title} location`}
      />
    </div>
  );
};

const TourDetails = () => {
  const { tours } = Database();
  const { slug } = useParams<{ slug: string }>();
  const [tour, setTour] = useState<any | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [counts, setCounts] = useState({
    adult: 0,
    youth: 0,
    child: 0,
    infant: 0,
  });

  useEffect(() => {
    if (!slug) return;

    const fetchedTour = tours.find((event) => slugify(event.title) === slug);
    setTour(fetchedTour);

    if (fetchedTour) {
      setMainImage(fetchedTour.image[0].downloadURL);
    }
  }, [slug, tours]);

  const updateCount = (type: keyof typeof counts, increment: boolean) => {
    setCounts((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  const totalParticipants = Object.values(counts).reduce((a, b) => a + b, 0);
  const totalPrice = tour
    ? tour.price * (counts.adult + counts.youth) +
      tour.price * 0.5 * counts.child
    : 0;

  // Function to open location in Google Maps app/website
  const openInMaps = () => {
    if (tour?.location?.lat && tour?.location?.lng) {
      const url = `https://www.google.com/maps/search/?api=1&query=${tour.location.lat},${tour.location.lng}`;
      window.open(url, '_blank');
    }
  };

  if (!tour) return <div className="p-6 text-center">Loading or Tour not found...</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-16">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tour Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:col-span-2"
            >
              <div className="w-full flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-4 items-start mb-6">
                {/* Thumbnails */}
                <div className="flex flex-row flex-wrap sm:flex-col  gap-2 sm:gap-4">
                  {tour.image.map((image: any, index: number) => (
                    <img
                      key={index}
                      src={image.downloadURL}
                      alt={`${tour.title} thumbnail ${index}`}
                      className={`w-14 sm:w-24 h-auto object-cover rounded-md sm:rounded-lg cursor-pointer ${
                        mainImage === image.downloadURL
                          ? "border-2 border-primary-orange"
                          : ""
                      }`}
                      onClick={() => setMainImage(image.downloadURL)}
                    />
                  ))}
                </div>

                {/* Main Image */}
                <div className="w-full">
                  <img
                    src={mainImage}
                    alt={tour.title}
                    className="w-full h-auto object-cover rounded-lg "
                  />
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
              <p className="text-gray-600 mb-6">{tour.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Duration</h3>
                  <p>{tour.duration}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Meeting Point</h3>
                  <p>
                    {typeof tour.location === 'string' 
                      ? tour.location 
                      : tour.location?.address || 
                        (tour.location?.lat && tour.location?.lng 
                          ? `${tour.location.lat}, ${tour.location.lng}` 
                          : 'Location details available'
                        )
                    }
                  </p>
                  {((typeof tour.location === 'object' && tour.location?.lat && tour.location?.lng) ||
                    (tour.lat && tour.lng)) && (
                    <button
                      onClick={openInMaps}
                      className="mt-2 flex items-center gap-2 text-primary-orange hover:text-primary-orange/80 transition-colors"
                    >
                      <MapPin size={16} />
                      <span className="text-sm">View on Maps</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Location Map */}
              {(() => {
                // Determine lat/lng from different possible structures
                let lat, lng;
                
                if (typeof tour.location === 'object' && tour.location?.lat && tour.location?.lng) {
                  lat = tour.location.lat;
                  lng = tour.location.lng;
                } else if (tour.lat && tour.lng) {
                  lat = tour.lat;
                  lng = tour.lng;
                }
                
                return lat && lng ? (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Meeting Point Location</h3>
                    <OpenStreetMap 
                      lat={lat} 
                      lng={lng} 
                      title={tour.title}
                    />
                    
                    <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                      <MapPin size={14} />
                      <span>Coordinates: {lat}, {lng}</span>
                    </div>
                  </div>
                ) : null;
              })()}

              <h2 className="text-2xl font-bold mb-4">What's Included</h2>
              <ul className="list-disc list-inside mb-6">
                {tour.included.map((item: string, index: number) => (
                  <li key={index} className="text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-3">
                <BlogDetails blogDetails={tour.details} />
              </div>

             
            </motion.div>

            {/* Booking Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-lg bg-white border border-gray-200 h-fit sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-4">Book This Tour</h2>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Select Date</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date) => setSelectedDate(date)}
                  minDate={new Date()}
                  className="w-full p-2 border rounded"
                  placeholderText="Choose a date"
                />
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Select Participants</h3>
                <PersonCounter
                  label="Adult"
                  ageRange="24 - 90"
                  count={counts.adult}
                  onIncrement={() => updateCount("adult", true)}
                  onDecrement={() => updateCount("adult", false)}
                />
                <PersonCounter
                  label="Youth"
                  ageRange="11 - 23"
                  count={counts.youth}
                  onIncrement={() => updateCount("youth", true)}
                  onDecrement={() => updateCount("youth", false)}
                />
                <PersonCounter
                  label="Child"
                  ageRange="3 - 10"
                  count={counts.child}
                  onIncrement={() => updateCount("child", true)}
                  onDecrement={() => updateCount("child", false)}
                />
                <PersonCounter
                  label="Infant"
                  ageRange="0 - 2"
                  count={counts.infant}
                  onIncrement={() => updateCount("infant", true)}
                  onDecrement={() => updateCount("infant", false)}
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span>Total Participants:</span>
                  <span>{totalParticipants}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-bold">Total Price:</span>
                  <span className="font-bold text-primary-orange">€{totalPrice}</span>
                </div>

                <CheckoutButton
                  tourId={slug}
                  tourTitle={tour.title}
                  imageURL={tour.image[0].downloadURL}
                  participants={counts}
                  totalPrice={totalPrice}
                  selectedDate={selectedDate}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;