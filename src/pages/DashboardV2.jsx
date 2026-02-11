import React, { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Zap, Activity, TrendingUp, ThermometerSun, Wifi, DollarSign, AlertCircle, CheckCircle, Smartphone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { simulateRealTimeData, generateChartData, DEVICES } from '../utils/mockData';

const ProfessionalDashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    aiRequests: Math.floor(Math.random() * 10000) + 5000,
    totalPower: Math.floor(Math.random() * 15000) + 10000,
    avgTemperature: Math.floor(Math.random() * 20) + 60,
    onlineDevices: 5,
    totalDevices: 6,
    networkLoad: Math.floor(Math.random() * 100),
    apiUptime: 99.87,
    monthlySavings: 240,
  });
  const [chartData, setChartData] = useState([]);

  const userDevices = user?.role === 'admin' ? DEVICES : DEVICES.filter(d => d.owner === user?.username);

  useEffect(() => {
    setChartData(generateChartData());
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        aiRequests: Math.floor(Math.random() * 10000) + 5000,
        totalPower: Math.floor(Math.random() * 15000) + 10000,
        avgTemperature: Math.floor(Math.random() * 20) + 60,
        networkLoad: Math.floor(Math.random() * 100),
      }));
      setChartData(prev => {
        const newData = [...prev];
        newData.shift();
        newData.push({
          day: `+${newData.length + 1}`,
          requests: Math.max(1000, (newData[newData.length - 1]?.requests || 3000) + Math.floor((Math.random() - 0.5) * 1000)),
          power: Math.max(1500, (newData[newData.length - 1]?.power || 2500) + Math.floor((Math.random() - 0.5) * 800)),
          temperature: Math.max(55, (newData[newData.length - 1]?.temperature || 65) + Math.floor((Math.random() - 0.5) * 4)),
        });
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, label, value, unit, color, subtext }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border transition-all hover:shadow-lg ${
        isDark
          ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${
          isDark ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            color === 'blue' ? 'text-blue-500' :
            color === 'green' ? 'text-green-500' :
            color === 'purple' ? 'text-purple-500' :
            'text-blue-500'
          }`} />
        </div>
      </div>
      <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </p>
      <div className="flex items-baseline gap-2 mb-2">
        <p className={`text-3xl font-black ${isDark ? 'text-white' : 'text-black'}`}>
          {value}
        </p>
        {unit && <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{unit}</span>}
      </div>
      {subtext && <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{subtext}</p>}
    </motion.div>
  );

  const ChartCard = ({ title, chart }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
    >
      <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
        {title}
      </h3>
      {chart}
    </motion.div>
  );

  return (
    <div className={`space-y-8 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className={`text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
          Dashboard
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Welcome back! Real-time overview of your CoreFlux system.
        </p>
      </motion.div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`p-4 rounded-lg border flex items-start gap-3 ${
          isDark
            ? 'bg-blue-500/10 border-blue-500/30'
            : 'bg-blue-50 border-blue-200'
        }`}
      >
        <Zap className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        <div>
          <p className={`font-semibold mb-1 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
            Demo Data
          </p>
          <p className={`text-sm ${isDark ? 'text-blue-200/80' : 'text-blue-800/80'}`}>
            All data is simulated. Use our AI Chat for real system information or upgrade to production.
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Zap} label="API Requests" value={stats.aiRequests.toLocaleString()} unit="this month" color="blue" subtext="Processing efficiently" />
          <StatCard icon={Activity} label="System Uptime" value="99.87" unit="%" color="green" subtext="99.9% SLA guaranteed" />
          <StatCard icon={TrendingUp} label="Network Load" value={stats.networkLoad} unit="%" color="purple" subtext="Operating normally" />
          <StatCard icon={DollarSign} label="Monthly Savings" value={stats.monthlySavings} unit="€" color="green" subtext="vs traditional heating" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="API Requests Over Time"
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e7eb'} />
                <Tooltip contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }} />
                <Area type="monotone" dataKey="requests" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRequests)" isAnimationActive={true} animationDuration={300} />
              </AreaChart>
            </ResponsiveContainer>
          }
        />

        <ChartCard
          title="Temperature Tracking"
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e7eb'} />
                <Tooltip contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }} />
                <Line type="monotone" dataKey="temperature" stroke="#ec4899" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={300} />
              </LineChart>
            </ResponsiveContainer>
          }
        />
      </div>

      {/* Power Usage & Heating Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Power Consumption"
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e7eb'} />
                <Tooltip contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px'
                }} />
                <Bar dataKey="power" fill="#a855f7" isAnimationActive={true} animationDuration={300} />
              </BarChart>
            </ResponsiveContainer>
          }
        />

        <div>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Device Status
          </h2>
          <div className="space-y-3">
            {userDevices.slice(0, 4).map((device) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg border flex items-center justify-between ${
                  isDark
                    ? 'bg-gray-900 border-gray-800'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                      {device.name}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {device.location}
                    </p>
                  </div>
                </div>
                {device.status === 'online' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-500" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
      >
        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
          Next Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className={`p-4 rounded-lg border transition-all text-left ${
            isDark
              ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
          }`}>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>📊 View Analytics</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Detailed system insights</p>
          </button>
          <button className={`p-4 rounded-lg border transition-all text-left ${
            isDark
              ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
          }`}>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>🔧 Configure</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Adjust heating schedules</p>
          </button>
          <button className={`p-4 rounded-lg border transition-all text-left ${
            isDark
              ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
          }`}>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>💬 AI Chat</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Get AI recommendations</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfessionalDashboard;
