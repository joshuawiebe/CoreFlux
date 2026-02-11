/**
 * Heating System AI Integration
 * Connects with OpenRouter models to provide heating optimization recommendations
 */

const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY || '';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const heatingAIModels = [
  {
    id: 'openai/gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    capabilities: ['temperature-optimization', 'energy-analysis', 'predictive-maintenance'],
  },
  {
    id: 'anthropic/claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    capabilities: ['temperature-optimization', 'energy-analysis', 'predictive-maintenance'],
  },
  {
    id: 'meta-llama/llama-2-70b-chat',
    name: 'Llama 2 70B',
    provider: 'Meta',
    capabilities: ['temperature-optimization', 'energy-analysis'],
  },
];

/**
 * Generate heating optimization recommendations
 */
export const getHeatingOptimization = async (heatingData, apiKey = OPENROUTER_API_KEY) => {
  if (!apiKey) {
    return {
      success: false,
      error: 'OpenRouter API key not configured',
      recommendations: getLocalOptimizationRecommendations(heatingData),
    };
  }

  try {
    const prompt = `You are an expert in heating systems and energy optimization. 
Analyze the following heating system data and provide specific, actionable recommendations for optimization:

Current System Data:
- Current Temperature: ${heatingData.currentTemp}°C
- Target Temperature: ${heatingData.targetTemp}°C
- System Efficiency: ${heatingData.efficiency}%
- Daily Usage: ${heatingData.dailyUsage} hours
- System Age: ${heatingData.systemAge} years
- Fuel Type: ${heatingData.fuelType}
- Last Maintenance: ${heatingData.lastMaintenance}

Please provide:
1. Immediate optimization steps (can be done today)
2. Weekly optimization strategies
3. Maintenance recommendations
4. Estimated energy savings (percentage)
5. Temperature settings optimization
6. Potential cost reduction

Format as JSON with these keys: immediateSteps, weeklyStrategies, maintenance, energySavingsPercent, temperatureSettings, costReduction`;

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.href,
        'X-Title': 'CoreFlux',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    try {
      const jsonContent = content.match(/\{[\s\S]*\}/)[0];
      const recommendations = JSON.parse(jsonContent);
      return { success: true, recommendations };
    } catch (parseError) {
      return { success: true, recommendations: { rawContent: content } };
    }
  } catch (error) {
    console.error('AI Optimization Error:', error);
    return {
      success: false,
      error: error.message,
      recommendations: getLocalOptimizationRecommendations(heatingData),
    };
  }
};

/**
 * Local fallback optimization recommendations
 */
export const getLocalOptimizationRecommendations = (heatingData) => {
  const recommendations = {
    immediateSteps: [
      'Clean or replace HVAC filters',
      `Set thermostat to ${heatingData.targetTemp || 20}°C`,
      'Ensure all vents are unobstructed',
      'Check weatherstripping on doors and windows',
    ],
    weeklyStrategies: [
      'Program thermostat for scheduled temperature adjustments',
      'Maintain consistent 20-22°C during occupied hours',
      'Lower to 16-18°C during unoccupied times',
      'Monitor energy consumption weekly',
    ],
    maintenance: [
      `Schedule professional inspection every 6 months (last: ${heatingData.lastMaintenance})`,
      `System is ${heatingData.systemAge} years old - consider maintenance plan`,
      'Bleed radiators annually',
      'Check heat pump efficiency',
    ],
    energySavingsPercent: heatingData.efficiency < 80 ? 20 : 10,
    temperatureSettings: {
      occupied: heatingData.targetTemp || 21,
      unoccupied: (heatingData.targetTemp || 21) - 4,
      sleeping: (heatingData.targetTemp || 21) - 3,
      minimum: 16,
    },
    costReduction: `Potential €40-€120 monthly savings with systematic optimization`,
  };

  return recommendations;
};

/**
 * Predict heating needs based on weather and usage patterns
 */
