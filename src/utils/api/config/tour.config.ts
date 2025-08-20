// src/utils/api/config/tour.config.ts
export const TOUR_API_CONFIG = {
  // Use Vite environment variables instead of Next.js
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    // Tour Generation
    TOURS: {
      GENERATE: '/tour-generation/generate',
      GENERATE_SAMPLE: '/tour-generation/generate-sample', 
      MY_TOURS: '/tour-generation/my-tours',
      BY_ID: (id: string) => `/tour-generation/${id}`,
      DUPLICATE: (id: string) => `/tour-generation/${id}/duplicate`,
    },
    // Tour Guides
    GUIDES: {
      SEARCH: '/tour-guides/search',
      RESEARCH: (destination: string) => `/tour-guides/research/${destination}`,
      ALL: '/tour-guides',
      POPULAR: (destination: string) => `/tour-guides/popular/${destination}`,
      BY_SPECIALTY: (specialty: string) => `/tour-guides/specialty/${specialty}`,
      BY_ID: (id: string) => `/tour-guides/${id}`,
    },
    // Auth
    AUTH: {
      LOGIN: '/tour-auth/login',
      REGISTER: '/tour-auth/register',
      PROFILE: '/tour-auth/profile',
      VERIFY: '/tour-auth/verify',
    },
  },
  TIMEOUTS: {
    DEFAULT: 10000, // 10 seconds
    TOUR_GENERATION: 30000, // 30 seconds for AI generation
    GUIDE_RESEARCH: 45000, // 45 seconds for guide research
  },
} as const;

export const TRAVEL_STYLES = [
  'Cultural',
  'Adventure', 
  'Luxury',
  'Budget',
  'Family',
  'Romantic',
  'Business',
  'Solo',
] as const;

export const COMMON_INTERESTS = [
  'culture',
  'history',
  'food',
  'art',
  'architecture',
  'technology',
  'nature',
  'shopping',
  'nightlife',
  'museums',
  'photography',
  'local life',
] as const;

export const POPULAR_DESTINATIONS = [
  'Paris',
  'Tokyo',
  'Rome',
  'London',
  'Barcelona',
  'Amsterdam',
  'Berlin',
  'Prague',
  'Vienna',
  'Florence',
] as const;