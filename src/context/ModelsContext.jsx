import React, { createContext, useContext, useState, useEffect } from 'react';

// Model Management Context
const ModelsContext = createContext();

export const ModelsProvider = ({ children }) => {
  const [defaultModels, setDefaultModels] = useState([
    // 🚀 Latest & Greatest Free Models
    { id: 'openai/gpt-oss-120b:free', name: 'GPT-OSS 120B', provider: 'OpenAI', free: true, description: 'Cutting-edge open source GPT model' },
    { id: 'qwen/qwen3-coder:free', name: 'Qwen 3 Coder', provider: 'Alibaba Qwen', free: true, description: 'Specialized for coding tasks' },
    { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B', provider: 'Meta', free: true, description: 'Latest, most powerful Llama' },
    { id: 'qwen/qwen3-next-80b-a3b-instruct:free', name: 'Qwen 3 Next 80B', provider: 'Alibaba Qwen', free: true, description: 'Advanced instruction-tuned model' },
    { id: 'google/gemma-3-27b-it:free', name: 'Gemma 3 27B', provider: 'Google', free: true, description: 'Google\'s efficient instruction model' },
    { id: 'mistralai/mistral-small-3.1-24b-instruct:free', name: 'Mistral Small 3.1', provider: 'Mistral', free: true, description: 'Lightweight but powerful' },
    
    // Classic Models (keep for familiarity)
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', free: true, description: 'Fast and reliable' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', free: true, description: 'Balanced and capable' },
  ]);

  const [customModels, setCustomModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('custom_models');
    if (saved) {
      try {
        setCustomModels(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to load custom models:', err);
      }
    }
    
    const savedModel = localStorage.getItem('selected_model');
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  const allModels = [...defaultModels, ...customModels];

  const addCustomModel = (model) => {
    const newModel = {
      id: model.id,
      name: model.name,
      provider: model.provider || 'Custom',
      free: model.free !== false,
      description: model.description || 'Custom model from OpenRouter',
    };
    const updated = [...customModels, newModel];
    setCustomModels(updated);
    localStorage.setItem('custom_models', JSON.stringify(updated));
    return newModel;
  };

  const removeCustomModel = (modelId) => {
    const updated = customModels.filter((m) => m.id !== modelId);
    setCustomModels(updated);
    localStorage.setItem('custom_models', JSON.stringify(updated));
    if (selectedModel === modelId) {
      setSelectedModel('gpt-3.5-turbo');
      localStorage.setItem('selected_model', 'gpt-3.5-turbo');
    }
  };

  const updateSelectedModel = (modelId) => {
    setSelectedModel(modelId);
    localStorage.setItem('selected_model', modelId);
  };

  const value = {
    defaultModels,
    customModels,
    allModels,
    selectedModel,
    addCustomModel,
    removeCustomModel,
    updateSelectedModel,
  };

  return (
    <ModelsContext.Provider value={value}>
      {children}
    </ModelsContext.Provider>
  );
};

export const useModels = () => {
  const context = useContext(ModelsContext);
  if (!context) {
    throw new Error('useModels must be used within ModelsProvider');
  }
  return context;
};
