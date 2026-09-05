import React, { useState } from 'react';
import { PLANETS, PlanetData } from '../data/spaceData';
import { Scale, ArrowLeftRight } from 'lucide-react';

interface PlanetComparisonProps {
  initialA?: string;
  initialB?: string;
}

export const PlanetComparison: React.FC<PlanetComparisonProps> = ({ initialA = 'earth', initialB = 'mars' }) => {
  const [planetAId, setPlanetAId] = useState<string>(initialA);
  const [planetBId, setPlanetBId] = useState<string>(initialB);

  const planetA: PlanetData = PLANETS[planetAId] || PLANETS.earth;
  const planetB: PlanetData = PLANETS[planetBId] || PLANETS.mars;

  // Swap planets
  const handleSwap = () => {
    const temp = planetAId;
    setPlanetAId(planetBId);
    setPlanetBId(temp);
  };

  // Calculate proportional visual radii (normalized to max diameter 139,820km of Jupiter)
  const maxDiameter = 139820;
  const radiusA = Math.max(16, Math.round((planetA.diameterKm / maxDiameter) * 110));
  const radiusB = Math.max(16, Math.round((planetB.diameterKm / maxDiameter) * 110));

  // Comparison metrics definition
  const metrics = [
    {
      label: 'Diametri',
      valA: `${planetA.diameterKm.toLocaleString()} km`,
      valB: `${planetB.diameterKm.toLocaleString()} km`,
      ratio: planetA.diameterKm / planetB.diameterKm,
      pctA: (planetA.diameterKm / (planetA.diameterKm + planetB.diameterKm)) * 100,
      pctB: (planetB.diameterKm / (planetA.diameterKm + planetB.diameterKm)) * 100,
    },
    {
      label: 'Sirt Gravitatsiyasi',
      valA: `${planetA.gravityMps2} m/s²`,
      valB: `${planetB.gravityMps2} m/s²`,
      ratio: planetA.gravityMps2 / planetB.gravityMps2,
      pctA: (planetA.gravityMps2 / (planetA.gravityMps2 + planetB.gravityMps2)) * 100,
      pctB: (planetB.gravityMps2 / (planetA.gravityMps2 + planetB.gravityMps2)) * 100,
    },
    {
      label: 'Quyoshdan Masofa',
      valA: `${planetA.distanceFromSunAU} AU`,
      valB: `${planetB.distanceFromSunAU} AU`,
      ratio: planetA.distanceFromSunAU / planetB.distanceFromSunAU,
      pctA: (planetA.distanceFromSunAU / (planetA.distanceFromSunAU + planetB.distanceFromSunAU)) * 100,
      pctB: (planetB.distanceFromSunAU / (planetA.distanceFromSunAU + planetB.distanceFromSunAU)) * 100,
    },
    {
      label: 'Yil Davomiyligi',
      valA: `${planetA.yearLengthDays} kun`,
      valB: `${planetB.yearLengthDays} kun`,
      ratio: planetA.yearLengthDays / planetB.yearLengthDays,
      pctA: (planetA.yearLengthDays / (planetA.yearLengthDays + planetB.yearLengthDays)) * 100,
      pctB: (planetB.yearLengthDays / (planetA.yearLengthDays + planetB.yearLengthDays)) * 100,
    },
    {
      label: 'O\'rtacha Harorat',
      valA: `${planetA.avgTempC}°C`,
      valB: `${planetB.avgTempC}°C`,
      ratio: null,
      pctA: 50,
      pctB: 50,
    },
    {
      label: 'Tabiiy Yo\'ldoshlar',
      valA: `${planetA.moonsCount} ta`,
      valB: `${planetB.moonsCount} ta`,
      ratio: null,
      pctA: (planetA.moonsCount / Math.max(1, planetA.moonsCount + planetB.moonsCount)) * 100,
      pctB: (planetB.moonsCount / Math.max(1, planetA.moonsCount + planetB.moonsCount)) * 100,
    }
  ];

  return (
    <section id="taqqoslash" className="py-24 bg-[#04101f] text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Interaktiv Taqqoslash</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-normal text-white tracking-wide"
            style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
          >
            Sayyoralarni Yonma-Yon Solishtiring
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Istalgan ikkita sayyorani tanlang va ularning haqiqiy nisbiy o'lchamlari, gravitatsiya kuchi hamda orbital xususiyatlarini solishtiring.
          </p>
        </div>

        {/* Planet Selectors Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
          {/* Planet A Selector */}
          <div className="flex items-center gap-3 bg-[#091b38] border border-cyan-500/30 rounded-2xl px-4 py-3 w-full sm:w-auto">
            <label className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">1-sayyora:</label>
            <select
              value={planetAId}
              onChange={(e) => setPlanetAId(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer pr-2"
            >
              {Object.keys(PLANETS).map((key) => (
                <option key={key} value={key} className="bg-[#07152b] text-white">
                  {PLANETS[key].uzbekName}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="p-3 rounded-full bg-white/10 hover:bg-cyan-500/20 text-cyan-300 border border-white/10 hover:border-cyan-400 transition-all hover:scale-110 active:scale-95 cursor-pointer"
            title="O'rin almashtirish"
            aria-label="Sayyoralarni almashtirish"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>

          {/* Planet B Selector */}
          <div className="flex items-center gap-3 bg-[#091b38] border border-cyan-500/30 rounded-2xl px-4 py-3 w-full sm:w-auto">
            <label className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">2-sayyora:</label>
            <select
              value={planetBId}
              onChange={(e) => setPlanetBId(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer pr-2"
            >
              {Object.keys(PLANETS).map((key) => (
                <option key={key} value={key} className="bg-[#07152b] text-white">
                  {PLANETS[key].uzbekName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Scale Comparison Stage */}
        <div className="bg-[#091b38]/70 border border-white/10 rounded-3xl p-6 sm:p-10 mb-10">
          <h3 className="text-center text-sm font-semibold tracking-wider text-slate-400 uppercase mb-8">
            Haqiqiy Nisbiy O'lcham Taqqoslanishi
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[260px]">
            {/* Planet A Visual */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="h-56 flex items-center justify-center">
                <div
                  className="rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative"
                  style={{
                    width: `${radiusA * 2}px`,
                    height: `${radiusA * 2}px`,
                    backgroundColor: planetA.color,
                    boxShadow: `0 0 35px ${planetA.color}40`,
                  }}
                >
                  <img
                    src={planetA.image}
                    alt={planetA.uzbekName}
                    className="w-full h-full object-contain rounded-full opacity-90"
                  />
                </div>
              </div>
              <span className="text-2xl font-semibold text-white mt-4">{planetA.uzbekName}</span>
              <span className="text-xs text-slate-400">Ø {planetA.diameterKm.toLocaleString()} km</span>
            </div>

            {/* Planet B Visual */}
            <div className="flex flex-col items-center justify-center p-4 border-t md:border-t-0 md:border-l border-white/10">
              <div className="h-56 flex items-center justify-center">
                <div
                  className="rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative"
                  style={{
                    width: `${radiusB * 2}px`,
                    height: `${radiusB * 2}px`,
                    backgroundColor: planetB.color,
                    boxShadow: `0 0 35px ${planetB.color}40`,
                  }}
                >
                  <img
                    src={planetB.image}
                    alt={planetB.uzbekName}
                    className="w-full h-full object-contain rounded-full opacity-90"
                  />
                </div>
              </div>
              <span className="text-2xl font-semibold text-white mt-4">{planetB.uzbekName}</span>
              <span className="text-xs text-slate-400">Ø {planetB.diameterKm.toLocaleString()} km</span>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table / Metric Bars */}
        <div className="bg-[#091b38]/70 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-12 text-xs font-semibold text-slate-400 uppercase pb-2 border-b border-white/10">
            <div className="col-span-4 text-left">{planetA.uzbekName} ko'rsatkichi</div>
            <div className="col-span-4 text-center">Xususiyat</div>
            <div className="col-span-4 text-right">{planetB.uzbekName} ko'rsatkichi</div>
          </div>

          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-2">
              <div className="grid grid-cols-12 items-center text-sm">
                <div className="col-span-4 text-left font-bold text-cyan-300">{m.valA}</div>
                <div className="col-span-4 text-center font-medium text-slate-300 text-xs sm:text-sm">{m.label}</div>
                <div className="col-span-4 text-right font-bold text-amber-300">{m.valB}</div>
              </div>

              {/* Proportional dual progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                  style={{ width: `${m.pctA}%` }}
                />
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                  style={{ width: `${m.pctB}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Auto-generated Natural Language Summary */}
        <div className="mt-8 bg-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 text-slate-200 text-sm leading-relaxed">
          <span className="font-semibold text-cyan-300 block mb-1">Xulosa va Taqqoslash tahlili:</span>
          {planetA.uzbekName} va {planetB.uzbekName} o'rtasidagi solishtirish shuni ko'rsatadiki,{' '}
          {planetA.diameterKm > planetB.diameterKm ? (
            <span>
              <strong>{planetA.uzbekName}</strong> o'lchami bo'yicha <strong>{planetB.uzbekName}</strong>dan{' '}
              {(planetA.diameterKm / planetB.diameterKm).toFixed(1)} barobar kattaroq.
            </span>
          ) : planetA.diameterKm < planetB.diameterKm ? (
            <span>
              <strong>{planetB.uzbekName}</strong> o'lchami bo'yicha <strong>{planetA.uzbekName}</strong>dan{' '}
              {(planetB.diameterKm / planetA.diameterKm).toFixed(1)} barobar kattaroq.
            </span>
          ) : (
            <span>Ikkala sayyora diametri bo'yicha deyarli teng.</span>
          )}{' '}
          Gravitatsiya kuchi esa {planetA.uzbekName}da {planetA.gravityMps2} m/s², {planetB.uzbekName}da esa{' '}
          {planetB.gravityMps2} m/s² ni tashkil etadi.
        </div>
      </div>
    </section>
  );
};
