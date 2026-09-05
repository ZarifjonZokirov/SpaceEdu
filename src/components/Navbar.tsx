import React, { useState, useEffect } from 'react';
import {
  Rocket,
  Menu,
  X,
  Compass,
  Globe,
  Scale,
  Award,
  Calendar,
  Sparkles,
  LogOut,
  User,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenEnroll: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnroll }) => {
  const { user, profile, loading, signInWithGoogle, setIsProfileModalOpen, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sayyoralar', href: '#sayyoralar', icon: Globe },
    { name: 'Taqqoslash', href: '#taqqoslash', icon: Scale },
    { name: 'Kalkulyator', href: '#kalkulyator', icon: Compass },
    { name: 'Laboratoriya', href: '#laboratoriya', icon: Rocket },
    { name: 'Viktorina', href: '#viktorina', icon: Award },
    { name: 'Hodisalar', href: '#hodisalar', icon: Calendar },
  ];

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const displayName = profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Foydalanuvchi';
  const photoURL = profile?.photoURL || user?.photoURL;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#04101f]/95 backdrop-blur-md border-b border-cyan-500/20 py-2.5 shadow-xl shadow-black/50'
          : 'bg-gradient-to-b from-[#04101f]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white group"
            style={{ fontFamily: 'var(--font-logo, "Poppins", sans-serif)' }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span>
              space<span className="text-cyan-400 font-normal">edu</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-slate-200 hover:text-cyan-300 rounded-full hover:bg-white/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action / Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              </div>
            ) : user ? (
              /* User is logged in: Display Google user name and avatar */
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-cyan-500/30 transition-all cursor-pointer group"
                  id="user-profile-button"
                >
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt={displayName}
                      className="w-7 h-7 rounded-full object-cover border border-cyan-400"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-400 text-xs font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {/* Google Display Name */}
                  <span className="text-sm font-semibold text-white group-hover:text-cyan-300 max-w-[140px] truncate">
                    {displayName}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </button>

                {/* Dropdown Menu */}
                {showUserDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-[#07152b] border border-cyan-500/30 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setShowUserDropdown(false)}
                  >
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-[11px] text-cyan-400 font-medium uppercase tracking-wider">Google Hisob</p>
                      <p className="text-sm font-bold text-white truncate">{displayName}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setIsProfileModalOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-200 hover:text-cyan-300 hover:bg-white/5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-cyan-400" />
                      <span>Kosmik Profilni Ko'rish</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        signOut();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-2 cursor-pointer mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Chiqish (Logout)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* User not logged in: Google Sign In Button */
              <button
                onClick={handleGoogleLogin}
                disabled={isSigningIn}
                className="px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-full shadow-md shadow-white/10 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                id="google-login-button"
              >
                {isSigningIn ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-700" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span>Google bilan kirish</span>
              </button>
            )}

            {/* Kurslarga yozilish tugmasi */}
            <button
              onClick={onOpenEnroll}
              className="px-4 py-2 text-xs font-semibold text-[#071227] bg-gradient-to-b from-white via-[#dceefe] to-[#f4f9ff] hover:from-[#f4f9ff] hover:to-white rounded-full shadow-lg shadow-cyan-400/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Rocket className="w-3.5 h-3.5 text-cyan-700" />
              <span>A'zo bo'lish</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {user && (
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="p-1 rounded-full border border-cyan-400"
              >
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={displayName}
                    className="w-7 h-7 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-cyan-300 focus:outline-none"
              aria-label="Menyu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#07152b]/98 border-b border-cyan-500/20 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {/* User profile on mobile if logged in */}
          {user ? (
            <div
              onClick={() => {
                setIsOpen(false);
                setIsProfileModalOpen(true);
              }}
              className="p-3 bg-white/5 border border-cyan-500/30 rounded-2xl flex items-center justify-between mb-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={displayName}
                    className="w-10 h-10 rounded-xl object-cover border border-cyan-400"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs text-cyan-400 font-medium">Google Profil</p>
                  <p className="text-sm font-bold text-white truncate">{displayName}</p>
                </div>
              </div>
              <span className="text-xs text-cyan-300">Ko'rish →</span>
            </div>
          ) : (
            <div className="mb-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleGoogleLogin();
                }}
                disabled={isSigningIn}
                className="w-full py-2.5 text-center text-xs font-semibold text-slate-900 bg-white rounded-xl shadow flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Google bilan kirish</span>
              </button>
            </div>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-white/5 transition-all"
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{link.name}</span>
              </a>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenEnroll();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-[#071227] bg-gradient-to-r from-cyan-300 to-cyan-400 rounded-xl shadow-lg shadow-cyan-400/30 flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>A'zo bo'lish (Bepul)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
