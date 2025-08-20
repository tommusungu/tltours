// src/utils/api/hooks/useTours.ts
import { useState, useCallback } from 'react';

export interface CreateTourRequest {
  destination: string;
  duration: number;
  interests: string[];
  travelStyle: string;
  budget: number;
  groupSize: number;
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
  itinerary: any[];
  inclusions: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const useTourGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGeneratedTour, setLastGeneratedTour] = useState<TourResponse | null>(null);

  const generateSampleTour = useCallback(async (data: CreateTourRequest): Promise<TourResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎯 Calling API via Vite proxy with:', data);
      
      // Use Vite's proxy - requests to /tour-generation/* will be proxied to backend
      const response = await fetch('/tour-generation/generate-sample', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to generate tour';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const tour = await response.json();
      setLastGeneratedTour(tour);
      console.log('✅ Tour generated successfully via Vite proxy:', tour.title);
      return tour;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate tour';
      setError(errorMessage);
      console.error('❌ Tour generation failed:', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateAuthenticatedTour = useCallback(async (data: CreateTourRequest): Promise<TourResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('tour_auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('/tour-generation/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('tour_auth_token');
          throw new Error('Session expired. Please login again.');
        }
        
        const errorText = await response.text();
        let errorMessage = 'Failed to generate tour';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const tour = await response.json();
      setLastGeneratedTour(tour);
      return tour;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate tour';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    generateSampleTour,
    generateAuthenticatedTour,
    loading,
    error,
    lastGeneratedTour,
    clearError,
  };
};