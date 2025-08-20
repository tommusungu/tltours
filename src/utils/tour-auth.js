// utils/tour-auth.js

// Use Next.js API proxy to route to NestJS backend
const API_BASE_URL = '/api';

// Helper to safely access localStorage
const safeLocalStorage = {
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.warn('localStorage getItem failed:', error);
        return null;
      }
    }
    return null;
  },
  
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.warn('localStorage setItem failed:', error);
      }
    }
  },
  
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('localStorage removeItem failed:', error);
      }
    }
  }
};

/**
 * Login user with username/email and password
 * @param {string} username - Username or email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Login response data
 */
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.detail || 'Login failed');
    }

    // Store JWT token in localStorage
    if (data.access_token) {
      safeLocalStorage.setItem('tour_auth_token', data.access_token);
      console.log('Login successful, token stored');
    }

    console.log('Login response:', data);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.full_name - Full name
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password
 * @returns {Promise<Object>} - Registration response data
 */
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.detail || 'Registration failed');
    }

    // Store JWT token in localStorage
    if (data.access_token) {
      safeLocalStorage.setItem('tour_auth_token', data.access_token);
      console.log('Registration successful, token stored');
    }

    console.log('Registration response:', data);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Get current user information
 * @returns {Promise<Object>} - User data
 */
export const getCurrentUser = async () => {
  const token = safeLocalStorage.getItem('tour_auth_token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tour-auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        console.log('Token expired or invalid, clearing token');
        safeLocalStorage.removeItem('tour_auth_token');
        throw new Error('Authentication expired');
      }
      
      throw new Error(errorData.message || 'Failed to get user data');
    }

    const userData = await response.json();
    console.log('Current user data:', userData);
    return userData;
  } catch (error) {
    console.error('Get current user error:', error);
    
    // Only remove token on authentication errors, not network errors
    if (error.message.includes('Authentication expired') || error.message.includes('401')) {
      safeLocalStorage.removeItem('tour_auth_token');
    }
    
    throw error;
  }
};

/**
 * Logout current user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  const token = safeLocalStorage.getItem('tour_auth_token');
  
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/tour-auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Logout API call successful');
    } catch (error) {
      console.log('Logout API call failed, but clearing local token anyway:', error);
    }
  }

  // Always remove token from localStorage
  safeLocalStorage.removeItem('tour_auth_token');
  console.log('Token removed from localStorage');
};

/**
 * Check if user is authenticated using the verify endpoint
 * @returns {Promise<Object|null>} - User data if authenticated, null otherwise
 */
export const checkAuthStatus = async () => {
  try {
    // First check if token exists
    const token = safeLocalStorage.getItem('tour_auth_token');
    if (!token) {
      console.log('No token found in localStorage');
      return null;
    }

    console.log('Token found, verifying with server...');
    
    // Use the verify endpoint instead of profile
    const response = await fetch(`${API_BASE_URL}/tour-auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log('Token verification failed, status:', response.status);
      if (response.status === 401) {
        safeLocalStorage.removeItem('tour_auth_token');
      }
      return null;
    }

    const verificationData = await response.json();
    console.log('Auth verification successful:', verificationData);
    
    // Return the user data from the verification response
    return verificationData.user || verificationData;
  } catch (error) {
    console.log('Auth check failed:', error.message);
    
    // Don't remove token on network errors, only on auth errors
    if (!error.message.includes('Network error') && !error.message.includes('fetch')) {
      safeLocalStorage.removeItem('tour_auth_token');
    }
    
    return null;
  }
};

/**
 * Verify token is still valid
 * @returns {Promise<Object>} - Verification response
 */
export const verifyToken = async () => {
  const token = safeLocalStorage.getItem('tour_auth_token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/tour-auth/verify`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      safeLocalStorage.removeItem('tour_auth_token');
    }
    throw new Error('Token verification failed');
  }

  return await response.json();
};

/**
 * Check if user has a token (without API call)
 * @returns {boolean} - True if token exists
 */
export const hasToken = () => {
  return !!safeLocalStorage.getItem('tour_auth_token');
};

/**
 * Validate user input
 */
export const validateForm = {
  username: (username) => {
    if (!username?.trim()) return 'Username or email is required';
    return null;
  },

  fullName: (fullName) => {
    if (!fullName?.trim()) return 'Full name is required';
    return null;
  },

  email: (email) => {
    if (!email?.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    return null;
  },

  password: (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return null;
  },

  signupUsername: (username) => {
    if (!username?.trim()) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return null;
  }
};

/**
 * Handle API errors and return user-friendly messages
 * @param {Error} error - Error object
 * @returns {string} - User-friendly error message
 */
export const handleAuthError = (error) => {
  const message = error.message;
  
  if (message.includes('Invalid credentials')) {
    return 'Invalid username/email or password';
  }
  
  if (message.includes('Username already registered')) {
    return 'This username is already taken';
  }
  
  if (message.includes('Email already registered')) {
    return 'An account with this email already exists';
  }
  
  if (message.includes('Account is deactivated')) {
    return 'Your account has been deactivated. Please contact support.';
  }
  
  if (message.includes('Network error') || message.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  // Handle validation errors from class-validator
  if (message.includes('must contain at least one uppercase')) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
  
  if (message.includes('can only contain letters, numbers, and underscores')) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  
  return message || 'An unexpected error occurred. Please try again.';
};