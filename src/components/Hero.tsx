import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Sparkles, UserCheck } from 'lucide-react';
import { PLANETS } from '../data/spaceData';
import { useAuth } from '../context/AuthContext';

const ORDER = ['earth', 'venus', 'mars'];

export const Hero: React.FC = () => {
  const { user, profile, setIsProfileModalOpen } = useAuth();
  const [featured, setFeatured] = useState<'earth' | 'venus' | 'mars'>('earth');
  const [videoLoaded, setVideoLoaded] = useState<Record<string, boolean>>({ earth: true });
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const featuredData = PLANETS[featured];

  const rest = ORDER.filter((p) => p !== featured);
  const leftPlanetKey = rest[0];
  const rightPlanetKey = rest[1];
  const leftData = PLANETS[leftPlanetKey];
  const rightData = PLANETS[rightPlanetKey];

  const handleSelect = (planetKey: string) => {
    if (planetKey === featured || !['earth', 'venus', 'mars'].includes(planetKey)) return;
    const p = planetKey as 'earth' | 'venus' | 'mars';
    setFeatured(p);

    if (!videoLoaded[p]) {
      setVideoLoaded((prev) => ({ ...prev, [p]: true }));
    }

    // Play active video, pause others
    ORDER.forEach((item) => {
      const vid = videoRefs.current[item];
      if (vid) {
        if (item === p) {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      }
    });
  };

  useEffect(() => {
    // Warm up other videos during idle
    const timer = setTimeout(() => {
      setVideoLoaded({ earth: true, venus: true, mars: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToExplore = () => {
    const el = document.getElementById('sayyoralar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] max-h-[1200px] overflow-hidden bg-[#04101f] text-white flex items-center justify-center select-none"
    >
      {/* Background Videos & Stills */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${featuredData.stillImage || featuredData.image})` }}
      >
        {ORDER.map((pKey) => {
          const p = PLANETS[pKey];
          const isCurrent = featured === pKey;
          const shouldLoad = videoLoaded[pKey] || isCurrent;
          return (
            <video
              key={pKey}
              ref={(el) => (videoRefs.current[pKey] = el)}
              src={shouldLoad ? p.videoUrl : undefined}
              poster={p.stillImage}
              autoPlay={isCurrent}
              muted
              loop
              playsInline
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          );
        })}
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04101f] via-transparent to-[#04101f]/60 pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center flex flex-col items-center">
        {user && (
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm backdrop-blur-md hover:bg-cyan-900/80 transition-all hover:scale-105 cursor-pointer shadow-lg shadow-cyan-950/50"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Xush kelibsiz, <strong className="text-white">{profile?.displayName || user.displayName || user.email}</strong>!</span>
            <span className="text-[11px] text-cyan-400 font-semibold underline ml-1">Profilni ochish →</span>
          </button>
        )}

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SAYYORA ENSIKLOPEDIYASI</span>
        </div>

        {/* Huge Title */}
        <h1
          className="text-6xl sm:text-8xl md:text-9xl font-normal tracking-wide text-white drop-shadow-2xl transition-all duration-300 mb-4"
          style={{ fontFamily: 'var(--font-serif, "Prata", Georgia, serif)' }}
        >
          {featuredData.uzbekName.toUpperCase()}
        </h1>

        {/* Cyan Accent Rule */}
        <div className="w-20 sm:w-28 h-1 bg-cyan-400 rounded-full mb-6 shadow-lg shadow-cyan-400/50" />

        {/* Lede Paragraph */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal mb-10 px-2 drop-shadow">
          {featuredData.description}
        </p>

        {/* CTA & Flanking Planet Buttons */}
        <div className="relative flex items-center justify-center gap-6 sm:gap-12 w-full">
          {/* Left Planet Slot */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => handleSelect(leftPlanetKey)}
              className="group relative flex items-center gap-3 p-2 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={`Ko'rish: ${leftData.uzbekName}`}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 p-1">
                <img
                  src={leftData.image}
                  alt={leftData.uzbekName}
                  className="w-full h-full object-contain filter drop-shadow-lg group-hover:rotate-12 transition-transform duration-500"
                />
              </div>
              <div className="text-left hidden sm:block pr-2">
                <span className="block text-[10px] uppercase text-cyan-400 tracking-wider">O'tish</span>
                <span
                  className="block text-base font-normal tracking-wider text-white"
                  style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
                >
                  {leftData.uzbekName.toUpperCase()}
                </span>
              </div>
            </button>
          </div>

          {/* Center Main CTA Button */}
          <button
            onClick={scrollToExplore}
            className="px-8 sm:px-10 py-4 sm:py-4.5 rounded-full font-bold text-sm sm:text-base tracking-wider text-[#071227] bg-gradient-to-b from-white via-[#d6e8f8] to-white hover:from-[#f4f9ff] hover:to-white shadow-[0_10px_25px_-5px_rgba(121,220,232,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(121,220,232,0.6)] transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0 border-2 border-white/80"
          >
            TADQIQ ETISH
          </button>

          {/* Right Planet Slot */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => handleSelect(rightPlanetKey)}
              className="group relative flex items-center gap-3 p-2 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={`Ko'rish: ${rightData.uzbekName}`}
            >
              <div className="text-right hidden sm:block pl-2">
                <span className="block text-[10px] uppercase text-cyan-400 tracking-wider">O'tish</span>
                <span
                  className="block text-base font-normal tracking-wider text-white"
                  style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
                >
                  {rightData.uzbekName.toUpperCase()}
                </span>
              </div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 p-1">
                <img
                  src={rightData.image}
                  alt={rightData.uzbekName}
                  className="w-full h-full object-contain filter drop-shadow-lg group-hover:-rotate-12 transition-transform duration-500"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={scrollToExplore}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/80 border border-cyan-400/30 text-white flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 transition-all hover:scale-110 cursor-pointer backdrop-blur-md shadow-lg shadow-black/40 group"
        aria-label="Pastga o'tish"
      >
        <ArrowDown className="w-5 h-5 text-cyan-400 group-hover:translate-y-1 transition-transform" />
      </button>
    </section>
  );
};
