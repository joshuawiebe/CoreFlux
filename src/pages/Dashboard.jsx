import React, { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, TrendingUp, Activity, Cpu } from 'lucide-react';
import { simulateRealTimeData, generateChartData } from '../utils/mockData';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    aiRequests: 0,
    totalPower: 0,
    avgTemperature: 0,
    onlineDevices: 0,
    totalDevices: 0,
    networkLoad: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Initial data
    setChartData(generateChartData());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(simulateRealTimeData());
      setChartData(prev => {
        const newData = [...prev];
        const lastItem = newData[newData.length - 1];
        newData.push({
          day: `+${newData.length + 1}`,
          requests: Math.floor(Math.random() * 5000) + 1000,
          power: Math.floor(Math.random() * 3000) + 1500,
          temperature: Math.floor(Math.random() * 15) + 55,
        });
        return newData.slice(-20);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, label, value, unit, color }) => (
    <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6 group hover:scale-105 transform">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{label}</p>
          <p className={`text-3xl font-bold ${
            color === 'cyan' ? 'text-brand-primary' :
            color === 'pink' ? 'text-brand-accent' :
            color === 'green' ? (isDark ? 'text-green-400' : 'text-green-600') :
            color === 'purple' ? 'text-brand-secondary' :
            'text-brand-primary'
          }`}>
            {value}
            {unit && <span className="text-lg ml-2">{unit}</span>}
          </p>
        </div>
        <Icon className={`w-12 h-12 ${
          color === 'cyan' ? 'text-brand-primary' :
          color === 'pink' ? 'text-brand-accent' :
          color === 'green' ? (isDark ? 'text-green-400' : 'text-green-600') :
          color === 'purple' ? 'text-brand-secondary' :
          'text-brand-primary'
        } opacity-50`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-brand-primary mb-2">Dashboard</h1>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Echtzeit-Überwachung des AI-Heiznetzwerks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={Zap} label="AI-Anfragen (24h)" value={stats.aiRequests} unit="req" color="cyan" />
        <StatCard icon={TrendingUp} label="Gesamtleistung" value={stats.totalPower} unit="W" color="pink" />
        <StatCard icon={Activity} label="Ø Temperatur" value={stats.avgTemperature} unit="°C" color="green" />
        <StatCard icon={Cpu} label="Online Geräte" value={`${stats.onlineDevices}/${stats.totalDevices}`} color="purple" />
        <StatCard icon={Activity} label="Netzwerkauslastung" value={stats.networkLoad} unit="%" color="cyan" />
        <StatCard icon={TrendingUp} label="Systemeffizienz" value="94.2" unit="%" color="pink" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Requests Chart */}
        <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
          <h3 className="text-xl font-bold text-brand-primary mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            AI-Anfragen Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.2)" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F3A', border: '1px solid #00F0FF' }}
                cursor={{ stroke: '#00F0FF' }}
              />
              <Area type="monotone" dataKey="requests" stroke="#00F0FF" fillOpacity={1} fill="url(#colorRequests)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Power Consumption Chart */}
        <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
          <h3 className="text-xl font-bold text-brand-accent mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Stromverbrauch (W)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 0, 255, 0.2)" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F3A', border: '1px solid #FF00FF' }}
                cursor={{ stroke: '#FF00FF' }}
              />
              <Line type="monotone" dataKey="power" stroke="#FF00FF" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Chart */}
        <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
          <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Temperaturverlauf (°C)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 136, 0.2)" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F3A', border: '1px solid #00FF88' }}
              />
              <Bar dataKey="temperature" fill="#00FF88" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* System Status Pie Chart */}
        <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
          <h3 className="text-xl font-bold text-brand-secondary mb-4 flex items-center">
            <Cpu className="w-5 h-5 mr-2" />
            Geräte-Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Online', value: stats.onlineDevices },
                  { name: 'Offline', value: stats.totalDevices - stats.onlineDevices }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#00F0FF" />
                <Cell fill="#FF0000" />
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F3A', border: '1px solid #9D00FF' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Info */}
      <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
        <h3 className="text-xl font-bold text-brand-primary mb-4">System-Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded border border-brand-primary border-opacity-30 ${isDark ? 'dark:bg-slate-800' : 'bg-slate-50'}`}>
            <p className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Uptime</p>
            <p className="text-2xl font-bold text-brand-primary">99.7%</p>
          </div>
          <div className={`p-4 rounded border border-brand-accent border-opacity-30 ${isDark ? 'dark:bg-slate-800' : 'bg-slate-50'}`}>
            <p className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Durchsatz</p>
            <p className="text-2xl font-bold text-brand-accent">2.4 GB/s</p>
          </div>
          <div className={`p-4 rounded border border-green-400 border-opacity-30 ${isDark ? 'dark:bg-slate-800' : 'bg-slate-50'}`}>
            <p className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Latenz</p>
            <p className="text-2xl font-bold text-green-400">12ms</p>
          </div>
          <div className={`p-4 rounded border border-brand-secondary border-opacity-30 ${isDark ? 'dark:bg-slate-800' : 'bg-slate-50'}`}>
            <p className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Last</p>
            <p className="text-2xl font-bold text-brand-secondary">45%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
