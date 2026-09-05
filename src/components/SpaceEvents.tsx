import React, { useState, useEffect } from 'react';
import { UPCOMING_EVENTS, SpaceEvent } from '../data/spaceData';
import { Calendar, Radio, Compass, Eye, ShieldCheck } from 'lucide-react';

export const SpaceEvents: React.FC = () => {
  // Simulated real-time ISS coordinates updating continuously
  const [issData, setIssData] = useState({
    lat: 28.452,
    lng: 64.128,
    alt: 408.4,
    speed: 27580,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIssData((prev) => {
        let nextLng = prev.lng + 0.12;
        if (nextLng > 180) nextLng = -180;
        let nextLat = prev.lat + Math.sin(Date.now() / 50000) * 0.05;
        if (nextLat > 51.6) nextLat = 51.6;
        if (nextLat < -51.6) nextLat = -51.6;
        return {
          lat: parseFloat(nextLat.toFixed(3)),
          lng: parseFloat(nextLng.toFixed(3)),
          alt: parseFloat((408.2 + Math.sin(Date.now() / 20000) * 0.5).toFixed(1)),
          speed: Math.round(27575 + Math.sin(Date.now() / 30000) * 15),
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredEvents = filterCategory === 'all'
    ? UPCOMING_EVENTS
    : UPCOMING_EVENTS.filter((e) => e.category === filterCategory);

  return (
    <section id="hodisalar" className="py-24 bg-[#04101f] text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Real Vaqt & Taqvimi</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-normal text-white tracking-wide"
            style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
          >
            XKS Trekeri va Koinot Hodisalari
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Xalqaro Kosmik Stansiyaning jonli orbital koordinatalari va O'zbekiston osmonida kuzatiladigan muhim astronomik hodisalar taqvimi.
          </p>
        </div>

        {/* ISS Live Tracker Card */}
        <div className="bg-[#091b38]/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Jonli Telemetriya (ISS Live)</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Xalqaro Kosmik Stansiya (XKS) Holati
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Stansiya Yer atrofida har 92 daqiqada bir to'liq aylanani amalga oshiradi.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Barcha tizimlar normal holatda</span>
            </div>
          </div>

          {/* Real-time Telemetry Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Kenglik (Latitude)</span>
              <div className="text-2xl font-bold text-cyan-300 font-mono">
                {issData.lat > 0 ? `+${issData.lat}° N` : `${issData.lat}° S`}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Uzunlik (Longitude)</span>
              <div className="text-2xl font-bold text-cyan-300 font-mono">
                {issData.lng > 0 ? `+${issData.lng}° E` : `${issData.lng}° W`}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Orbital Balandlik</span>
              <div className="text-2xl font-bold text-white font-mono">
                {issData.alt} <span className="text-sm text-cyan-400 font-normal">km</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Orbital Tezlik</span>
              <div className="text-2xl font-bold text-white font-mono">
                {issData.speed.toLocaleString()} <span className="text-sm text-cyan-400 font-normal">km/soat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Space Events Calendar Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white">2026-yil Astronomik Voqealar Taqvimi</h3>
            <p className="text-sm text-slate-400">O'zbekiston hududidan kuzatish imkoniyatlari bilan</p>
          </div>

          {/* Categories */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                filterCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setFilterCategory('meteor')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                filterCategory === 'meteor'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Meteorlar
            </button>
            <button
              onClick={() => setFilterCategory('eclipse')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                filterCategory === 'eclipse'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Tutilishlar
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-[#091b38]/70 border border-white/10 rounded-3xl p-6 hover:border-cyan-400/40 hover:scale-[1.01] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-3">
                  <span className="text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                    {evt.date}
                  </span>
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">
                    {evt.category === 'meteor' ? 'Meteor Oqimi' : evt.category === 'eclipse' ? 'Quyosh/Oy Tutilishi' : 'Sayyoraviy Hodisa'}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mb-2">{evt.title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{evt.description}</p>
              </div>

              <div className="border-t border-white/10 pt-3 flex items-center gap-2 text-xs text-amber-300">
                <Eye className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{evt.visibilityUzbekistan}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
