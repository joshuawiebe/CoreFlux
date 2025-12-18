import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, TrendingUp, Users, Zap, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AdminPanel = () => {
  const { isDark } = useTheme();
  const [adminStats, setAdminStats] = useState({
    totalUsers: 1250,
    activeUsers: 847,
    systemHealth: 99.7,
    avgResponseTime: 45,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(Array.from({ length: 12 }, (_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      users: Math.floor(Math.random() * 500) + 800,
      errors: Math.floor(Math.random() * 50) + 10,
    })));
  }, []);

  const AdminCard = ({ icon: Icon, label, value, unit, color }) => (
    <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6 group hover:scale-105 transform">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-2">{label}</p>
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
        <h1 className="text-4xl font-bold text-brand-accent mb-2 flex items-center">
          <Shield className="w-8 h-8 mr-3" />
          Admin Panel
        </h1>
        <p className="text-gray-400">Systemverwaltung und Statistiken</p>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard icon={Users} label="Gesamte Benutzer" value={adminStats.totalUsers} color="cyan" />
        <AdminCard icon={TrendingUp} label="Aktive Benutzer" value={adminStats.activeUsers} color="pink" />
        <AdminCard icon={Shield} label="System Health" value={adminStats.systemHealth} unit="%" color="green" />
        <AdminCard icon={Zap} label="Ø Antwortzeit" value={adminStats.avgResponseTime} unit="ms" color="purple" />
      </div>

      {/* Admin Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
          <h3 className="text-xl font-bold text-brand-primary mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Benutzer-Wachstum (2024)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.2)" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F3A', border: '1px solid #00F0FF' }}
              />
              <Line type="monotone" dataKey="users" stroke="#00F0FF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* System Errors */}
        <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
          <h3 className="text-xl font-bold text-brand-accent mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Fehlerrate (2024)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 0, 255, 0.2)" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F3A', border: '1px solid #FF00FF' }}
              />
              <Bar dataKey="errors" fill="#FF00FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Settings */}
      <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
        <h3 className="text-xl font-bold text-brand-primary mb-6 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          System-Einstellungen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded border border-brand-primary border-opacity-30">
            <p className="text-gray-400 text-sm mb-2">Max. Benutzer pro Geräte</p>
            <input type="number" defaultValue="50" className="w-full px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary" />
          </div>
          <div className="p-4 rounded border border-brand-primary border-opacity-30">
            <p className="text-gray-400 text-sm mb-2">Session Timeout (Min)</p>
            <input type="number" defaultValue="30" className="w-full px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary" />
          </div>
          <div className="p-4 rounded border border-brand-primary border-opacity-30">
            <p className="text-gray-400 text-sm mb-2">Max. API-Anfragen/Min</p>
            <input type="number" defaultValue="1000" className="w-full px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary" />
          </div>
          <div className="p-4 rounded border border-brand-primary border-opacity-30">
            <p className="text-gray-400 text-sm mb-2">Backup Intervall (h)</p>
            <input type="number" defaultValue="24" className="w-full px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary" />
          </div>
        </div>
        <button className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg transition-all w-full mt-4">Einstellungen speichern</button>
      </div>

      {/* User Management */}
      <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
        <h3 className="text-xl font-bold text-brand-accent mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Benutzer-Management
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-brand-primary">Benutzer</th>
                <th className="text-left py-3 px-4 text-brand-primary">Rolle</th>
                <th className="text-left py-3 px-4 text-brand-primary">Status</th>
                <th className="text-left py-3 px-4 text-brand-primary">Letzter Login</th>
                <th className="text-left py-3 px-4 text-brand-primary">Aktion</th>
              </tr>
            </thead>
            <tbody>
              {[
                { username: 'admin', role: 'Admin', status: 'active', lastLogin: 'Heute' },
                { username: 'user123', role: 'User', status: 'active', lastLogin: '2 Std. ago' },
                { username: 'demo', role: 'User', status: 'idle', lastLogin: 'Gestern' },
              ].map((user, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-dark-bg transition-colors">
                  <td className="py-3 px-4 text-gray-300">{user.username}</td>
                  <td className="py-3 px-4 text-brand-primary">{user.role}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'active' ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-yellow-500 bg-opacity-20 text-yellow-400'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <button className="text-brand-primary hover:text-brand-accent transition-colors text-xs font-bold">BEARBEITEN</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Settings */}
      <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
        <h3 className="text-xl font-bold text-brand-accent mb-6 flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          Sicherheitseinstellungen
        </h3>
        <div className="space-y-4">
          <button className="w-full p-4 rounded border border-brand-accent border-opacity-30 hover:bg-dark-bg transition-all text-left">
            <p className="font-bold text-brand-accent">Alle Sitzungen beenden</p>
            <p className="text-sm text-gray-400 mt-1">Beende alle aktiven Benutzer-Sitzungen</p>
          </button>
          <button className="w-full p-4 rounded border border-brand-accent border-opacity-30 hover:bg-dark-bg transition-all text-left">
            <p className="font-bold text-brand-accent">System neu starten</p>
            <p className="text-sm text-gray-400 mt-1">Starte das System neu (ca. 5 Minuten Ausfallzeit)</p>
          </button>
          <button className="w-full p-4 rounded border border-red-500 border-opacity-30 hover:bg-red-500 hover:bg-opacity-10 transition-all text-left">
            <p className="font-bold text-red-500">Datenbank zurücksetzen</p>
            <p className="text-sm text-gray-400 mt-1">Warnung: Diese Aktion ist nicht umkehrbar!</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
