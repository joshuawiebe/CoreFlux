import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AppointmentBooking = ({ onComplete, userEmail }) => {
  const { isDark } = useTheme();
  const [step, setStep] = useState(1); // 1: date, 2: time, 3: confirmation
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate available dates (next 7-60 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    today.setDate(today.getDate() + 7); // Start from 7 days from now
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      // Skip Sundays
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    return dates;
  };

  const timeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
  ];

  const handleConfirm = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const appointment = {
      date: selectedDate,
      time: selectedTime,
      notes,
      email: userEmail,
      bookedAt: new Date().toISOString(),
    };
    
    localStorage.setItem('appointment', JSON.stringify(appointment));
    onComplete(appointment);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const availableDates = getAvailableDates();
  const formatDate = (date) => date.toLocaleDateString('de-DE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {step === 1 ? (
        <>
          <motion.div variants={itemVariants}>
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Select Installation Date
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose a date when our technician can visit for installation
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pb-4">
            {availableDates.map((date) => {
              const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
              return (
                <motion.button
                  key={date.toISOString()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(date)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    isSelected
                      ? isDark
                        ? 'border-blue-500 bg-blue-600/20 text-blue-400'
                        : 'border-blue-500 bg-blue-50 text-blue-700'
                      : isDark
                      ? 'border-gray-700 hover:border-gray-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    {date.getDate()}
                  </div>
                  <div className="text-xs opacity-75 mt-1">
                    {date.toLocaleDateString('de-DE', { month: 'short' })}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!selectedDate}
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </motion.button>
        </>
      ) : step === 2 ? (
        <>
          <motion.div variants={itemVariants}>
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Select Time Slot
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedDate ? `Available times for ${formatDate(selectedDate)}` : 'Choose a date first'}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    isSelected
                      ? isDark
                        ? 'border-blue-500 bg-blue-600/20'
                        : 'border-blue-500 bg-blue-50'
                      : isDark
                      ? 'border-gray-700 hover:border-gray-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Clock className={`w-5 h-5 ${isSelected ? 'text-blue-500' : ''}`} />
                  <span className={`font-semibold ${isDark ? (isSelected ? 'text-blue-400' : 'text-white') : (isSelected ? 'text-blue-600' : 'text-black')}`}>
                    {time}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Please use side entrance, large dogs present..."
              className={`w-full p-3 rounded-lg border-2 resize-none ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none transition-all`}
              rows={3}
            />
          </motion.div>

          <div className="flex gap-3">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!selectedTime}
              onClick={() => setStep(3)}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              Review <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </>
      ) : (
        <>
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Confirm Your Appointment
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Please review your appointment details
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Calendar className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date</p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    {selectedDate && formatDate(selectedDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Time</p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    {selectedTime}
                  </p>
                </div>
              </div>
              {notes && (
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                    Notes
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {notes}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="flex gap-3">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(2)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                isDark
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Back
            </motion.button>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Booking...' : 'Confirm Appointment'}
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AppointmentBooking;
