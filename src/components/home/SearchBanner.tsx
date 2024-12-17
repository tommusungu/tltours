import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, Users } from "lucide-react";

export const SearchBanner = () => {
  return (
    <div className="container mx-auto px-4 relative -mt-24 z-10">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-primary-orange" />
            <Input placeholder="Where are you going?" className="border-none" />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-primary-orange" />
            <Input type="date" className="border-none" />
          </div>
          <div className="flex items-center gap-2">
            <Users className="text-primary-orange" />
            <Input type="number" placeholder="Number of people" className="border-none" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 w-full">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>
    </div>
  );
};