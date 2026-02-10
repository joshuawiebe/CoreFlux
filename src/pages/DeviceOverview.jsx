import React, { useState } from 'react';
import { DEVICES } from '../utils/mockData';
import { MapPin, Wifi, Thermometer, Zap, Activity, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const DeviceOverview = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Filter devices based on user role
  const userDevices = user?.role === 'admin' 
    ? DEVICES 
    : DEVICES.filter(d => d.owner === user?.username);

  const getStatusColor = (status) => {
    return status === 'online' ? 'text-green-400' : 'text-red-500';
  };

  const getStatusBgColor = (status) => {
    return status === 'online' ? 'bg-green-500 bg-opacity-20 border-green-400' : 'bg-red-500 bg-opacity-20 border-red-500';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-brand-primary mb-2">Geräteübersicht</h1>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Verwalte dein verteiltes Heiznetzwerk</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-xl border p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Gesamte Geräte</p>
          <p className="text-3xl font-bold text-brand-primary">{userDevices.length}</p>
        </div>
        <div className={`rounded-xl border p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Online</p>
          <p className="text-3xl font-bold text-green-400">{userDevices.filter(d => d.status === 'online').length}</p>
        </div>
        <div className={`rounded-xl border p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Offline</p>
          <p className="text-3xl font-bold text-red-500">{userDevices.filter(d => d.status === 'offline').length}</p>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userDevices.map((device) => {
          const daysSinceOnline = Math.floor((Date.now() - device.lastOnline.getTime()) / (1000 * 60 * 60 * 24));
          const isLongOffline = device.status === 'offline' && daysSinceOnline > 3;
          
          return (
            <div
              key={device.id}
              onClick={() => setSelectedDevice(selectedDevice?.id === device.id ? null : device)}
              className={`rounded-xl border p-6 cursor-pointer transition-all ${
                isDark ? 'bg-slate-800 border-slate-700 hover:border-brand-primary hover:shadow-lg' : 'bg-white border-slate-200 hover:border-brand-primary hover:shadow-lg'
              } ${isLongOffline ? (isDark ? 'border-red-600/50' : 'border-red-300') : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{device.name}</h3>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>{device.model}</p>
                </div>
                <div className={`px-3 py-1 rounded border text-xs font-bold flex items-center gap-1 ${
                  device.status === 'online' 
                    ? (isDark ? 'bg-green-900/30 border-green-600 text-green-400' : 'bg-green-50 border-green-400 text-green-600')
                    : (isDark ? 'bg-red-900/30 border-red-600 text-red-400' : 'bg-red-50 border-red-400 text-red-600')
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                  {device.status === 'online' ? 'Online' : 'Offline'}
                </div>
              </div>

              {/* Long Offline Warning */}
              {isLongOffline && (
                <div className={`mb-4 p-2 rounded flex items-start gap-2 text-xs ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
                  <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-red-300' : 'text-red-800'}`}>Seit {daysSinceOnline} Tagen offline</p>
                    <p className={isDark ? 'text-red-200' : 'text-red-700'}>Service anfordern um Gerät zurück zu erhalten</p>
                  </div>
                </div>
              )}

              <div className={`space-y-3 mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-brand-primary flex-shrink-0" />
                  <span>{device.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Thermometer className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>{device.temperature}°C</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-brand-primary flex-shrink-0" />
                  <span>{device.power}W</span>
                </div>
                {user?.role === 'admin' && (
                  <div className="flex items-center gap-2 text-sm pt-2 border-t border-slate-600">
                    <Activity className="w-4 h-4 text-brand-accent flex-shrink-0" />
                    <span>Owner: {device.owner}</span>
                  </div>
                )}
              </div>

              {/* Expanded Details */}
              {selectedDevice?.id === device.id && (
                <div className={`pt-4 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'} animate-slide-in-down`}>
                  <div className={`space-y-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className="flex justify-between">
                      <span>Device ID:</span>
                      <span className="text-brand-primary font-mono">{device.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="text-brand-primary">{device.uptime}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Ping:</span>
                      <span className="text-brand-primary">{device.status === 'online' ? '2ms' : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AI Prozesse:</span>
                      <span className="text-brand-primary">{device.status === 'online' ? '4' : '0'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Map-like view */}
      <div className={`rounded-xl border p-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <h3 className={`text-xl font-bold mb-6 flex items-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <MapPin className="w-5 h-5 mr-2 text-brand-primary" />
          Geographische Verteilung
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from(new Set(userDevices.map(d => d.location))).map((location) => {
            const locationDevices = userDevices.filter(d => d.location === location);
            const onlineCount = locationDevices.filter(d => d.status === 'online').length;
            return (
              <div key={location} className={`p-4 rounded border transition-all ${isDark ? 'border-slate-600 hover:border-brand-primary' : 'border-slate-300 hover:border-brand-primary'}`}>
                <h4 className="font-bold text-brand-primary mb-2">{location}</h4>
                <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{locationDevices.length} Geräte • {onlineCount} online</p>
                <div className="flex gap-2 flex-wrap">
                  {locationDevices.map((device) => (
                    <div
                      key={device.id}
                      className={`w-3 h-3 rounded-full transition-all ${device.status === 'online' ? 'bg-green-400' : 'bg-red-500'}`}
                      title={device.name}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeviceOverview;
