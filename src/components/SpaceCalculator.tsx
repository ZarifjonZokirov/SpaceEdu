import React, { useState } from 'react';
import { PLANETS } from '../data/spaceData';
import { Compass, Weight, Calendar, Sparkles } from 'lucide-react';

export const SpaceCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weight' | 'age'>('weight');

  // Weight State
  const [earthWeight, setEarthWeight] = useState<number>(65);

  // Age State
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');

  // Celestial bodies gravity factor relative to Earth (1.0 = 9.81 m/s²)
  const celestialWeights = [
    { name: 'Merkuriy', factor: 0.38, comment: 'Yengil! Siz 2.6 barobar balandroqqa sakray olasiz.' },
    { name: 'Venera', factor: 0.91, comment: 'Deyarli Yerdagi kabi og\'irlik seziladi.' },
    { name: 'Oy', factor: 0.166, comment: 'Super yengillik! Xuddi astronavtlardek ohista parvoz qilasiz.' },
    { name: 'Mars', factor: 0.38, comment: 'Qulay harakat! Qadamlaringiz yengil va chaqqon bo\'ladi.' },
    { name: 'Yupiter', factor: 2.36, comment: 'Juda og\'ir! Qadamingiz qo\'rg\'oshindek tuyulardi.' },
    { name: 'Saturn', factor: 1.06, comment: 'Yerdan atigi 6% og\'irroq, garchi u ulkan gigant bo\'lsa ham.' },
    { name: 'Uran', factor: 0.89, comment: 'Yerdagidan 11% yengilroq.' },
    { name: 'Neptun', factor: 1.12, comment: 'Biroz og\'irroq, Yerdagidan 12% ko\'proq tortish kuchi.' },
  ];

  // Age calculation
  const calculateAges = () => {
    const birth = new Date(birthDate);
    const now = new Date();
    const diffMs = now.getTime() - birth.getTime();
    if (isNaN(diffMs) || diffMs <= 0) return [];

    const earthDays = diffMs / (1000 * 60 * 60 * 24);
    const earthYears = earthDays / 365.25;

    return [
      {
        name: 'Merkuriy',
        periodDays: 88,
        age: (earthDays / 88).toFixed(1),
        note: 'Yili atigi 88 kun!',
      },
      {
        name: 'Venera',
        periodDays: 224.7,
        age: (earthDays / 224.7).toFixed(1),
        note: 'Yili 225 Yer kuni',
      },
      {
        name: 'Yer',
        periodDays: 365.25,
        age: earthYears.toFixed(1),
        note: 'Standart taqvim yili',
      },
      {
        name: 'Mars',
        periodDays: 687,
        age: (earthDays / 687).toFixed(1),
        note: 'Yili salkam 2 Yer yiliga teng',
      },
      {
        name: 'Yupiter',
        periodDays: 4333,
        age: (earthYears / 11.86).toFixed(2),
        note: 'Bir yili 11.86 Yer yili',
      },
      {
        name: 'Saturn',
        periodDays: 10759,
        age: (earthYears / 29.45).toFixed(2),
        note: 'Bir yili 29.5 Yer yili',
      },
      {
        name: 'Uran',
        periodDays: 30687,
        age: (earthYears / 84).toFixed(2),
        note: 'Hali birinchi tug\'ilgan kuningizga ancha bor!',
      },
      {
        name: 'Neptun',
        periodDays: 60190,
        age: (earthYears / 165).toFixed(2),
        note: '165 Yer yilida 1 marta Quyoshni aylanadi',
      },
    ];
  };

  const calculatedAges = calculateAges();

  return (
    <section id="kalkulyator" className="py-24 bg-[#051329] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Koinot Kalkulyatori</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-normal text-white tracking-wide"
            style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
          >
            Koinotda Vazningiz va Yoshingiz
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Sayyoralarning massasi va orbital davri turlicha bo'lgani sababli, boshqa dunyolarda siz mutlaqo boshqacha vazn va yoshga ega bo'lasiz!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#091b38] p-1.5 rounded-2xl border border-cyan-500/30 flex gap-2">
            <button
              onClick={() => setActiveTab('weight')}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'weight'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Weight className="w-4 h-4" />
              <span>Koinotdagi Vaznim</span>
            </button>
            <button
              onClick={() => setActiveTab('age')}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'age'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Koinotdagi Yoshim</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Weight Calculator */}
        {activeTab === 'weight' && (
          <div className="space-y-10">
            {/* Input card */}
            <div className="max-w-xl mx-auto bg-[#091b38]/80 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-md">
              <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Yerdagi Vazningizni Kiriting (kg):
              </label>
              <div className="flex items-center justify-center gap-4">
                <input
                  type="number"
                  min={10}
                  max={300}
                  value={earthWeight}
                  onChange={(e) => setEarthWeight(Math.max(1, Number(e.target.value)))}
                  className="w-40 text-center text-3xl font-bold bg-white/10 border-2 border-cyan-400/50 rounded-2xl py-2 text-white focus:outline-none focus:border-cyan-400"
                />
                <span className="text-xl font-semibold text-cyan-300">kg</span>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Fizika qonuni: Vazn = Massa × Sirt tortishish tezlanishi (g).
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {celestialWeights.map((w, idx) => {
                const calculatedKg = (earthWeight * w.factor).toFixed(1);
                return (
                  <div
                    key={idx}
                    className="bg-[#091b38]/70 border border-white/10 rounded-2xl p-5 hover:border-cyan-400/40 hover:scale-[1.02] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                        <span>{w.name}</span>
                        <span className="text-cyan-400">g × {w.factor}</span>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">
                        {calculatedKg} <span className="text-base text-cyan-300 font-normal">kg</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 border-t border-white/10 pt-2.5 mt-2">
                      {w.comment}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Age Calculator */}
        {activeTab === 'age' && (
          <div className="space-y-10">
            {/* Input card */}
            <div className="max-w-xl mx-auto bg-[#091b38]/80 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-md">
              <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Tug'ilgan Sanangizni Tanlang:
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="text-center text-lg font-bold bg-white/10 border-2 border-cyan-400/50 rounded-2xl px-6 py-2.5 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              />
              <p className="text-xs text-slate-400 mt-3">
                Har bir sayyoraning bir yili — bu uning Quyosh atrofida to'liq bir marta aylanish vaqtidir.
              </p>
            </div>

            {/* Age Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {calculatedAges.map((a, idx) => (
                <div
                  key={idx}
                  className="bg-[#091b38]/70 border border-white/10 rounded-2xl p-5 hover:border-cyan-400/40 hover:scale-[1.02] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                      <span>{a.name}</span>
                      <span className="text-cyan-400">{a.periodDays} kun</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {a.age} <span className="text-base text-cyan-300 font-normal">yosh</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 border-t border-white/10 pt-2.5 mt-2">
                    {a.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
