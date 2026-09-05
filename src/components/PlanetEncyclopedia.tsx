import React, { useState } from 'react';
import { PLANETS, PlanetData } from '../data/spaceData';
import { Thermometer, Orbit, Weight, Compass, Sun, Moon, Info, ArrowRight } from 'lucide-react';

interface PlanetEncyclopediaProps {
  onSelectForComparison?: (planetId: string) => void;
}

export const PlanetEncyclopedia: React.FC<PlanetEncyclopediaProps> = ({ onSelectForComparison }) => {
  const planetKeys = Object.keys(PLANETS);
  const [activeKey, setActiveKey] = useState<string>('earth');

  const planet: PlanetData = PLANETS[activeKey];

  return (
    <section id="sayyoralar" className="py-24 bg-[#051329] text-white relative">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
            Quyosh Tizimi Ensiklopediyasi
          </div>
          <h2
            className="text-4xl sm:text-5xl font-normal text-white tracking-wide"
            style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
          >
            Sayyoralarni Batafsil O'rganing
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Quyosh tizimidagi 8 ta asosiy sayyoraning astrofizik o'lchamlari, atmosfera xususiyatlari va hayratlanarli sirlari bilan tanishing.
          </p>
        </div>

        {/* Planet Tabs Selector */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {planetKeys.map((key) => {
            const p = PLANETS[key];
            const isActive = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-white/30'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <span>{p.uzbekName}</span>
              </button>
            );
          })}
        </div>

        {/* Main Detailed Card */}
        <div className="bg-[#091b38]/80 border border-cyan-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Glowing halo behind planet */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-40 transition-all duration-500"
                  style={{ backgroundColor: planet.color }}
                />
                <img
                  src={planet.image}
                  alt={planet.uzbekName}
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] animate-float"
                />
              </div>

              <div className="mt-6">
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                  {planet.type}
                </span>
                <h3
                  className="text-3xl sm:text-4xl font-normal text-white mt-1"
                  style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
                >
                  {planet.uzbekName}
                </h3>
                <p className="text-sm text-slate-400 mt-1 max-w-sm">
                  {planet.tagline}
                </p>
              </div>

              {onSelectForComparison && (
                <button
                  onClick={() => onSelectForComparison(planet.id)}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <span>Taqqoslash paneliga joylash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Metrics & Details Column */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                {planet.description}
              </p>

              {/* 6 Key Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium mb-1">
                    <Compass className="w-4 h-4" />
                    <span>Diametri</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {planet.diameterKm.toLocaleString()} km
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Yerga nisbatan: {(planet.diameterKm / 12742).toFixed(2)}x
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium mb-1">
                    <Sun className="w-4 h-4" />
                    <span>Quyoshdan masofa</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {planet.distanceFromSunAU} AU
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {(planet.distanceFromSunKm / 1e6).toFixed(1)} mln km
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium mb-1">
                    <Orbit className="w-4 h-4" />
                    <span>Bir yil (Davr)</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {planet.yearLengthDays >= 365
                      ? `${(planet.yearLengthDays / 365.25).toFixed(1)} Yer yili`
                      : `${planet.yearLengthDays} kun`}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Orbital aylanish
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium mb-1">
                    <Weight className="w-4 h-4" />
                    <span>Gravitatsiya</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {planet.gravityMps2} m/s²
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Yerning {(planet.gravityMps2 / 9.81 * 100).toFixed(0)}% qismi
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium mb-1">
                    <Thermometer className="w-4 h-4" />
                    <span>O'rtacha harorat</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {planet.avgTempC > 0 ? `+${planet.avgTempC}` : planet.avgTempC} °C
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {planet.minTempC}°C dan {planet.maxTempC}°C gacha
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium mb-1">
                    <Moon className="w-4 h-4" />
                    <span>Yo'ldoshlar</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {planet.moonsCount} ta
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Tabiiy yo'ldoshlar
                  </div>
                </div>
              </div>

              {/* Atmosphere Badges */}
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  Atmosfera tarkibi:
                </span>
                <div className="flex flex-wrap gap-2">
                  {planet.atmosphere.map((gas, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium"
                    >
                      {gas}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top 3 Facts */}
              <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-3">
                  <Info className="w-4 h-4" />
                  <span>Qiziqarli Ilmiy Faktlar:</span>
                </div>
                <ul className="space-y-2">
                  {planet.features.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