export const predictHeatingNeeds = async (weatherData, usageHistory) => {
  // Simple local prediction model
  const outsideTemp = weatherData.temperature || 5;
  const humidity = weatherData.humidity || 60;
  
  // Base calculation
  const tempDifference = 20 - outsideTemp;
  const humidityFactor = humidity > 80 ? 1.2 : humidity < 40 ? 1.1 : 1;
  
  const predictedLoad = Math.max(0, tempDifference * humidityFactor);
  const estimatedHours = Math.min(24, predictedLoad * 1.5);
  const estimatedCost = estimatedHours * (usageHistory.averageCostPerHour || 0.5);

  return {
    predictedLoad: Math.round(predictedLoad * 100) / 100,
    estimatedHeatingHours: Math.round(estimatedHours * 10) / 10,
    estimatedDailyCost: Math.round(estimatedCost * 100) / 100,
    recommendation: estimatedHours > 18 ? 'High heating demand - consider insulation improvements' : 'Normal heating demand',
  };
};

/**
 * Get temperature adjustment recommendations based on time of day and occupancy
 */
export const getTemperatureSchedule = (preferences = {}) => {
  return {
    morning: { time: '06:00', target: preferences.morning || 21, description: 'Wake-up' },
    daytime: { time: '09:00', target: preferences.daytime || 20, description: 'Occupied' },
    evening: { time: '18:00', target: preferences.evening || 22, description: 'Comfort' },
    night: { time: '23:00', target: preferences.night || 18, description: 'Sleep mode' },
    offPeak: { time: '14:00', target: preferences.offPeak || 18, description: 'Unoccupied' },
  };
};

/**
 * Calculate energy efficiency rating
 */
export const calculateEfficiencyRating = (systemData) => {
  let score = 100;

  // Deductions based on various factors
  if (systemData.efficiency < 85) score -= (85 - systemData.efficiency) * 0.5;
  if (systemData.systemAge > 15) score -= (systemData.systemAge - 15) * 2;
  if (systemData.lastMaintenance) {
    const daysSinceMaintenance = Math.floor((Date.now() - new Date(systemData.lastMaintenance)) / (1000 * 60 * 60 * 24));
    if (daysSinceMaintenance > 365) score -= Math.min(20, (daysSinceMaintenance - 365) / 30);
  }

  score = Math.max(0, Math.min(100, score));

  let rating = 'Excellent';
  if (score < 60) rating = 'Poor';
  else if (score < 70) rating = 'Fair';
  else if (score < 80) rating = 'Good';
  else if (score < 90) rating = 'Very Good';

  return { score: Math.round(score), rating };
};

/**
 * Detect potential heating issues
 */
export const detectHeatingIssues = (systemData, usagePattern) => {
  const issues = [];

  if (systemData.efficiency < 70) {
    issues.push({
      severity: 'high',
      type: 'efficiency',
      message: 'System efficiency is critically low',
      action: 'Schedule emergency maintenance',
    });
  }

  if (systemData.systemAge > 20) {
    issues.push({
      severity: 'medium',
      type: 'age',
      message: 'System is approaching end of life',
      action: 'Plan for system replacement within 2 years',
    });
  }

  if (!systemData.lastMaintenance || Date.now() - new Date(systemData.lastMaintenance) > 365 * 24 * 60 * 60 * 1000) {
    issues.push({
      severity: 'medium',
      type: 'maintenance',
      message: 'Overdue for professional maintenance',
      action: 'Schedule maintenance appointment',
    });
  }

  if (usagePattern?.anomalyDetected) {
    issues.push({
      severity: 'low',
      type: 'usage',
      message: 'Unusual heating pattern detected',
      action: 'Verify system operation',
    });
  }

  return issues;
};

export default {
  getHeatingOptimization,
  getLocalOptimizationRecommendations,
  predictHeatingNeeds,
  getTemperatureSchedule,
  calculateEfficiencyRating,
  detectHeatingIssues,
  heatingAIModels,
};
