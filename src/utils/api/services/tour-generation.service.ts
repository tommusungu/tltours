// utils/api/services/tour-generation.service.ts
import { tourApiClient } from '../client/tour.client';
import { TOUR_API_CONFIG } from '../config/tour.config';
import { CreateTourRequest, TourResponse } from '../types/tour.types';

export const tourGenerationService = {
  /**
   * Generate a tour with authentication (saves to user account)
   */
  async generateTour(data: CreateTourRequest): Promise<TourResponse> {
    console.log('🎯 Generating authenticated tour:', data);
    
    return tourApiClient.post<TourResponse>(
      TOUR_API_CONFIG.ENDPOINTS.TOURS.GENERATE,
      data,
      { 
        requireAuth: true, 
        timeout: TOUR_API_CONFIG.TIMEOUTS.TOUR_GENERATION 
      }
    );
  },

  /**
   * Generate a sample tour without authentication (for testing/preview)
   */
  async generateSampleTour(data: CreateTourRequest): Promise<TourResponse> {
    console.log('🎯 Generating sample tour:', data);
    
    return tourApiClient.post<TourResponse>(
      TOUR_API_CONFIG.ENDPOINTS.TOURS.GENERATE_SAMPLE,
      data,
      { 
        requireAuth: false, 
        timeout: TOUR_API_CONFIG.TIMEOUTS.TOUR_GENERATION 
      }
    );
  },

  /**
   * Get all tours for the authenticated user
   */
  async getMyTours(): Promise<TourResponse[]> {
    console.log('📋 Fetching user tours');
    
    return tourApiClient.get<TourResponse[]>(
      TOUR_API_CONFIG.ENDPOINTS.TOURS.MY_TOURS,
      { requireAuth: true }
    );
  },

  /**
   * Get a specific tour by ID
   */
  async getTourById(id: string): Promise<TourResponse> {
    console.log(`👁️ Fetching tour: ${id}`);
    
    return tourApiClient.get<TourResponse>(
      TOUR_API_CONFIG.ENDPOINTS.TOURS.BY_ID(id)
    );
  },

  /**
   * Duplicate an existing tour
   */
  async duplicateTour(id: string): Promise<TourResponse> {
    console.log(`📋 Duplicating tour: ${id}`);
    
    return tourApiClient.post<TourResponse>(
      TOUR_API_CONFIG.ENDPOINTS.TOURS.DUPLICATE(id),
      {},
      { requireAuth: true }
    );
  },

  /**
   * Validate tour generation data before sending
   */
  validateTourData(data: CreateTourRequest): string[] {
    const errors: string[] = [];

    if (!data.destination?.trim()) {
      errors.push('Destination is required');
    }

    if (!data.duration || data.duration < 1 || data.duration > 24) {
      errors.push('Duration must be between 1 and 24 hours');
    }

    if (!data.interests || data.interests.length === 0) {
      errors.push('At least one interest must be selected');
    }

    if (!data.travelStyle?.trim()) {
      errors.push('Travel style is required');
    }

    if (!data.budget || data.budget < 0) {
      errors.push('Budget must be a positive number');
    }

    if (!data.groupSize || data.groupSize < 1 || data.groupSize > 50) {
      errors.push('Group size must be between 1 and 50');
    }

    return errors;
  },

  /**
   * Format tour data for display
   */
  formatTourForDisplay(tour: TourResponse) {
    return {
      ...tour,
      formattedRating: tour.rating.toFixed(1),
      formattedPrice: {
        solo: `$${tour.pricing.solo}`,
        couple: `$${tour.pricing.couple}`,
        group: `$${tour.pricing.group}`,
        family: `$${tour.pricing.family}`,
      },
      formattedDate: new Date(tour.createdAt).toLocaleDateString(),
      estimatedDuration: tour.duration,
      totalStops: tour.itinerary.length,
    };
  },

  /**
   * Calculate estimated total cost for a group
   */
  calculateTotalCost(tour: TourResponse, groupSize: number): number {
    if (groupSize === 1) return tour.pricing.solo;
    if (groupSize === 2) return tour.pricing.couple * 2;
    if (groupSize <= 6) return tour.pricing.group * groupSize;
    return tour.pricing.family * groupSize;
  },
};