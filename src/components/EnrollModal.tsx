import React, { useState, useEffect } from 'react';
import { X, Rocket, CheckCircle2, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ isOpen, onClose }) => {
  const { user, profile } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('astrofizika');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (user && !name) {
      const gName = profile?.displayName || user.displayName;
      if (gName) setName(gName);
    }
  }, [user, profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const studentId = `SE-UZB-${Math.floor(10000 + Math.random() * 90000)}`;
    const newStudent = {
      id: studentId,
      name: name.trim(),
      phone: phone.trim(),
      course,
      date: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('spaceedu_enrollments') || '[]');
      existing.push(newStudent);
      localStorage.setItem('spaceedu_enrollments', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setSubmittedId(studentId);
  };

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    setSubmittedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#091b38] border border-cyan-400/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedId ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SpaceEdu Kurslariga Qabul</span>
            </div>

            <h3
              className="text-2xl sm:text-3xl font-normal text-white mb-2"
              style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
            >
              Koinot Dasturiga A'zo Bo'ling
            </h3>
            <p className="text-sm text-slate-300 mb-6">
              Ma'lumotlaringizni qoldiring, mutaxassislarimiz siz bilan bog'lanib, bepul o'quv dasturi va materiallar bilan ta'minlaydi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Ism va Familiyangiz:
                  </label>
                  {user && (
                    <span className="text-[11px] text-cyan-300 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Google hisobingizdan olindi</span>
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  placeholder="Zarifjon Zokirov"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Telefon yoki Telegram (foydalanuvchi nomi):
                </label>
                <input
                  type="text"
                  required
                  placeholder="+998 90 123 45 67 yoki @username"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Qiziqayotgan Yo'nalishingiz:
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#07152b] border border-white/20 text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="astrofizika">Astrofizika va Kosmologiya Asoslari</option>
                  <option value="sayyoralar">Quyosh Tizimi va Sayyoralar Geologiyasi</option>
                  <option value="texnologiya">Kosmik Muhandislik va Sun'iy Yo'ldoshlar</option>
                  <option value="teleskop">Havaskor Astronomiya va Teleskopda Kuzatuv</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 hover:from-cyan-300 hover:to-blue-500 shadow-lg shadow-cyan-400/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <Rocket className="w-4 h-4 fill-current" />
                <span>Ro'yxatdan O'tish (Bepul)</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3
              className="text-2xl sm:text-3xl font-normal text-white mb-2"
              style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
            >
              Muvaffaqiyatli Ro'yxatdan O'tdingiz!
            </h3>
            <p className="text-sm text-slate-300 mb-6">
              Hurmatli <strong>{name}</strong>, so'rovingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.
            </p>

            <div className="bg-white/5 border border-cyan-400/30 rounded-2xl p-4 mb-6">
              <span className="text-xs uppercase tracking-wider text-slate-400 block mb-1">
                Sizning Unikal Talabalik Raqamingiz:
              </span>
              <span className="text-2xl font-bold text-cyan-300 font-mono tracking-wider">
                {submittedId}
              </span>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              Yopish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
