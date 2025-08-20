// utils/api/index.ts
// Main exports for tour API utilities

// Types
export type { 
    CreateTourRequest, 
    TourResponse, 
    ItineraryItem, 
    ApiError,
    TourGenerationOptions 
  } from './types/tour.types';
  
  export type {
    SearchGuidesRequest,
    GuideResponse,
    GuideRecommendation,
    GuideResearchResponse
  } from './services/tour-guides.service';
  
  // Configuration
  export { 
    TOUR_API_CONFIG, 
    TRAVEL_STYLES, 
    COMMON_INTERESTS, 
    POPULAR_DESTINATIONS 
  } from './config/tour.config';
  
  // Services
  export { tourGenerationService } from './services/tour-generation.service';
  export { tourGuidesService } from './services/tour-guides.service';
  
  // React Hooks
  export { 
    useTourGeneration, 
    useMyTours, 
    useTourGuides,
    useTourWorkflow 
  } from './hooks/useTours';
  
  // API Client
  export { tourApiClient } from './client/tour.client';
  
  // Utility functions
  export const tourUtils = {
    /**
     * Format price for display
     */
    formatPrice: (amount: number, currency = 'USD'): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }).format(amount);
    },
  
    /**
     * Calculate tour duration in readable format
     */
    formatDuration: (hours: number): string => {
      if (hours < 1) return `${hours * 60} minutes`;
      if (hours === 1) return '1 hour';
      if (hours < 24) return `${hours} hours`;
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      if (remainingHours === 0) return `${days} day${days > 1 ? 's' : ''}`;
      return `${days} day${days > 1 ? 's' : ''} ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;
    },
  
    /**
     * Get difficulty color for UI
     */
    getDifficultyColor: (difficulty: string): string => {
      switch (difficulty.toLowerCase()) {
        case 'easy': return 'green';
        case 'moderate': return 'yellow';
        case 'hard': return 'red';
        default: return 'gray';
      }
    },
  
    /**
     * Extract numeric value from duration string
     */
    parseDuration: (durationString: string): number => {
      const match = durationString.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    },
  
    /**
     * Extract group size from group size string
     */
    parseGroupSize: (groupSizeString: string): { min: number; max: number } => {
      const match = groupSizeString.match(/(\d+)-(\d+)/);
      return match 
        ? { min: parseInt(match[1]), max: parseInt(match[2]) }
        : { min: 1, max: 1 };
    },
  
    /**
     * Calculate total estimated cost for a tour
     */
    calculateTotalCost: (tour: TourResponse, groupSize: number, guidesCost = 0): number => {
      let tourCost = 0;
      
      if (groupSize === 1) {
        tourCost = tour.pricing.solo;
      } else if (groupSize === 2) {
        tourCost = tour.pricing.couple * 2;
      } else if (groupSize <= 6) {
        tourCost = tour.pricing.group * groupSize;
      } else {
        tourCost = tour.pricing.family * groupSize;
      }
  
      return tourCost + guidesCost;
    },
  
    /**
     * Validate email format
     */
    isValidEmail: (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  
    /**
     * Generate tour sharing URL
     */
    generateShareUrl: (tourId: string, baseUrl?: string): string => {
      const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
      return `${base}/tours/${tourId}`;
    },
  
    /**
     * Get random item from array
     */
    getRandomItem: <T>(array: T[]): T => {
      return array[Math.floor(Math.random() * array.length)];
    },
  
    /**
     * Debounce function for search inputs
     */
    debounce: <T extends (...args: any[]) => any>(
      func: T,
      wait: number
    ): ((...args: Parameters<T>) => void) => {
      let timeout: NodeJS.Timeout;
      return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(null, args), wait);
      };
    },
  };