// utils/api/services/tour-guides.service.ts
import { tourApiClient } from '../client/tour.client';
import { TOUR_API_CONFIG } from '../config/tour.config';

export interface SearchGuidesRequest {
  destination: string;
  duration: number;
  group_size: number;
  budget?: number;
  languages?: string[];
  specialties?: string[];
  travel_style?: string;
  min_rating?: number;
  date?: string;
}

export interface GuideResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio: string;
  location: string;
  languages: string[];
  specialties: string[];
  experience_years: number;
  rating: number;
  review_count: number;
  price_range: {
    half_day: number;
    full_day: number;
    currency: string;
  };
  verified: boolean;
  max_group_size: number;
  provides_transportation: boolean;
  is_available: boolean;
  experience_level: string;
}

export interface GuideRecommendation {
  guide: GuideResponse;
  match_score: number;
  reasons: string[];
  availability: boolean;
  estimated_cost: number;
  response_time?: string;
}

export interface GuideResearchResponse {
  message: string;
  destination: string;
  specialties: string[];
  guides_found: number;
  guides_saved: number;
  guides: GuideResponse[];
}

export const tourGuidesService = {
  /**
   * Search for tour guides based on criteria
   */
  async searchGuides(searchData: SearchGuidesRequest): Promise<GuideRecommendation[]> {
    console.log('🔍 Searching for guides:', searchData);
    
    return tourApiClient.post<GuideRecommendation[]>(
      TOUR_API_CONFIG.ENDPOINTS.GUIDES.SEARCH,
      searchData
    );
  },

  /**
   * Research and save new guides for a destination using AI
   */
  async researchGuides(destination: string, specialties: string[]): Promise<GuideResearchResponse> {
    console.log(`🔬 Researching guides for ${destination}:`, specialties);
    
    return tourApiClient.post<GuideResearchResponse>(
      TOUR_API_CONFIG.ENDPOINTS.GUIDES.RESEARCH(destination),
      { specialties },
      { timeout: TOUR_API_CONFIG.TIMEOUTS.GUIDE_RESEARCH }
    );
  },

  /**
   * Get all available guides
   */
  async getAllGuides(): Promise<GuideResponse[]> {
    console.log('📋 Fetching all guides');
    
    return tourApiClient.get<GuideResponse[]>(
      TOUR_API_CONFIG.ENDPOINTS.GUIDES.ALL
    );
  },

  /**
   * Get popular guides for a destination
   */
  async getPopularGuides(destination: string): Promise<GuideResponse[]> {
    console.log(`⭐ Fetching popular guides for ${destination}`);
    
    return tourApiClient.get<GuideResponse[]>(
      TOUR_API_CONFIG.ENDPOINTS.GUIDES.POPULAR(destination)
    );
  },

  /**
   * Get guides by specialty
   */
  async getGuidesBySpecialty(specialty: string): Promise<GuideResponse[]> {
    console.log(`🎯 Fetching guides for specialty: ${specialty}`);
    
    return tourApiClient.get<GuideResponse[]>(
      TOUR_API_CONFIG.ENDPOINTS.GUIDES.BY_SPECIALTY(specialty)
    );
  },

  /**
   * Get a specific guide by ID
   */
  async getGuideById(id: string): Promise<GuideResponse> {
    console.log(`👤 Fetching guide: ${id}`);
    
    return tourApiClient.get<GuideResponse>(
      TOUR_API_CONFIG.ENDPOINTS.GUIDES.BY_ID(id)
    );
  },

  /**
   * Find guides for a generated tour
   */
  async findGuidesForTour(
    destination: string,
    duration: number,
    groupSize: number,
    interests: string[]
  ): Promise<GuideRecommendation[]> {
    const searchData: SearchGuidesRequest = {
      destination,
      duration,
      group_size: groupSize,
      specialties: interests,
      languages: ['English'], // Default to English
    };

    return this.searchGuides(searchData);
  },

  /**
   * Calculate guide cost for specific tour requirements
   */
  calculateGuideCost(
    guide: GuideResponse,
    duration: number,
    groupSize: number
  ): number {
    const isFullDay = duration >= 6;
    const basePrice = isFullDay ? guide.price_range.full_day : guide.price_range.half_day;
    
    // Group size multiplier
    let multiplier = 1;
    if (groupSize > 6) {
      multiplier = 1.2; // 20% surcharge for large groups
    } else if (groupSize > 10) {
      multiplier = 1.4; // 40% surcharge for very large groups
    }

    // Duration adjustment for non-standard durations
    let durationMultiplier = 1;
    if (isFullDay && duration > 8) {
      durationMultiplier = duration / 8;
    } else if (!isFullDay && duration > 4) {
      durationMultiplier = duration / 4;
    }

    return Math.round(basePrice * multiplier * durationMultiplier);
  },

  /**
   * Format guide data for display
   */
  formatGuideForDisplay(guide: GuideResponse) {
    return {
      ...guide,
      formattedRating: guide.rating.toFixed(1),
      formattedExperience: `${guide.experience_years} years`,
      formattedPrice: {
        halfDay: `$${guide.price_range.half_day}`,
        fullDay: `$${guide.price_range.full_day}`,
      },
      languagesList: guide.languages.join(', '),
      specialtiesList: guide.specialties.join(', '),
      shortBio: guide.bio.length > 150 ? guide.bio.substring(0, 150) + '...' : guide.bio,
    };
  },

  /**
   * Get match score description
   */
  getMatchScoreDescription(score: number): string {
    if (score >= 0.9) return 'Excellent Match';
    if (score >= 0.8) return 'Great Match';
    if (score >= 0.7) return 'Good Match';
    if (score >= 0.6) return 'Fair Match';
    return 'Basic Match';
  },

  /**
   * Validate search criteria
   */
  validateSearchCriteria(data: SearchGuidesRequest): string[] {
    const errors: string[] = [];

    if (!data.destination?.trim()) {
      errors.push('Destination is required');
    }

    if (!data.duration || data.duration < 1 || data.duration > 24) {
      errors.push('Duration must be between 1 and 24 hours');
    }

    if (!data.group_size || data.group_size < 1 || data.group_size > 50) {
      errors.push('Group size must be between 1 and 50');
    }

    if (data.min_rating && (data.min_rating < 1 || data.min_rating > 5)) {
      errors.push('Rating must be between 1 and 5');
    }

    return errors;
  },
};