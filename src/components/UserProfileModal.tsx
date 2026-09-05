import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User as UserIcon,
  LogOut,
  X,
  Mail,
  CheckCircle,
  Database,
  Sparkles,
  Compass,
  Award,
  Edit2,
  Save,
  Loader2,
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const { user, profile, isProfileModalOpen, setIsProfileModalOpen, signOut, updateProfileData } =
    useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [favoritePlanet, setFavoritePlanet] = useState(profile?.favoritePlanet || 'Yer (Earth)');
  const [spaceRole, setSpaceRole] = useState(profile?.spaceRole || 'Kosmik Tadqiqotchi');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isProfileModalOpen || !user) return null;

  const displayName = profile?.displayName || user.displayName || 'Kosmik Foydalanuvchi';
  const email = profile?.email || user.email || '';
  const photoURL = profile?.photoURL || user.photoURL;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfileData({
        favoritePlanet,
        spaceRole,
      });
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const planetsList = [
    'Merkuriy',
    'Venera',
    'Yer (Earth)',
    'Mars',
    'Yupiter',
    'Saturn',
    'Uran',
    'Neptun',
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#07152b] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/80 overflow-hidden"
        style={{
          boxShadow: '0 0 60px -10px rgba(6, 182, 212, 0.25)',
        }}
      >
        {/* Background cosmic glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Close */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Foydalanuvchi Profili</h3>
              <p className="text-xs text-slate-400">Google hisobi va Firebase spaceedu bazasi</p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Info */}
        <div className="my-6 space-y-6">
          {/* Main User Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="relative">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={displayName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white border-2 border-cyan-400/50 shadow-lg">
                  <UserIcon className="w-10 h-10" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#07152b] flex items-center justify-center text-slate-950" title="Google orqali faol">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* Google display name clearly highlighted */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Google Hisob
                </span>
                <span className="text-xs text-slate-400">
                  {spaceRole}
                </span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
                {displayName}
              </h2>

              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-300 mt-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{email}</span>
              </div>

              <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-emerald-400">
                <Database className="w-3.5 h-3.5" />
                <span>Firebase Firestore (`spaceedu`) ma'lumotlariga ulangan</span>
              </div>
            </div>
          </div>

          {/* Preferences & Settings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Kosmik Ma'lumotlar
              </h4>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Tahrirlash</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Sevimli Sayyora:</span>
                </div>
                {isEditing ? (
                  <select
                    value={favoritePlanet}
                    onChange={(e) => setFavoritePlanet(e.target.value)}
                    className="w-full bg-[#020b18] border border-cyan-500/50 rounded-lg px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    {planetsList.map((p) => (
                      <option key={p} value={p} className="bg-[#07152b]">
                        {p}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-sm font-semibold text-white">
                    {profile?.favoritePlanet || favoritePlanet}
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Kosmik Daraja / Maqom:</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={spaceRole}
                    onChange={(e) => setSpaceRole(e.target.value)}
                    className="w-full bg-[#020b18] border border-cyan-500/50 rounded-lg px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    maxLength={50}
                  />
                ) : (
                  <div className="text-sm font-semibold text-white">
                    {profile?.spaceRole || spaceRole}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 rounded-lg cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-1.5 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg flex items-center gap-1.5 shadow cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Saqlash</span>
                </button>
              </div>
            )}

            {saveSuccess && (
              <p className="text-xs text-emerald-400 text-center animate-fadeIn">
                Profil ma'lumotlari Firebase'da yangilandi!
              </p>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            ID: {user.uid.slice(0, 8)}...
          </span>
          <button
            onClick={async () => {
              await signOut();
              setIsProfileModalOpen(false);
            }}
            className="px-4 py-2 text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Chiqish (Sign Out)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
