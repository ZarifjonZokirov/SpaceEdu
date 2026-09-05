import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/spaceData';
import { Award, CheckCircle, XCircle, RefreshCw, Printer, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SpaceQuiz: React.FC = () => {
  const { user, profile } = useAuth();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');
  const [certificateGenerated, setCertificateGenerated] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem('spaceedu_student_name');
    if (savedName) {
      setStudentName(savedName);
    } else if (user) {
      const gName = profile?.displayName || user.displayName;
      if (gName) setStudentName(gName);
    }
  }, [user, profile]);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const prevBest = parseInt(localStorage.getItem('spaceedu_quiz_best') || '0', 10);
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 1 : 0);
      if (finalScore > prevBest) {
        localStorage.setItem('spaceedu_quiz_best', finalScore.toString());
      }
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setCertificateGenerated(false);
  };

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    localStorage.setItem('spaceedu_student_name', studentName.trim());
    setCertificateGenerated(true);
  };

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <section id="viktorina" className="py-24 bg-[#051329] text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Koinot Viktorinasi</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-normal text-white tracking-wide"
            style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
          >
            Bilimingizni Sinang va Sertifikat Oling
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Sayyoralar va astrofizika bo'yicha bilimlaringizni sinovdan o'tkazing. 80% dan yuqori natija ko'rsatib, rasmiy SpaceEdu sertifikatiga ega bo'ling!
          </p>
        </div>

        {/* Active Quiz Card */}
        {!quizFinished ? (
          <div className="bg-[#091b38]/80 border border-cyan-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
              <span>Savol {currentIndex + 1} / {QUIZ_QUESTIONS.length}</span>
              <span>Ball: {score}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-8">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200';
                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold';
                  } else {
                    btnStyle = 'bg-white/5 border-white/5 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span className="text-base">{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {isAnswered && (
              <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-2xl p-4 mb-6 text-sm text-cyan-200 leading-relaxed animate-fadeIn">
                <span className="font-bold text-cyan-400 block mb-1">Izoh:</span>
                {currentQ.explanation}
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl font-bold text-base bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/30 hover:from-cyan-300 hover:to-blue-500 transition-all cursor-pointer"
              >
                {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Keyingi Savol' : 'Natijani Ko\'rish'}
              </button>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="bg-[#091b38]/90 border border-cyan-500/20 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-md shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/30">
              <Award className="w-10 h-10 text-white" />
            </div>

            <h3
              className="text-3xl sm:text-4xl font-normal text-white mb-2"
              style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
            >
              Viktorina Yakunlandi!
            </h3>
            <p className="text-slate-300 text-lg mb-6">
              Siz {QUIZ_QUESTIONS.length} ta savoldan <strong>{score}</strong> tasiga to'g'ri javob berdingiz ({percentage}%).
            </p>

            {/* Certificate Unlock Form */}
            {percentage >= 60 ? (
              <div className="max-w-md mx-auto bg-white/5 border border-cyan-400/30 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-center gap-2 text-cyan-300 text-sm font-semibold mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Tabriklaymiz! Siz sertifikatga loyiq deb topildingiz.</span>
                </div>
                {!certificateGenerated ? (
                  <form onSubmit={handleGenerateCertificate} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Ism va Familiyangizni kiriting"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 text-center"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-cyan-400/20"
                    >
                      Sertifikatni Shakllantirish
                    </button>
                  </form>
                ) : (
                  <p className="text-xs text-emerald-400 font-semibold">
                    Sertifikat muvaffaqiyatli shakllantirildi! Quyida ko'rishingiz mumkin.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-400 mb-8 max-w-sm mx-auto">
                Sertifikat olish uchun kamida 60% natija kerak. Qayta urinib ko'ring!
              </p>
            )}

            {/* Render Printable Certificate */}
            {certificateGenerated && (
              <div id="space-certificate" className="my-8 bg-[#020617] border-4 border-cyan-400/60 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-2">
                    SPACEDU RASMIY MALAKA SERTIFIKATI
                  </span>
                  <h4
                    className="text-2xl sm:text-3xl text-white font-normal mb-4"
                    style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
                  >
                    Koinot Tadqiqotchisi
                  </h4>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">
                    Ushbu sertifikat rasman taqdim etiladi:
                  </p>
                  <div
                    className="text-2xl sm:text-4xl font-bold text-cyan-300 py-3 border-b border-cyan-500/30 inline-block mb-4"
                    style={{ fontFamily: 'var(--font-serif, "Prata", serif)' }}
                  >
                    {studentName}
                  </div>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
                    Quyosh tizimi va astrofizika asoslari bo'yicha sinovdan muvaffaqiyatli o'tganligi va {percentage}% lik natijaga erishganligi tasdiqlanadi.
                  </p>

                  <div className="flex items-center justify-between max-w-xs mx-auto text-left pt-4 border-t border-white/10 text-xs text-slate-400">
                    <div>
                      <span>Sana:</span>
                      <strong className="block text-white">{new Date().toLocaleDateString('uz-UZ')}</strong>
                    </div>
                    <div className="text-right">
                      <span>ID Raqami:</span>
                      <strong className="block text-cyan-400">SE-{Math.floor(100000 + Math.random() * 900000)}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 border border-white/20 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Sertifikatni Chop Etish (Print)</span>
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/20"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Testni Qaytadan Boshlash</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
