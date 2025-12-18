import React, { useState } from 'react';
import { DEVICES } from '../utils/mockData';
import { MapPin, Wifi, Thermometer, Zap, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const DeviceOverview = () => {
  const { isDark } = useTheme();
  const [selectedDevice, setSelectedDevice] = useState(null);

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
        <p className="text-gray-400">Verwalte dein verteiltes Heiznetzwerk</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
          <p className="text-gray-400 text-sm mb-2">Gesamte Geräte</p>
          <p className="text-3xl font-bold text-brand-primary">{DEVICES.length}</p>
        </div>
        <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
          <p className="text-gray-400 text-sm mb-2">Online</p>
          <p className="text-3xl font-bold text-green-400">{DEVICES.filter(d => d.status === 'online').length}</p>
        </div>
        <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
          <p className="text-gray-400 text-sm mb-2">Offline</p>
          <p className="text-3xl font-bold text-red-500">{DEVICES.filter(d => d.status === 'offline').length}</p>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEVICES.map((device) => (
          <div
            key={device.id}
            onClick={() => setSelectedDevice(selectedDevice?.id === device.id ? null : device)}
            className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6 cursor-pointer hover:scale-105 transform"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-brand-primary">{device.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{device.model}</p>
              </div>
              <div className={`px-3 py-1 rounded border text-xs font-bold ${getStatusBgColor(device.status)} ${getStatusColor(device.status)}`}>
                {device.status === 'online' ? '● Online' : '● Offline'}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-brand-accent" />
                <span>{device.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Thermometer className="w-4 h-4 text-green-400" />
                <span>{device.temperature}°C</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Zap className="w-4 h-4 text-brand-primary" />
                <span>{device.power}W</span>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedDevice?.id === device.id && (
              <div className="pt-4 border-t border-gray-600 animate-slide-in-down">
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Device ID:</span>
                    <span className="text-brand-primary font-mono">{device.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="text-brand-primary">99.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Ping:</span>
                    <span className="text-brand-primary">2ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Prozesse:</span>
                    <span className="text-brand-primary">4</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Map-like view */}
      <div className="rounded-2xl backdrop-blur-sm border dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 p-6">
        <h3 className="text-xl font-bold text-brand-primary mb-6 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Geographische Verteilung
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from(new Set(DEVICES.map(d => d.location))).map((location) => {
            const locationDevices = DEVICES.filter(d => d.location === location);
            const onlineCount = locationDevices.filter(d => d.status === 'online').length;
            return (
              <div key={location} className="p-4 rounded border border-brand-primary border-opacity-30 hover:border-opacity-100 transition-all">
                <h4 className="font-bold text-brand-primary mb-2">{location}</h4>
                <p className="text-sm text-gray-400 mb-2">{locationDevices.length} Geräte</p>
                <div className="flex gap-2">
                  {locationDevices.map((device) => (
                    <div
                      key={device.id}
                      className={`w-3 h-3 rounded-full ${device.status === 'online' ? 'bg-green-400' : 'bg-red-500'}`}
                      title={device.name}
                    ></div>
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
