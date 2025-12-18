import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, Zap, Flame, TrendingUp, Check, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Heizungen = () => {
  const { isDark } = useTheme();
  const [cart, setCart] = useState([]);

  const heizungen = [
    {
      id: 1,
      name: 'CoreFlux Starter Heizung',
      price: 299,
      description: 'Perfekt zum Einstieg',
      power: '5-10 kW',
      efficiency: '95%',
      aiDiscount: '10%',
      features: ['5-10 kW Leistung', 'Basic AI Optimierung', '5% AI-Rabatt', 'App-Steuerung', '2 Jahre Garantie'],
    },
    {
      id: 2,
      name: 'CoreFlux Pro Heizung',
      price: 599,
      description: 'Für Profis',
      power: '10-20 kW',
      efficiency: '97%',
      aiDiscount: '25%',
      features: ['10-20 kW Leistung', 'Advanced AI Optimierung', '25% AI-Rabatt', 'Premium Support', '5 Jahre Garantie', 'Smart Scheduling'],
      popular: true,
    },
    {
      id: 3,
      name: 'CoreFlux Enterprise Heizung',
      price: 1299,
      description: 'Für große Systeme',
      power: '20-50 kW',
      efficiency: '99%',
      aiDiscount: '50%',
      features: ['20-50 kW Leistung', 'Enterprise AI Suite', '50% AI-Rabatt', 'Dedicated Support', 'Lifetime Warranty', 'White Label Option', 'API Integration'],
    },
  ];

  const addToCart = (heizung) => {
    const existing = cart.find(item => item.id === heizung.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === heizung.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...heizung, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalAISavings = cart.reduce((sum, item) => {
    const aiDiscount = parseInt(item.aiDiscount);
    return sum + ((item.price * aiDiscount / 100) * item.quantity);
  }, 0);

  return (
    <div className={`min-h-screen py-20 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-white to-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <span className="text-brand-primary">Heizungen</span> - Günstig & Smart
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Kaufe eine intelligente Heizung und erhalte bis zu 50% Rabatt auf unsere KI-Services. Win-Win! 🔥
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {heizungen.map((heizung, idx) => (
            <div
              key={heizung.id}
              className={`relative group animate-slide-in-up rounded-2xl backdrop-blur-sm border overflow-hidden transition-all ${
                heizung.popular ? 'lg:scale-105 ring-2 ring-brand-primary' : ''
              } ${
                isDark
                  ? 'dark:bg-slate-900/50 dark:border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {heizung.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2 font-bold rounded-bl-lg">
                  ⭐ POPULAR
                </div>
              )}

              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {heizung.name}
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {heizung.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-brand-primary mb-2">€{heizung.price}</div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    + {heizung.aiDiscount} AI-Rabatt ab heute
                  </p>
                </div>

                {/* Specs */}
                <div className={`grid grid-cols-2 gap-4 mb-6 p-3 rounded-lg ${
                  isDark
                    ? 'dark:bg-slate-800'
                    : 'bg-slate-100'
                }`}>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Leistung</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{heizung.power}</div>
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Effizienz</div>
                    <div className={`font-bold text-green-400`}>{heizung.efficiency}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {heizung.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-primary flex-shrink-0" />
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(heizung)}
                  className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                    heizung.popular
                      ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg'
                      : isDark
                      ? 'dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
                      : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  In den Warenkorb
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        {cart.length > 0 && (
          <div className={`rounded-2xl backdrop-blur-sm border p-8 animate-slide-in-up ${
            isDark
              ? 'dark:bg-slate-900/50 dark:border-slate-800'
              : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              🛒 Warenkorb ({cart.length})
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    isDark
                      ? 'dark:bg-slate-800 dark:border-slate-700'
                      : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <div>
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>€{item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={`p-1 rounded ${isDark ? 'dark:bg-slate-700 dark:hover:bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={`p-1 rounded ${isDark ? 'dark:bg-slate-700 dark:hover:bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className={`font-bold ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>
                      €{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 font-bold"
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className={`border-t pt-6 ${isDark ? 'dark:border-slate-700' : 'border-slate-200'}`}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Gesamtbetrag</p>
                  <p className="text-2xl font-bold text-brand-primary">€{totalPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>AI-Rabatte (monatlich)</p>
                  <p className="text-2xl font-bold text-green-400">-€{totalAISavings.toFixed(2)}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Ersparnis/Jahr</p>
                  <p className="text-2xl font-bold text-green-500">-€{(totalAISavings * 12).toFixed(0)}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  to="/checkout"
                  className="flex-1 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg font-bold hover:shadow-lg transition-all text-center"
                >
                  Zur Kasse (€{totalPrice.toFixed(2)})
                </Link>
                <button
                  onClick={() => setCart([])}
                  className={`px-8 py-4 rounded-lg font-bold border-2 ${
                    isDark
                      ? 'dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                      : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Leeren
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8`}>
          {[
            {
              icon: '🔥',
              title: 'Perfekt gekoppelt',
              desc: 'Heizung + KI zusammen = 50% Einsparungen',
            },
            {
              icon: '💰',
              title: 'Jetzt sparen',
              desc: 'Je mehr du heizt, desto mehr KI-Rabatt',
            },
            {
              icon: '🌍',
              title: 'Nachhaltig',
              desc: 'Weniger Heizen, weniger Strom, weniger CO2',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl backdrop-blur-sm border p-8 text-center ${
                isDark
                  ? 'dark:bg-slate-900/50 dark:border-slate-800'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Heizungen;
