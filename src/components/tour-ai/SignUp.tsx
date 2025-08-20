'use client';

import { useState } from 'react';
import { Bot, Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle, Zap, TrendingUp, Shield, UserPlus, ArrowRight, Star, Users, Sparkles, MapPin, Compass, Globe } from 'lucide-react';
import { register, validateForm, handleAuthError } from '@/utils/tour-auth';

const SignUp = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateSignupForm = () => {
    const newErrors = {};

    const usernameError = validateForm.signupUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;

    const fullNameError = validateForm.fullName(formData.full_name);
    if (fullNameError) newErrors.full_name = fullNameError;

    const emailError = validateForm.email(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validateForm.password(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {    
    if (!validateSignupForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const data = await register(formData);
      onSuccess && onSuccess(data);
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = handleAuthError(error);
      
      // Handle specific field errors
      if (error.message.includes('Username already registered')) {
        setErrors({ username: 'This username is already taken' });
      } else if (error.message.includes('Email already registered')) {
        setErrors({ email: 'An account with this email already exists' });
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: '', color: 'bg-gray-600' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score === 0) return { strength: 25, text: 'Weak', color: 'bg-red-500' };
    if (score === 1) return { strength: 50, text: 'Fair', color: 'bg-yellow-500' };
    if (score === 2) return { strength: 75, text: 'Good', color: 'bg-blue-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Value Proposition */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                  <Compass className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold text-white">
                  Tour<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Creator AI</span>
                </h1>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-3 leading-tight">
                Create Amazing Tours with AI Power
              </h2>
              
              <p className="text-base text-gray-400 mb-6 leading-relaxed">
                Join thousands of travelers and guides who've transformed their tour experiences with our AI agent. 
                Generate personalized itineraries, discover hidden gems, and create unforgettable journeys.
              </p>
            </div>

            {/* Social Proof */}
            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="text-yellow-400 fill-current" size={14} />
                  ))}
                </div>
                <span className="text-white font-semibold text-sm">4.9/5 from 1,847 travelers</span>
              </div>
              <blockquote className="text-gray-400 text-sm mb-3">
                "TourCreator AI planned the perfect 10-day European adventure. Every recommendation was spot-on and saved me weeks of research!"
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  A
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Alex Johnson</p>
                  <p className="text-gray-400 text-xs">Travel Blogger & Digital Nomad</p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <MapPin className="text-purple-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm">Smart Itineraries</h3>
                <p className="text-gray-400 text-xs">AI-powered tour planning in minutes</p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Globe className="text-blue-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm">Local Insights</h3>
                <p className="text-gray-400 text-xs">Discover hidden gems and local secrets</p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="text-green-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm">Travel Safe</h3>
                <p className="text-gray-400 text-xs">Real-time safety and travel alerts</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-center lg:justify-start">
              <div>
                <div className="text-lg font-bold text-white">1.8K+</div>
                <div className="text-xs text-gray-400">Tours Created</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">25K+</div>
                <div className="text-xs text-gray-400">Happy Travelers</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">95%</div>
                <div className="text-xs text-gray-400">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="relative h-full">
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 shadow-2xl h-full flex flex-col justify-between">
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Start Your Adventure</h3>
                  <p className="text-gray-400 text-sm">No credit card required • Free forever plan</p>
                </div>

                {/* General Error */}
                {errors.general && (
                  <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-3 flex items-center gap-2 mb-4">
                    <AlertCircle className="text-red-400" size={16} />
                    <span className="text-red-400 text-sm">{errors.general}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Full Name</label>
                    <div className="relative">
                      <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your full name"
                        className={`w-full bg-slate-700/50 border-2 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          errors.full_name ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400 focus:bg-slate-700'
                        }`}
                      />
                    </div>
                    {errors.full_name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Choose a unique username"
                        className={`w-full bg-slate-700/50 border-2 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          errors.username ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400 focus:bg-slate-700'
                        }`}
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.username}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your email address"
                        className={`w-full bg-slate-700/50 border-2 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          errors.email ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400 focus:bg-slate-700'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Create a secure password"
                        className={`w-full bg-slate-700/50 border-2 rounded-xl pl-11 pr-11 py-3 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                          errors.password ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-400 focus:bg-slate-700'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">Password strength</span>
                          <span className={`text-xs font-medium ${
                            passwordStrength.text === 'Strong' ? 'text-green-400' :
                            passwordStrength.text === 'Good' ? 'text-blue-400' :
                            passwordStrength.text === 'Fair' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {passwordStrength.text}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${passwordStrength.strength}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Compass size={18} />
                        Start Creating Tours
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  {/* Terms */}
                  <p className="text-center text-xs text-gray-400 leading-relaxed">
                    By creating an account, you agree to our Terms of Service and Privacy Policy. 
                    Start your journey with our free forever plan.
                  </p>
                </div>
              </div>

              {/* Switch to Login */}
              <div className="mt-4 text-center pt-4 border-t border-slate-700">
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;