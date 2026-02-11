import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Flame, AlertCircle, TrendingDown, Settings, Zap, Thermometer } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  getHeatingOptimization,
  predictHeatingNeeds,
  getTemperatureSchedule,
  calculateEfficiencyRating,
  detectHeatingIssues,
} from '../utils/heatingAIIntegration';

const HeatingAIAssistant = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `👋 Hello! I'm your CoreFlux Heating AI Assistant. I can help you optimize your heating system efficiency, reduce energy costs, and detect potential issues. What would you like help with today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [heatingData, setHeatingData] = useState({
    currentTemp: 19,
    targetTemp: 21,
    efficiency: 82,
    dailyUsage: 18,
    systemAge: 8,
    fuelType: 'Natural Gas',
    lastMaintenance: '2024-06-15',
  });
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleHeatingQuery = async (query) => {
    setLoading(true);
    let response = '';

    try {
      if (query.toLowerCase().includes('optimize') || query.toLowerCase().includes('recommendation')) {
        const optimization = await getHeatingOptimization(heatingData);
        if (optimization.success && optimization.recommendations) {
          response = `🔧 **Heating Optimization Recommendations**\n\n`;
          response += `**Immediate Steps:**\n${optimization.recommendations.immediateSteps?.map(s => `• ${s}`).join('\n')}\n\n`;
          response += `**Weekly Strategies:**\n${optimization.recommendations.weeklyStrategies?.map(s => `• ${s}`).join('\n')}\n\n`;
          response += `**Estimated Savings:** ${optimization.recommendations.energySavingsPercent || 15}%`;
        } else {
          response = optimization.recommendations?.immediateSteps?.map(s => `• ${s}`).join('\n') || 'Unable to generate recommendations';
        }
      } else if (query.toLowerCase().includes('predict') || query.toLowerCase().includes('forecast')) {
        const prediction = predictHeatingNeeds({ temperature: 5, humidity: 60 }, { averageCostPerHour: 0.5 });
        response = `📊 **Heating Needs Prediction**\n\n`;
        response += `**Predicted Load:** ${prediction.predictedLoad} units\n`;
        response += `**Estimated Hours:** ${prediction.estimatedHeatingHours} hours/day\n`;
        response += `**Estimated Daily Cost:** €${prediction.estimatedDailyCost}\n`;
        response += `**Recommendation:** ${prediction.recommendation}`;
      } else if (query.toLowerCase().includes('temperature') || query.toLowerCase().includes('schedule')) {
        const schedule = getTemperatureSchedule();
        response = `🌡️ **Temperature Schedule**\n\n`;
        Object.entries(schedule).forEach(([key, value]) => {
          response += `**${value.description}** (${value.time}): ${value.target}°C\n`;
        });
      } else if (query.toLowerCase().includes('efficiency') || query.toLowerCase().includes('rating')) {
        const rating = calculateEfficiencyRating(heatingData);
        response = `⭐ **System Efficiency Rating**\n\n`;
        response += `**Score:** ${rating.score}/100\n`;
        response += `**Rating:** ${rating.rating}\n`;
        if (rating.score < 80) {
          response += `\n💡 **Recommendation:** Consider scheduling maintenance to improve efficiency.`;
        }
      } else if (query.toLowerCase().includes('problem') || query.toLowerCase().includes('issue')) {
        const issues = detectHeatingIssues(heatingData, {});
        if (issues.length > 0) {
          response = `⚠️ **Detected Issues**\n\n`;
          issues.forEach(issue => {
            response += `**[${issue.severity.toUpperCase()}]** ${issue.message}\n`;
            response += `Action: ${issue.action}\n\n`;
          });
        } else {
          response = `✅ No major issues detected. Your heating system is operating normally.`;
        }
      } else {
        response = `I can help with:\n• 🔧 Optimization recommendations\n• 📊 Heating needs predictions\n• 🌡️ Temperature scheduling\n• ⭐ Efficiency ratings\n• ⚠️ Issue detection\n\nWhat would you like to explore?`;
      }
    } catch (error) {
      response = `⚠️ Error: ${error.message}. Please try again.`;
    }

    setLoading(false);
    return response;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    const response = await handleHeatingQuery(input);

    const assistantMessage = {
      id: messages.length + 2,
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  };

  const quickActions = [
    { icon: TrendingDown, label: 'Optimize', query: 'Give me optimization recommendations' },
    { icon: Thermometer, label: 'Schedule', query: 'Show me the temperature schedule' },
    { icon: AlertCircle, label: 'Issues', query: 'Detect any issues with my system' },
    { icon: Zap, label: 'Efficiency', query: 'What is my system efficiency rating?' },
  ];

  return (
    <div className={`w-full h-screen flex flex-col ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-4`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-red-900/20' : 'bg-red-100'}`}>
              <Flame className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Heating AI Assistant
              </h1>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Optimize your heating system with AI-powered insights
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`border-b ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} p-4`}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Current Temperature
              </label>
              <input
                type="number"
                value={heatingData.currentTemp}
                onChange={(e) => setHeatingData({ ...heatingData, currentTemp: Number(e.target.value) })}
                className={`w-full px-3 py-2 rounded-lg ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} border`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Target Temperature
              </label>
              <input
                type="number"
                value={heatingData.targetTemp}
                onChange={(e) => setHeatingData({ ...heatingData, targetTemp: Number(e.target.value) })}
                className={`w-full px-3 py-2 rounded-lg ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} border`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                System Efficiency (%)
              </label>
              <input
                type="number"
                value={heatingData.efficiency}
                onChange={(e) => setHeatingData({ ...heatingData, efficiency: Number(e.target.value) })}
                className={`w-full px-3 py-2 rounded-lg ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} border`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                System Age (years)
              </label>
              <input
                type="number"
                value={heatingData.systemAge}
                onChange={(e) => setHeatingData({ ...heatingData, systemAge: Number(e.target.value) })}
                className={`w-full px-3 py-2 rounded-lg ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'} border`}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-brand-primary text-white rounded-br-none'
                    : isDark
                    ? 'bg-slate-800 text-slate-100 rounded-bl-none'
                    : 'bg-slate-200 text-slate-900 rounded-bl-none'
                }`}>
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  <span className={`text-xs mt-2 block ${message.role === 'user' ? 'text-blue-100' : isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex justify-start`}
              >
                <div className={`px-4 py-3 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                        className={`w-2 h-2 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className={`border-t ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-4`}>
          <div className="max-w-4xl mx-auto">
            <p className={`text-sm font-medium mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Quick Actions:
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    setInput(action.query);
                  }}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-medium flex items-center gap-2 ${
                    isDark
                      ? 'border-slate-700 hover:border-slate-600 hover:bg-slate-700'
                      : 'border-slate-300 hover:border-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className={`border-t ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-4`}>
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about heating optimization, efficiency, or issues..."
            className={`flex-1 px-4 py-3 rounded-lg border ${
              isDark
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary'
            }`}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 rounded-lg bg-brand-primary text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeatingAIAssistant;
