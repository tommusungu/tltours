// utils/api/types/tour.types.ts
export interface CreateTourRequest {
    destination: string;
    duration: number;
    interests: string[];
    travelStyle: string;
    budget: number;
    groupSize: number;
  }
  
  export interface ItineraryItem {
    time: string;
    location: string;
    duration: string;
    description: string;
    activity: string;
    tips: string[];
    photoSpots: string[];
    localInsight: string;
    estimatedCost?: string;
    accessibility?: string;
  }
  
  export interface TourResponse {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    destination: string;
    duration: string;
    difficulty: string;
    groupSize: string;
    rating: number;
    reviews: number;
    totalBookings: string;
    pricing: {
      solo: number;
      couple: number;
      group: number;
      family: number;
    };
    languages: string[];
    highlights: string[];
    itinerary: ItineraryItem[];
    inclusions: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ApiError {
    message: string;
    statusCode: number;
    error?: string;
  }
  
  export interface TourGenerationOptions {
    useAuth?: boolean;
    timeout?: number;
  }