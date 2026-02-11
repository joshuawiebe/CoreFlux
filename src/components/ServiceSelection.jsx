import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Thermometer, ArrowRight, Brain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const ServiceSelection = ({ onClose }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);

  const services = [
    {
      id: 'ai',
      name: 'AI Platform',
      icon: Brain,
      description: 'Access powerful AI models for coding, writing, analysis, and more',
      features: [
        'Multiple AI models',
        'Fast & reliable',
        'Privacy-focused',
        'Real-time responses',
        'Model switching',
        'Chat history management',
      ],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'heating',
      name: 'Heat Control',
      icon: Thermometer,
      description: 'Smart home heating control with real-time monitoring and insights',
      features: [
        'Temperature management',
        'Device monitoring',
        'Energy insights',
        'Installation booking',
        'Professional support',
        'Energy savings tracking',
      ],
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const handleSelectService = async (serviceId) => {
    setSelectedService(serviceId);
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    localStorage.setItem('selected_service', serviceId);
    if (serviceId === 'ai') {
      navigate('/ai-chat');
    } else {
      navigate('/dashboard');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Choose Your Service
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Select the platform that best fits your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedService === service.id;

            return (
              <motion.button
                key={service.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectService(service.id)}
                disabled={loading && selectedService !== service.id}
                className={`text-left p-8 rounded-2xl border-2 transition-all cursor-pointer group relative overflow-hidden ${
                  isSelected
                    ? isDark
                      ? 'border-blue-500 bg-gray-900/50 ring-2 ring-blue-500/30'
                      : 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-200'
                    : isDark
                    ? 'border-gray-700 bg-gray-900 hover:border-gray-600'
                    : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-full blur-3xl`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    animate={isSelected ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] } : {}}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.gradient}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div>
                    <h3 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                      {service.name}
                    </h3>
                    <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                          <Zap className={`w-4 h-4 ${isSelected ? 'text-blue-500' : 'text-gray-500'}`} />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Select Button */}
                  <motion.div
                    animate={isSelected ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    className={`py-3 px-4 rounded-lg bg-gradient-to-r ${service.gradient} text-white font-semibold flex items-center justify-center gap-2`}
                  >
                    {loading && selectedService === service.id ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        {isSelected ? 'Selected' : 'Select'}
                        {isSelected && <ArrowRight className="w-4 h-4" />}
                      </>
                    )}
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Info */}
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-xl border ${isDark ? 'bg-gray-900/50 border-gray-800 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'}`}
        >
          <p className="text-sm">
            💡 <span className="font-semibold">Tip:</span> You can always switch between services in your account settings. Choose the one you'd like to start with!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServiceSelection;
