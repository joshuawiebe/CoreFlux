import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SignupForm = ({ onSubmit, loading = false }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    subscribeNewsletter: false,
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: basic, 2: confirmation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your name';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (step === 1) {
      setStep(2); // Move to confirmation
      return;
    }
    
    // Final submission
    await onSubmit(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {step === 1 ? (
        <>
          {/* Name */}
          <motion.div variants={itemVariants}>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Full Name *
            </label>
            <div className="relative">
              <User className={`absolute left-4 top-3.5 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all ${
                  errors.fullName
                    ? 'border-red-500'
                    : isDark
                    ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:border-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500'
                } focus:outline-none`}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Email Address *
            </label>
            <div className="relative">
              <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all ${
                  errors.email
                    ? 'border-red-500'
                    : isDark
                    ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:border-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500'
                } focus:outline-none`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Password *
            </label>
            <div className="relative">
              <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all ${
                  errors.password
                    ? 'border-red-500'
                    : isDark
                    ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:border-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500'
                } focus:outline-none`}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={itemVariants}>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all ${
                  errors.confirmPassword
                    ? 'border-red-500'
                    : isDark
                    ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:border-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500'
                } focus:outline-none`}
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <input
              type="checkbox"
              id="newsletter"
              name="subscribeNewsletter"
              checked={formData.subscribeNewsletter}
              onChange={handleChange}
              className="w-5 h-5 rounded cursor-pointer"
            />
            <label htmlFor="newsletter" className={`text-sm cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Subscribe to our newsletter for updates and tips
            </label>
          </motion.div>

          {/* Terms */}
          <motion.div variants={itemVariants} className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="w-5 h-5 rounded cursor-pointer mt-0.5"
            />
            <label htmlFor="terms" className={`text-sm cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              I agree to the <span className="text-blue-500 hover:underline">Terms of Service</span> and{' '}
              <span className="text-blue-500 hover:underline">Privacy Policy</span> *
            </label>
          </motion.div>
          {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}

          {/* Next Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
          >
            Continue <ArrowRight className="w-5 h-5" />
          </motion.button>
        </>
      ) : (
        <>
          {/* Confirmation Step */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="text-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                Confirm Your Details
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Please review your information before proceeding
              </p>
            </div>

            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="space-y-3">
                <div>
                  <p className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                    Full Name
                  </p>
                  <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                    {formData.fullName}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                    Email Address
                  </p>
                  <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                    {formData.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(1)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  isDark
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </motion.form>
  );
};

export default SignupForm;
