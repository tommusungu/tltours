'use client';

import { useState, useEffect } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { checkAuthStatus } from '../../utils/tour-auth';

const AuthFlow = ({ onAuthSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated when component mounts
  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        setIsLoading(true);
        const userData = await checkAuthStatus();
        
        if (userData) {
          console.log('User already authenticated with tour-auth:', userData);
          setIsAuthenticated(true);
          onAuthSuccess && onAuthSuccess(userData);
        } else {
          console.log('No valid tour-auth session found');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingAuth();
  }, [onAuthSuccess]);

  const handleAuthSuccess = (data) => {
    console.log('Tour auth successful:', data);
    setIsAuthenticated(true);
    // Call the parent callback to redirect to main app
    onAuthSuccess && onAuthSuccess(data);
  };

  const switchToLogin = () => {
    setIsLoginMode(true);
  };

  const switchToSignUp = () => {
    setIsLoginMode(false);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  // If user is already authenticated, don't show auth forms
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // Show appropriate auth form
  if (isLoginMode) {
    return (
      <Login 
        onSuccess={handleAuthSuccess}
        onSwitchToSignUp={switchToSignUp}
      />
    );
  }

  return (
    <SignUp 
      onSuccess={handleAuthSuccess}
      onSwitchToLogin={switchToLogin}
    />
  );
};

export default AuthFlow;