import React, { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, TrendingUp, Activity, Cpu, AlertTriangle, Wifi, Code, Rocket, Lock, Thermometer, Clock, DollarSign } from 'lucide-react';
import { simulateRealTimeData, generateChartData, DEVICES } from '../utils/mockData';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const { t } = useTranslation();
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

  // Filter devices based on user role
  const userDevices = user?.role === 'admin' 
    ? DEVICES 
    : DEVICES.filter(d => d.owner === user?.username);

  // Find offline devices
  const offlineDevices = userDevices.filter(d => d.status === 'offline');

  useEffect(() => {
    // Initial data
    setChartData(generateChartData());

    // Simulate real-time updates with smooth transitions
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
        // Remove oldest data point and add new one (smooth scrolling effect)
        newData.shift(); // Remove first element
        newData.push({
          day: `+${newData.length + 1}`,
          requests: Math.max(1000, newData[newData.length - 1]?.requests || 3000) + Math.floor((Math.random() - 0.5) * 1000),
          power: Math.max(1500, newData[newData.length - 1]?.power || 2500) + Math.floor((Math.random() - 0.5)  * 800),
          temperature: Math.max(55, newData[newData.length - 1]?.temperature || 65) + Math.floor((Math.random() - 0.5) * 4),
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, label, value, unit, color, desc }) => (
    <div className={`rounded-xl border p-6 group hover:shadow-lg transform transition-all ${
      isDark 
        ? 'bg-slate-800 border-slate-700 hover:border-brand-primary' 
        : 'bg-white border-slate-200 hover:border-brand-primary'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className={`text-sm mb-2 font-medium ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>{label}</p>
          <div className="flex items-baseline gap-2">
            <p className={`text-3xl font-bold ${
              color === 'primary' ? 'text-brand-primary' :
              color === 'accent' ? 'text-brand-accent' :
              color === 'green' ? (isDark ? 'text-green-400' : 'text-green-600') :
              color === 'purple' ? 'text-brand-secondary' :
              'text-brand-primary'
            }`}>
              {value}
            </p>
            {unit && <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{unit}</span>}
          </div>
          {desc && <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{desc}</p>}
        </div>
        <Icon className={`w-12 h-12 ${
          color === 'primary' ? 'text-brand-primary' :
          color === 'accent' ? 'text-brand-accent' :
          color === 'green' ? (isDark ? 'text-green-400' : 'text-green-600') :
          color === 'purple' ? 'text-brand-secondary' :
          'text-brand-primary'
        } opacity-30`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-brand-primary mb-2">{t('dashboard.title')}</h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Welcome back! Here's your AI and heating system performance.
          </p>
        </div>
      </div>

      {/* Demo Mode Alert */}
      <div className={`rounded-xl border p-4 flex items-start gap-4 ${isDark ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
        <Zap className={`w-6 h-6 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        <div>
          <h3 className={`font-semibold mb-1 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
            {t('aiChat.welcome')}
          </h3>
          <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
            All data and statistics are simulated in demo mode. Try the AI Chat to interact with our intelligent system or upgrade your plan for real AI services.
          </p>
        </div>
      </div>

      {/* AI Service Stats (Primary Focus) */}
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          🤖 AI Service Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            icon={Cpu} 
            label="API Requests This Month" 
            value={stats.aiRequests.toLocaleString()} 
            unit="requests"
            color="primary"
            desc="Growing 23% week-over-week"
          />
          <StatCard 
            icon={Activity} 
            label="System Uptime" 
            value={stats.apiUptime}
            unit="%"
            color="green"
            desc="99.9% SLA guaranteed"
          />
          <StatCard 
            icon={TrendingUp} 
            label="Network Load" 
            value={stats.networkLoad}
            unit="%"
            color="accent"
            desc="Optimal performance"
          />
          <StatCard 
            icon={Code} 
            label="Active Models" 
            value="12"
            unit="models"
            color="purple"
            desc="Private + Public"
          />
        </div>
      </div>

      {/* AI Service Recommendations */}
      <div className={`rounded-xl border p-6 ${isDark ? 'bg-brand-primary/10 border-brand-primary/30' : 'bg-blue-50 border-brand-primary/20'}`}>
        <div className="flex items-start gap-4">
          <Rocket className="w-6 h-6 text-brand-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Upgrade to Pro Plan
            </h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Your usage is growing! The Pro plan offers unlimited API requests, priority support, and custom model training. You could save 20% compared to pay-as-you-go pricing.
            </p>
            <Link to="/pricing" className="text-brand-primary font-semibold hover:underline">
              View Pricing →
            </Link>
          </div>
        </div>
      </div>

      {/* Heating Devices Section (if user has heating) */}
      {userDevices.length > 0 && (
        <>
          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              🔥 Heating System Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard 
                icon={Wifi} 
                label="Online Devices" 
                value={userDevices.filter(d => d.status === 'online').length}
                unit={`of ${userDevices.length}`}
                color="green"
              />
              <StatCard 
                icon={Thermometer} 
                label="Avg Temperature" 
                value={Math.round(userDevices.reduce((sum, d) => sum + d.temperature, 0) / userDevices.length)}
                unit="°C"
                color="primary"
              />
              <StatCard 
                icon={Zap} 
                label="Total Power Usage" 
                value={userDevices.reduce((sum, d) => sum + d.power, 0).toLocaleString()}
                unit="W"
                color="accent"
              />
              <StatCard 
                icon={TrendingUp} 
                label="Monthly Savings" 
                value={stats.monthlySavings}
                unit="€"
                color="green"
                desc="vs traditional heating"
              />
            </div>
          </div>

          {/* Device Cost Breakdown */}
          <div className={`rounded-xl border p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <DollarSign className="w-6 h-6 text-green-500" />
              Device Cost & Ownership
            </h3>

            <div className="space-y-4">
              {userDevices.map((device, idx) => {
                const yearsOwned = Math.random() * 4; // Simulated years since installation
                const monthlyElectricity = Math.floor(Math.random() * 100) + 50;
                const monthlyAISavings = 0; // 50% AI discount applies
                const traditionalHeatingCost = monthlyElectricity * 1.8; // CoreFlux is more efficient
                const monthlyHeatingSavings = traditionalHeatingCost - monthlyElectricity;
                
                return (
                  <div
                    key={device.id}
                    className={`p-4 rounded-lg border ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {device.name} - {device.location}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Installed {Math.floor(yearsOwned)} years ago
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        yearsOwned >= 3
                          ? 'bg-green-100 text-green-800'
                          : yearsOwned >= 1
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {yearsOwned >= 3 ? '✓ Paid Off' : `Year ${Math.ceil(yearsOwned)}/3-5`}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Monthly Cost
                        </p>
                        <p className={`text-lg font-bold text-brand-primary`}>€{monthlyElectricity}</p>
                        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Electricity only</p>
                      </div>

                      <div>
                        <p className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Traditional Cost
                        </p>
                        <p className={`text-lg font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                          €{Math.round(traditionalHeatingCost)}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Would cost</p>
                      </div>

                      <div>
                        <p className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Heating Savings
                        </p>
                        <p className={`text-lg font-bold text-green-500`}>€{Math.round(monthlyHeatingSavings)}</p>
                        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Per month</p>
                      </div>

                      <div>
                        <p className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Total Savings
                        </p>
                        <p className={`text-lg font-bold text-brand-primary`}>€{Math.round(monthlyHeatingSavings * yearsOwned * 12)}</p>
                        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Since install</p>
                      </div>
                    </div>

                    <div className={`mt-4 p-3 rounded border-l-4 ${
                      yearsOwned >= 3
                        ? isDark ? 'bg-green-900/20 border-l-green-500' : 'bg-green-50 border-l-green-500'
                        : isDark ? 'bg-blue-900/20 border-l-blue-500' : 'bg-blue-50 border-l-blue-500'
                    }`}>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          {yearsOwned >= 3 ? (
                            <p className={`font-semibold ${isDark ? 'text-green-300' : 'text-green-900'}`}>
                              Device is fully paid off! You own it completely. Keep enjoying 50% AI discounts for life.
                            </p>
                          ) : (
                            <div>
                              <p className={`font-semibold ${isDark ? 'text-blue-300' : 'text-blue-900'} mb-1`}>
                                Ownership in {Math.ceil(3 - yearsOwned)} years
                              </p>
                              <p className={isDark ? 'text-blue-200' : 'text-blue-800'}>
                                Once the device is fully paid (typically 3-5 years), you own it outright. Continue earning heating discounts + 50% off all AI services.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
              <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>💡 Pro Tip:</strong> Your device cost is covered by us. Installation (€500-1,500) is a one-time professional setup. Your monthly savings pay off the device over 3-5 years, after which it's yours forever.
              </p>
            </div>
          </div>

          {/* Offline Devices Alert */}
          {offlineDevices.length > 0 && (
            <div className={`rounded-xl border p-6 ${isDark ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-start gap-4">
                <AlertTriangle className={`w-6 h-6 flex-shrink-0 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                <div>
                  <h3 className={`font-semibold mb-3 ${isDark ? 'text-red-300' : 'text-red-900'}`}>
                    {offlineDevices.length} Device{offlineDevices.length !== 1 ? 's' : ''} Offline
                  </h3>
                  <ul className="space-y-2">
                    {offlineDevices.map(device => {
                      const daysSinceOnline = Math.floor((Date.now() - device.lastOnline.getTime()) / (1000 * 60 * 60 * 24));
                      return (
                        <div key={device.id} className={`text-sm ${isDark ? 'text-red-200' : 'text-red-800'}`}>
                          <p className="font-medium">{device.name} ({device.location})</p>
                          <p className={isDark ? 'text-red-300' : 'text-red-700'}>
                            Offline for {daysSinceOnline} days - Request service to recover device
                          </p>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Charts Section */}
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          System Performance
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Requests Chart */}
          <div className={`rounded-xl border p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AI Requests Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066CC" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0066CC" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
                <XAxis dataKey="day" stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                  }}
                  labelStyle={{ color: isDark ? '#F3F4F6' : '#111827' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#0066CC" fillOpacity={1} fill="url(#colorRequests)" isAnimationActive={true} animationDuration={300} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Power & Temperature Chart */}
          <div className={`rounded-xl border p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Power & Temperature
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
                <XAxis dataKey="day" stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                  }}
                  labelStyle={{ color: isDark ? '#F3F4F6' : '#111827' }}
                />
                <Legend />
                <Bar dataKey="power" stackId="a" fill="#0099FF" isAnimationActive={true} animationDuration={300} />
                <Bar dataKey="temperature" stackId="a" fill="#FF6B6B" isAnimationActive={true} animationDuration={300} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`rounded-xl border p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
        <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/ai-chat" className={`p-4 rounded-lg text-center font-medium transition-all ${isDark ? 'bg-brand-primary text-white hover:bg-blue-700' : 'bg-brand-primary text-white hover:bg-blue-700'}`}>
            💬 Talk to AI
          </Link>
          <Link to="/ai-chat" className={`p-4 rounded-lg text-center font-medium transition-all border-2 border-brand-primary ${isDark ? 'text-brand-primary hover:bg-slate-700' : 'text-brand-primary hover:bg-blue-50'}`}>
            🔧 Manage Devices
          </Link>
          <Link to="/pricing" className={`p-4 rounded-lg text-center font-medium transition-all border-2 border-brand-primary ${isDark ? 'text-brand-primary hover:bg-slate-700' : 'text-brand-primary hover:bg-blue-50'}`}>
            💳 View Plans
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
