// Fake login credentials - Demo + Admin only
export const USERS = {
  'admin': { password: 'admin123', role: 'admin', name: 'Admin User', location: 'System' },
  'demo': { password: 'demo123', role: 'user', name: 'Demo User', location: 'Hamburg' },
};

// Simulated devices/heating units with owner info
export const DEVICES = [
  { id: 'dev-001', name: 'Heizung München 01', location: 'München', owner: 'adam_weber', status: 'online', temperature: 68, power: 2400, model: 'Raspberry Pi 4B', lastOnline: new Date(), uptime: 99.8 },
  { id: 'dev-002', name: 'Heizung Berlin 02', location: 'Berlin', owner: 'sarah_mueller', status: 'online', temperature: 64, power: 2200, model: 'Raspberry Pi 4B', lastOnline: new Date(), uptime: 99.5 },
  { id: 'dev-003', name: 'Heizung Hamburg 03', location: 'Hamburg', owner: 'demo', status: 'online', temperature: 71, power: 2600, model: 'Raspberry Pi 5', lastOnline: new Date(), uptime: 100 },
  { id: 'dev-004', name: 'Heizung Köln 04', location: 'Köln', owner: 'thomas_schmidt', status: 'offline', temperature: 42, power: 0, model: 'Raspberry Pi 4B', lastOnline: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), uptime: 0 },
  { id: 'dev-005', name: 'Heizung Frankfurt 05', location: 'Frankfurt', owner: 'julia_koch', status: 'online', temperature: 69, power: 2500, model: 'Raspberry Pi 4B', lastOnline: new Date(), uptime: 99.7 },
  { id: 'dev-006', name: 'Heizung Stuttgart 06', location: 'Stuttgart', owner: 'max_weber', status: 'online', temperature: 70, power: 2450, model: 'Raspberry Pi 5', lastOnline: new Date(), uptime: 99.9 },
  { id: 'dev-007', name: 'Heizung Dresden 07', location: 'Dresden', owner: 'anna_fischer', status: 'offline', temperature: 35, power: 0, model: 'Raspberry Pi 4B', lastOnline: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), uptime: 0 },
  { id: 'dev-008', name: 'Heizung Hannover 08', location: 'Hannover', owner: 'peter_bauer', status: 'online', temperature: 67, power: 2380, model: 'Raspberry Pi 5', lastOnline: new Date(), uptime: 99.4 },
];

// Team members - From CoreFlux Concept
export const TEAM = [
  { id: 1, name: 'Joshua Wiebe', role: 'CEO & Founder', avatar: '👨‍💻' },
  { id: 2, name: 'Ferris Thiel', role: 'Co-Founder & Assembly Technician', avatar: '👨‍🔧' },
  { id: 3, name: 'Anna Schmidt', role: 'CTO', avatar: '👩‍💻' },
  { id: 4, name: 'Marc Weber', role: 'Head of Hardware', avatar: '👨‍💼' },
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
