import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SearchBanner = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/tours')
  }

  return (
    <div className="container mx-auto px-4 sm:px-24 relative -mt-32 sm:-mt-12 z-10">
      <div className="bg-white rounded-lg sm:rounded-full shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 md:border-r border-gray-300">
            <MapPin className="text-primary-orange" />
            <Input placeholder="Where are you going?" className="border-none" />
          </div>
          <div className="flex items-center gap-2 md:border-r border-gray-300">
            <Calendar className="text-primary-orange" />
            <Input type="date" className="border-none" />
          </div>
          <div className="flex items-center gap-2 md:border-r border-gray-300">
            <Users className="text-primary-orange" />
            <Input type="number" placeholder="Number of people" className="border-none" />
          </div>
          <Button onClick={handleClick} className="bg-primary hover:bg-primary/80 rounded-full w-full">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>
    </div>
  );
};