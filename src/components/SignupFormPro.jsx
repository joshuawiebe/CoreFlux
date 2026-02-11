import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, 
  ChevronRight, ChevronLeft, Zap, Calendar, Building
} from 'lucide-react';

const SignupFormPro = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    company: '',
    role: 'user',
    agreeTerms: false,
    newsletter: false,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    level: 'weak',
    requirements: {
      minLength: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    }
  });

  useEffect(() => {
    const checkPasswordStrength = (password) => {
      const reqs = {
        minLength: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      };

      const metRequirements = Object.values(reqs).filter(Boolean).length;
      const levels = ['weak', 'fair', 'good', 'strong'];
      const levelIndex = Math.min(Math.floor((metRequirements / 5) * 4), 3);

      setPasswordStrength({
        score: (metRequirements / 5) * 100,
        level: levels[levelIndex],
        requirements: reqs,
      });
    };

    if (formData.password) {
      checkPasswordStrength(formData.password);
    } else {
      setPasswordStrength({
        score: 0,
        level: 'weak',
        requirements: {
          minLength: false,
          uppercase: false,
          lowercase: false,
          number: false,
          special: false,
        }
      });
    }
  }, [formData.password]);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (step === 2) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (passwordStrength.score < 60) newErrors.password = 'Password is too weak';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    }

    if (step === 3) {
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.role) newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setLoading(true);
    try {
      const success = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth,
        company: formData.company,
        role: formData.role,
        newsletter: formData.newsletter,
      });

      if (success) {
        setCurrentStep(currentStep + 1);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setErrors({ submit: err.message || 'Error creating account' });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    const { score } = passwordStrength;
    if (score < 20) return 'bg-red-500';
    if (score < 40) return 'bg-orange-500';
    if (score < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthLabel = () => {
    const labels = {
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong'
    };
    return labels[passwordStrength.level] || 'Weak';
  };

  const inputClass = `w-full px-4 py-3 rounded-lg font-medium transition-all
    ${isDark 
      ? 'bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent' 
      : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent'
    }`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="text-center flex-1 px-1">
                <motion.div
                  animate={{ scale: currentStep === step ? 1.1 : 1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm transition-all ${
                    step < currentStep
                      ? 'bg-green-500 text-white'
                      : step === currentStep
                      ? 'bg-brand-primary text-white ring-4 ring-brand-primary ring-opacity-30'
                      : isDark
                      ? 'bg-slate-700 text-slate-400'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
                </motion.div>
                <p className={`text-xs font-medium hidden sm:block ${
                  step <= currentStep
                    ? isDark ? 'text-slate-300' : 'text-slate-700'
                    : isDark ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {step === 1 && 'Personal'}
                  {step === 2 && 'Password'}
                  {step === 3 && 'Details'}
                  {step === 4 && 'Review'}
                </p>
              </div>
            ))}
          </div>

          <div className={`h-1 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <motion.div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
              animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          className={`rounded-2xl backdrop-blur-sm border p-8 md:p-10 ${
            isDark
              ? 'bg-slate-800/50 border-slate-700'
              : 'bg-white border-slate-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Personal Information
                </h2>
                <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Let's start with the basics
                </p>

                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    First Name *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10 ${errors.firstName ? '!border-red-500' : ''}`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10 ${errors.lastName ? '!border-red-500' : ''}`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.lastName}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10 ${errors.email ? '!border-red-500' : ''}`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 1)' }}>
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded accent-brand-primary"
                  />
                  <label htmlFor="newsletter" className={`text-sm cursor-pointer ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Subscribe to updates and offers
                  </label>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Password Security
                </h2>
                <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Create a strong password
                </p>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10 pr-10 ${errors.password ? '!border-red-500' : ''}`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className={`w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      ) : (
                        <Eye className={`w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.password}
                    </p>
                  )}

                  {formData.password && (
                    <motion.div
                      className="mt-4 p-4 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 1)' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Password Strength
                        </span>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                          passwordStrength.level === 'weak' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          passwordStrength.level === 'fair' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                          passwordStrength.level === 'good' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {getPasswordStrengthLabel()}
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${getPasswordStrengthColor()}`}
                          animate={{ width: `${passwordStrength.score}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      <div className="mt-4 space-y-2">
                        <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Requirements:
                        </p>
                        {[
                          { key: 'minLength', label: 'At least 8 characters' },
                          { key: 'uppercase', label: 'One uppercase letter' },
                          { key: 'lowercase', label: 'One lowercase letter' },
                          { key: 'number', label: 'One number' },
                          { key: 'special', label: 'One special character' },
                        ].map(req => (
                          <div key={req.key} className="flex items-center gap-2">
                            {passwordStrength.requirements[req.key] ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-slate-400" />
                            )}
                            <span className={`text-xs ${passwordStrength.requirements[req.key] ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10 pr-10 ${errors.confirmPassword ? '!border-red-500' : ''}`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className={`w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      ) : (
                        <Eye className={`w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 1)' }}>
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded accent-brand-primary mt-0.5"
                  />
                  <label htmlFor="agreeTerms" className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    I agree to the <a href="/terms" className="text-brand-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</a>
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-sm mt-2">{errors.agreeTerms}</p>
                )}
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Additional Information
                </h2>
                <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Help us know you better
                </p>

                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10 ${errors.dateOfBirth ? '!border-red-500' : ''}`}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Company (Optional)
                  </label>
                  <div className="relative">
                    <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`${inputClass} ${errors.role ? '!border-red-500' : ''}`}
                  >
                    <option value="user">End User</option>
                    <option value="technician">Technician</option>
                    <option value="installer">Installer</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.role}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                  </motion.div>
                  
                  <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Review Your Information
                  </h2>
                  <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Please confirm your details
                  </p>

                  <div className={`rounded-lg p-6 mb-8 ${isDark ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
                    <div className="text-left space-y-4">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Name:</span>
                        <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Email:</span>
                        <span className="font-semibold">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Password Strength:</span>
                        <span className={`font-semibold ${passwordStrength.level === 'weak' ? 'text-red-500' : passwordStrength.level === 'fair' ? 'text-orange-500' : passwordStrength.level === 'good' ? 'text-yellow-500' : 'text-green-500'}`}>
                          {getPasswordStrengthLabel()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {errors.submit && (
            <motion.div
              className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> {errors.submit}
              </p>
            </motion.div>
          )}

          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                disabled={loading}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-900 disabled:opacity-50'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Zap className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            )}
          </div>

          <p className={`text-center mt-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Already have an account? {' '}
            <button
              onClick={() => navigate('/login')}
              className="text-brand-primary hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupFormPro;
