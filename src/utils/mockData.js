// Fake login credentials
export const USERS = {
  'admin': { password: 'admin123', role: 'admin', name: 'Admin User' },
  'user': { password: 'user123', role: 'user', name: 'Regular User' },
  'demo': { password: 'demo123', role: 'user', name: 'Demo User' },
};

// Simulated devices/heating units
export const DEVICES = [
  { id: 'dev-001', name: 'Heizung München 01', location: 'München', status: 'online', temperature: 68, power: 2400, model: 'Raspberry Pi 4B' },
  { id: 'dev-002', name: 'Heizung Berlin 02', location: 'Berlin', status: 'online', temperature: 64, power: 2200, model: 'Raspberry Pi 4B' },
  { id: 'dev-003', name: 'Heizung Hamburg 03', location: 'Hamburg', status: 'online', temperature: 71, power: 2600, model: 'Raspberry Pi 5' },
  { id: 'dev-004', name: 'Heizung Köln 04', location: 'Köln', status: 'offline', temperature: 42, power: 0, model: 'Raspberry Pi 4B' },
  { id: 'dev-005', name: 'Heizung Frankfurt 05', location: 'Frankfurt', status: 'online', temperature: 69, power: 2500, model: 'Raspberry Pi 4B' },
  { id: 'dev-006', name: 'Heizung Stuttgart 06', location: 'Stuttgart', status: 'online', temperature: 70, power: 2450, model: 'Raspberry Pi 5' },
];

// Team members
export const TEAM = [
  { id: 1, name: 'Gustav Manfred', role: 'CEO & Founder', avatar: '👨‍💻' },
  { id: 2, name: 'Anna Schmidt', role: 'CTO', avatar: '👩‍💻' },
  { id: 3, name: 'Marc Weber', role: 'Head of Hardware', avatar: '👨‍🔧' },
  { id: 4, name: 'Lisa Meyer', role: 'Lead Developer', avatar: '👩‍💼' },
];

// Generate random data for simulations
export const generateChartData = (days = 30) => {
  return Array.from({ length: days }, (_, i) => ({
    day: `Day ${i + 1}`,
    requests: Math.floor(Math.random() * 5000) + 1000,
    power: Math.floor(Math.random() * 3000) + 1500,
    temperature: Math.floor(Math.random() * 15) + 55,
  }));
};

// Real-time simulation updates
export const simulateRealTimeData = () => {
  return {
    aiRequests: Math.floor(Math.random() * 500) + 100,
    totalPower: Math.floor(Math.random() * 15000) + 10000,
    avgTemperature: Math.floor(Math.random() * 20) + 60,
    onlineDevices: 5,
    totalDevices: 6,
    networkLoad: Math.floor(Math.random() * 100),
  };
};

export const generateDeviceStats = () => {
  return {
    avgTemperature: 68,
    totalPower: 13250,
    uptime: 99.7,
    efficiency: 94.2,
  };
};
