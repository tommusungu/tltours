// utils/api/client/tour.client.ts
import { TOUR_API_CONFIG } from '../config/tour.config';
import { ApiError } from '../types/tour.types';

class TourApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = TOUR_API_CONFIG.BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('tour_auth_token');
  }

  public setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tour_auth_token', token);
    }
  }

  public removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tour_auth_token');
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData: ApiError;
      
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          message: 'Network error occurred',
          statusCode: response.status,
        };
      }
      
      // Auto logout on 401
      if (response.status === 401) {
        this.removeToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    
    return response.text() as unknown as T;
  }

  public async get<T>(
    endpoint: string, 
    options: { requireAuth?: boolean; timeout?: number } = {}
  ): Promise<T> {
    const { requireAuth = false, timeout = TOUR_API_CONFIG.TIMEOUTS.DEFAULT } = options;
    
    const headers = {
      ...this.defaultHeaders,
      ...(requireAuth ? this.getAuthHeaders() : {}),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers,
        signal: controller.signal,
      });

      return this.handleResponse<T>(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    options: { requireAuth?: boolean; timeout?: number } = {}
  ): Promise<T> {
    const { requireAuth = false, timeout = TOUR_API_CONFIG.TIMEOUTS.DEFAULT } = options;
    
    const headers = {
      ...this.defaultHeaders,
      ...(requireAuth ? this.getAuthHeaders() : {}),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      return this.handleResponse<T>(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  public async put<T>(
    endpoint: string,
    data?: any,
    options: { requireAuth?: boolean; timeout?: number } = {}
  ): Promise<T> {
    const { requireAuth = false, timeout = TOUR_API_CONFIG.TIMEOUTS.DEFAULT } = options;
    
    const headers = {
      ...this.defaultHeaders,
      ...(requireAuth ? this.getAuthHeaders() : {}),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      return this.handleResponse<T>(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  public async delete<T>(
    endpoint: string,
    options: { requireAuth?: boolean; timeout?: number } = {}
  ): Promise<T> {
    const { requireAuth = false, timeout = TOUR_API_CONFIG.TIMEOUTS.DEFAULT } = options;
    
    const headers = {
      ...this.defaultHeaders,
      ...(requireAuth ? this.getAuthHeaders() : {}),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers,
        signal: controller.signal,
      });

      return this.handleResponse<T>(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

export const tourApiClient = new TourApiClient();