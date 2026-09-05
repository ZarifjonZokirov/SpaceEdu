import React, { useState, useRef, useEffect } from 'react';
import { Rocket, Play, RotateCcw, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

interface BodyPhysics {
  name: string;
  radiusKm: number;
  massScale: number; // relative to earth
  color: string;
  orbitVkm_s: number; // approx 1st cosmic speed
  escapeVkm_s: number; // approx 2nd cosmic speed
}

const BODIES: Record<string, BodyPhysics> = {
  earth: { name: 'Yer', radiusKm: 6371, massScale: 1.0, color: '#38bdf8', orbitVkm_s: 7.9, escapeVkm_s: 11.2 },
  mars: { name: 'Mars', radiusKm: 3390, massScale: 0.107, color: '#f97316', orbitVkm_s: 3.6, escapeVkm_s: 5.0 },
  moon: { name: 'Oy', radiusKm: 1737, massScale: 0.012, color: '#e2e8f0', orbitVkm_s: 1.68, escapeVkm_s: 2.38 },
};

export const OrbitSimulator: React.FC = () => {
  const [selectedBody, setSelectedBody] = useState<string>('earth');
  const [launchSpeed, setLaunchSpeed] = useState<number>(7.9); // km/s
  const [launchAngle, setLaunchAngle] = useState<number>(0); // 0 = horizontal / tangential
  const [simStatus, setSimStatus] = useState<string>('Tayyor: Parametrlarni tanlang va Uchirish tugmasini bosing');
  const [statusType, setStatusType] = useState<'ready' | 'orbit' | 'crashed' | 'escaped'>('ready');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Simulation state
  const stateRef = useRef({
    isRunning: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    trail: [] as { x: number; y: number }[],
    centerRadiusPx: 45,
    gm: 4000, // gravitational parameter in canvas units
  });

  const body = BODIES[selectedBody] || BODIES.earth;

  // Initialize or Reset position
  const resetSim = () => {
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const startRadius = stateRef.current.centerRadiusPx + 40; // ~400km altitude above surface
    stateRef.current.x = cx;
    stateRef.current.y = cy - startRadius;
    stateRef.current.trail = [];
    stateRef.current.isRunning = false;

    setSimStatus('Tayyor: Parametrlarni tanlang va Uchirish tugmasini bosing');
    setStatusType('ready');

    drawCanvas(cx, cy);
  };

  const drawCanvas = (cx: number, cy: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw space grid & stars
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let r = 50; r < canvas.width / 2; r += 50) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw Central Body
    const rPx = stateRef.current.centerRadiusPx;
    const grad = ctx.createRadialGradient(cx - rPx * 0.3, cy - rPx * 0.3, rPx * 0.1, cx, cy, rPx);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.4, body.color);
    grad.addColorStop(1, '#020617');

    ctx.save();
    ctx.shadowColor = body.color;
    ctx.shadowBlur = 25;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, rPx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Draw Trajectory Trail
    const trail = stateRef.current.trail;
    if (trail.length > 1) {
      ctx.strokeStyle = '#79dce8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
      }
      ctx.stroke();
    }

    // Draw Satellite / Spacecraft
    const sx = stateRef.current.x;
    const sy = stateRef.current.y;
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#79dce8';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(sx, sy, 4, 0, Math.PI * 2);
    ctx.fill();

    // Small solar panels on satellite
    ctx.strokeStyle = '#79dce8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx - 8, sy);
    ctx.lineTo(sx + 8, sy);
    ctx.stroke();
    ctx.restore();
  };

  const launch = () => {
    resetSim();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Convert speed and angle to canvas velocity
    // Normalizing 7.9 km/s to balance circular orbit
    const baseScale = Math.sqrt(stateRef.current.gm / (stateRef.current.centerRadiusPx + 40));
    const vScale = baseScale * (launchSpeed / body.orbitVkm_s);

    const rad = (launchAngle * Math.PI) / 180;
    // Launch towards positive X with angle
    stateRef.current.vx = vScale * Math.cos(rad);
    stateRef.current.vy = -vScale * Math.sin(rad);
    stateRef.current.isRunning = true;

    let steps = 0;

    const tick = () => {
      if (!stateRef.current.isRunning) return;

      // Perform multiple micro-steps per frame for physics accuracy (Runge-Kutta / Verlet style)
      const subSteps = 6;
      const dt = 0.25 / subSteps;

      for (let i = 0; i < subSteps; i++) {
        const dx = cx - stateRef.current.x;
        const dy = cy - stateRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Collision check
        if (dist <= stateRef.current.centerRadiusPx) {
          stateRef.current.isRunning = false;
          setSimStatus(`To'qnashuv! Kosmik kema ${body.name} sirtiga quladi. Tezlik yetarli bo'lmadi.`);
          setStatusType('crashed');
          break;
        }

        // Escape check
        if (dist >= canvas.width * 0.9) {
          stateRef.current.isRunning = false;
          setSimStatus(`Parvoz muvaffaqiyatli! Kosmik kema 2-kosmik tezlikni yengib, ${body.name} gravitatsiyasidan chiqib ketdi.`);
          setStatusType('escaped');
          break;
        }

        // Gravitational acceleration: a = GM / r^2
        const accel = (stateRef.current.gm * body.massScale) / (dist * dist);
        const ax = accel * (dx / dist);
        const ay = accel * (dy / dist);

        stateRef.current.vx += ax * dt;
        stateRef.current.vy += ay * dt;

        stateRef.current.x += stateRef.current.vx * dt;
        stateRef.current.y += stateRef.current.vy * dt;
      }

      // Record trail
      if (steps % 3 === 0) {
        stateRef.current.trail.push({ x: stateRef.current.x, y: stateRef.current.y });
        if (stateRef.current.trail.length > 500) stateRef.current.trail.shift();
      }
      steps++;

      // Check for stable orbit completion
      if (steps > 600 && stateRef.current.isRunning && statusType !== 'orbit') {
        setSimStatus(`Mukammal! Kosmik kema barqaror orbital harakatga kirdi.`);
        setStatusType('orbit');
      }

      drawCanvas(cx, cy);

      if (stateRef.current.isRunning) {
        animFrameId.current = requestAnimationFrame(tick);
      }
    };

    animFrameId.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    resetSim();
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [selectedBody]);

  return (
    <section id="laboratoriya" className="py-24 bg-[#04101f] text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>Virtual Laboratoriya</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-normal text-white tracking-wide"
            style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
          >
            Gravitatsiya va Orbita Simulyatori
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Nyutonning butun olam tortishish qonuni asosida ishlaydigan fizik simulyator: sun'iy yo'ldoshni orbitaga chiqaring!
          </p>
        </div>

        {/* Simulation Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-4 bg-[#091b38]/80 border border-cyan-500/20 rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Rocket className="w-5 h-5 text-cyan-400" />
              <span>Uchirish Boshqaruvi</span>
            </h3>

            {/* Planet Choice */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Markaziy Osmon Jismi:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(BODIES).map((k) => (
                  <button
                    key={k}
                    onClick={() => setSelectedBody(k)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      selectedBody === k
                        ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-md shadow-cyan-500/30'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {BODIES[k].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-400 uppercase">Uchirish Tezligi:</span>
                <span className="text-cyan-300 font-bold">{launchSpeed.toFixed(1)} km/s</span>
              </div>
              <input
                type="range"
                min={2.0}
                max={15.0}
                step={0.1}
                value={launchSpeed}
                onChange={(e) => setLaunchSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1-kosmik: {body.orbitVkm_s} km/s</span>
                <span>2-kosmik: {body.escapeVkm_s} km/s</span>
              </div>
            </div>

            {/* Launch Angle Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-400 uppercase">Uchirish Burchagi:</span>
                <span className="text-cyan-300 font-bold">{launchAngle}°</span>
              </div>
              <input
                type="range"
                min={-30}
                max={60}
                step={1}
                value={launchAngle}
                onChange={(e) => setLaunchAngle(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="text-[10px] text-slate-400 mt-1">
                0° = Tangentsial (orbita uchun eng maqbul burchak)
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={launch}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Uchirish!</span>
              </button>
              <button
                onClick={resetSim}
                className="py-3 px-4 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                title="Qayta tiklash"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Preset Buttons */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">Tezkor Tayyor Rejimlar:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    setSelectedBody('earth');
                    setLaunchSpeed(7.9);
                    setLaunchAngle(0);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 cursor-pointer"
                >
                  XKS Orbitasi (Yer)
                </button>
                <button
                  onClick={() => {
                    setSelectedBody('earth');
                    setLaunchSpeed(11.2);
                    setLaunchAngle(15);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 cursor-pointer"
                >
                  Koinotga Chiqish (11.2 km/s)
                </button>
                <button
                  onClick={() => {
                    setSelectedBody('mars');
                    setLaunchSpeed(3.6);
                    setLaunchAngle(0);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 cursor-pointer"
                >
                  Mars Orbitasi
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Simulation Stage */}
          <div className="lg:col-span-8 bg-[#091b38]/80 border border-cyan-500/20 rounded-3xl p-6 flex flex-col items-center">
            {/* Real-time Status Banner */}
            <div
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 mb-4 border transition-colors ${
                statusType === 'orbit'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                  : statusType === 'crashed'
                  ? 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                  : statusType === 'escaped'
                  ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
                  : 'bg-slate-900/60 text-slate-300 border-slate-700'
              }`}
            >
              {statusType === 'orbit' && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
              {statusType === 'crashed' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
              {statusType === 'escaped' && <Rocket className="w-4 h-4 text-cyan-400" />}
              {statusType === 'ready' && <Activity className="w-4 h-4 text-slate-400" />}
              <span>{simStatus}</span>
            </div>

            {/* Canvas */}
            <div className="w-full flex items-center justify-center overflow-hidden rounded-2xl bg-[#020617] border border-cyan-500/30 relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={450}
                className="w-full max-w-[600px] h-[340px] sm:h-[420px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
