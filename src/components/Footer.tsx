import React from 'react';
import { Sparkles, Globe, Mail, Send, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020813] text-white border-t border-cyan-500/20 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span style={{ fontFamily: 'var(--font-logo, "Poppins", sans-serif)' }}>
                space<span className="text-cyan-400 font-normal">edu</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              O'zbekistonda astronomiya, sayyorashunoslik va koinot texnologiyalarini o'rganish uchun yaratilgan birinchi interaktiv ta'lim platformasi.
            </p>
          </div>

          {/* Fast Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-4">
              Bo'limlar
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#hero" className="hover:text-cyan-400 transition-colors">Bosh Sahifa</a>
              </li>
              <li>
                <a href="#sayyoralar" className="hover:text-cyan-400 transition-colors">Sayyoralar Ensiklopediyasi</a>
              </li>
              <li>
                <a href="#taqqoslash" className="hover:text-cyan-400 transition-colors">Solishtirish Vositalari</a>
              </li>
              <li>
                <a href="#kalkulyator" className="hover:text-cyan-400 transition-colors">Koinot Kalkulyatori</a>
              </li>
              <li>
                <a href="#laboratoriya" className="hover:text-cyan-400 transition-colors">Orbita Simulyatori</a>
              </li>
              <li>
                <a href="#viktorina" className="hover:text-cyan-400 transition-colors">Viktorina va Sertifikat</a>
              </li>
            </ul>
          </div>

          {/* Astronomical Sources */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-4">
              Ilmiy Manbalar
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>NASA Planetary Data System</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>ESA (Yevropa Kosmik Agentligi)</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>O'zbekiston FA Astronomiya Instituti</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Maydanak Balandtog' Rasadxonasi</span>
              </li>
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-4">
              Aloqa & Yangiliklar
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Kosmik kashfiyotlar va yangi kurslar haqida xabardor bo'lib turing:
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={() => alert("Rahmat! Yangiliklarga muvaffaqiyatli obuna bo'ldingiz.")}
                className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition-colors cursor-pointer"
                title="Yuborish"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>info@spaceedu.uz</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} SpaceEdu Platformasi. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-1">
            <span>Koinotga bo'lgan muhabbat bilan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
            <span>yaratildi.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
