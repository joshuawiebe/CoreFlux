import React, { useState } from 'react';
import { CreditCard, Check, Shield, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    country: '',
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Simulate order completion
      setOrderComplete(true);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-md w-full animate-slide-in-up">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold dark:text-white text-slate-900 mb-2">
              Vertrag erfolgreich abgeschlossen!
            </h1>
            <p className="dark:text-slate-400 text-slate-600 mb-8">
              Herzlichen Glückwunsch! Dein Abonnement ist jetzt aktiv. Eine Bestätigung wurde an deine E-Mail gesendet.
            </p>
            <Link
              to="/dashboard"
              className="inline-block px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Zum Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link to="/pricing" className="flex items-center gap-2 text-brand-primary mb-8 hover:gap-3 transition-all">
          <ArrowLeft className="w-5 h-5" />
          Zurück zu Preisen
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="dark:bg-slate-900/50 dark:border-slate-800 bg-white border-slate-200 border rounded-2xl p-8">
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-12">
                <div
                  className={`flex-1 h-2 rounded-full transition-all ${
                    step >= 1 ? 'bg-brand-primary' : 'dark:bg-slate-700 bg-slate-300'
                  }`}
                ></div>
                <div className="px-4 text-center">
                  <p className="text-sm font-semibold dark:text-slate-400 text-slate-600">
                    Schritt {step} von 2
                  </p>
                </div>
                <div
                  className={`flex-1 h-2 rounded-full transition-all ${
                    step >= 2 ? 'bg-brand-primary' : 'dark:bg-slate-700 bg-slate-300'
                  }`}
                ></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                  <>
                    <h2 className="text-2xl font-bold dark:text-white text-slate-900">
                      Persönliche Daten
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="E-Mail Adresse"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Vorname"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Nachname"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                      <input
                        type="text"
                        name="company"
                        placeholder="Unternehmen (optional)"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>

                    <input
                      type="text"
                      name="country"
                      placeholder="Land"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />

                    {/* Terms */}
                    <div className="flex items-start gap-3 p-4 dark:bg-slate-800/50 dark:border-slate-700 bg-slate-50 border-slate-200 border rounded-lg">
                      <input type="checkbox" required className="mt-1" />
                      <label className="text-sm dark:text-slate-400 text-slate-600">
                        Ich akzeptiere die Nutzungsbedingungen und Datenschutzrichtlinie
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-6">
                      Zahlungsinformationen
                    </h2>

                    <input
                      type="text"
                      name="cardHolder"
                      placeholder="Name des Karteninhabers"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />

                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3.5 w-5 h-5 dark:text-slate-500 text-slate-400" />
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                          const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                          setFormData(prev => ({
                            ...prev,
                            cardNumber: formatted
                          }));
                        }}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-5 h-5 dark:text-slate-500 text-slate-400" />
                        <input
                          type="password"
                          name="cvc"
                          placeholder="CVC"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-100 border-slate-300 border focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-4 dark:bg-green-900/20 dark:border-green-800 bg-green-50 border-green-300 border rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-700 dark:text-green-300">
                        ✓ Sichere Zahlungsabwicklung mit 256-Bit Verschlüsselung
                      </span>
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-6">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-3 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
                    >
                      Zurück
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    {step === 1 ? 'Weiter zur Zahlung' : 'Vertrag abschließen'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="dark:bg-slate-900/50 dark:border-slate-800 bg-slate-50 border-slate-200 border rounded-2xl p-8 sticky top-24 h-fit">
              <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-6">
                Bestellübersicht
              </h3>

              <div className="space-y-4 pb-6 border-b dark:border-slate-700 border-slate-200">
                <div className="flex justify-between">
                  <span className="dark:text-slate-400 text-slate-600">Plan: Professional</span>
                  <span className="font-semibold dark:text-white text-slate-900">€79/Monat</span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-slate-400 text-slate-600">Laufzeit: 1 Monat</span>
                  <span className="font-semibold dark:text-white text-slate-900">€79</span>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold dark:text-white text-slate-900">Gesamtbetrag</span>
                  <span className="text-2xl font-bold text-brand-primary">€79</span>
                </div>
                <p className="text-xs dark:text-slate-500 text-slate-600">
                  Automatische Verlängerung. Jederzeit kündbar.
                </p>
              </div>

              {/* Features */}
              <div className="mt-8 pt-8 border-t dark:border-slate-700 border-slate-200 space-y-3">
                <h4 className="font-semibold dark:text-white text-slate-900 mb-4">
                  Du erhältst:
                </h4>
                {[
                  'Bis zu 50 Geräte',
                  'AI-Optimierung',
                  '24/7 Support',
                  'API-Zugriff',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-primary" />
                    <span className="text-sm dark:text-slate-400 text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
