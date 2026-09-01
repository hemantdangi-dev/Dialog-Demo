import React, { useState } from 'react';
import { CustomerProfile } from '../types';
import {
  Flame,
  Zap,
  Gift,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  AlertTriangle,
  RotateCw,
  Trophy,
  ChevronRight,
  BarChart3,
  HelpCircle,
  Smartphone,
  ShoppingBag
} from 'lucide-react';

interface PersonalizedGamificationProps {
  profile: CustomerProfile;
  onOpenRecharge: () => void;
  onOpenRedeem: () => void;
  onNavigateVouchers: () => void;
}

export const PersonalizedGamification: React.FC<PersonalizedGamificationProps> = ({
  profile,
  onOpenRecharge,
  onOpenRedeem,
  onNavigateVouchers,
}) => {
  // Streak state
  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Mobile Recharge (LKR 500+)',
      desc: 'Completed on 28 Aug (+500 pts earned)',
      completed: true,
      icon: Smartphone,
      actionText: 'Completed',
    },
    {
      id: 'task-2',
      title: 'Redeem Star Points (500+ Pts)',
      desc: 'Burn at least 500 points on reload or voucher',
      completed: false,
      icon: Gift,
      actionText: 'Redeem Now',
    },
    {
      id: 'task-3',
      title: 'Claim 1 Partner Voucher',
      desc: 'Unlock Cargills, Keells, or KFC voucher',
      completed: false,
      icon: ShoppingBag,
      actionText: 'View Vouchers',
    },
  ]);

  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<string | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleTaskAction = (taskId: string) => {
    if (taskId === 'task-1') {
      onOpenRecharge();
    } else if (taskId === 'task-2') {
      onOpenRedeem();
      // Simulate completing step 2 for demo purposes
      setTasks((prev) =>
        prev.map((t) => (t.id === 'task-2' ? { ...t, completed: true, actionText: 'Completed' } : t))
      );
    } else if (taskId === 'task-3') {
      onNavigateVouchers();
      // Simulate completing step 3 for demo purposes
      setTasks((prev) =>
        prev.map((t) => (t.id === 'task-3' ? { ...t, completed: true, actionText: 'Completed' } : t))
      );
    }
  };

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const bonusPrizes = ['+500 Bonus Points', '2X Star Points Multiplier', 'LKR 250 FoodCity Voucher', '500 Extra FlySMILES', '+1,000 Bonus Points'];
    const randomPrize = bonusPrizes[Math.floor(Math.random() * bonusPrizes.length)];
    const extraSpins = 5 * 360 + Math.floor(Math.random() * 360);
    setWheelRotation((prev) => prev + extraSpins);

    setTimeout(() => {
      setIsSpinning(false);
      setWheelResult(randomPrize);
    }, 2400);
  };

  return (
    <section id="gamification-section" className="space-y-4">
      {/* Main Gamification Widget */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-amber-500/30 relative overflow-hidden">
        {/* Subtle Background Lighting Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/15 via-red-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-red-600/15 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Column: Challenge Overview & Display Copy */}
          <div className="space-y-3 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                Personalized Streak Challenge
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-[10px] font-bold">
                <Clock className="w-3 h-3" />
                Ends in 4 Days (Weekly Reset)
              </span>

              <button
                type="button"
                onClick={() => setShowAnalysisModal(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300/80 hover:text-amber-200 underline cursor-pointer ml-auto sm:ml-0"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Why was I recommended this?
              </button>
            </div>

            {/* Display Copy (Strictly under 20 words as requested) */}
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              🔥 Complete 3 quick actions this week to claim 500 bonus Star Points before your points expire!
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Based on your Gold Tier reload habits, complete this 3-step loyalty sprint to unlock an instant <strong>+500 Star Points bonus</strong> and a <strong>LKR 250 FoodCity Voucher</strong>.
            </p>

            {/* Progress Bar & Milestone Tracker */}
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300 font-medium">
                  Challenge Progress: <strong className="text-amber-300 font-bold">{completedCount} of {tasks.length} Completed</strong>
                </span>
                <span className="font-mono font-bold text-amber-400">{progressPercent}%</span>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Reward Unlock & Spin-the-Wheel / Quick Action Card */}
          <div className="bg-slate-800/80 backdrop-blur-xs border border-amber-400/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shrink-0 lg:w-80 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Streak Completion Reward</div>
                  <div className="text-sm font-black text-amber-300">+500 Pts + LKR 250 Voucher</div>
                </div>
              </div>
            </div>

            {/* Spin-the-Wheel Bonus Box */}
            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-2 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-white">
                <RotateCw
                  className={`w-4 h-4 text-amber-400 ${isSpinning ? 'animate-spin' : ''}`}
                  style={{ transform: `rotate(${wheelRotation}deg)`, transition: isSpinning ? 'transform 2.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none' }}
                />
                <span>Bonus Lucky Spin</span>
              </div>

              {wheelResult ? (
                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold animate-in zoom-in-95">
                  🎉 Unlocked: {wheelResult}!
                </div>
              ) : (
                <p className="text-[11px] text-gray-400">
                  Spin the wheel after completing your streak for surprise multipliers.
                </p>
              )}

              <button
                type="button"
                onClick={handleSpinWheel}
                disabled={isSpinning}
                className="w-full py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSpinning ? 'Spinning...' : 'Spin Bonus Wheel'}
              </button>
            </div>
          </div>
        </div>

        {/* 3 Step Action Grid */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3">
          {tasks.map((task, idx) => {
            const Icon = task.icon;
            return (
              <div
                key={task.id}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                  task.completed
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-white'
                    : 'bg-slate-800/60 border-slate-700/80 hover:border-amber-400/50 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      task.completed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase text-gray-400">Step {idx + 1}</span>
                      {task.completed && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300">
                          Done
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-white mt-0.5">{task.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{task.desc}</p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/50 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleTaskAction(task.id)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                      task.completed
                        ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                    }`}
                  >
                    <span>{task.actionText}</span>
                    {!task.completed && <ArrowRight className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trigger & Recommendation Analysis Breakdown Modal / Info Card */}
      {showAnalysisModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowAnalysisModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative max-h-[90vh] flex flex-col text-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
                  Personalized Engagement Intelligence
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                Gamification Recommendation Analysis
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Data-driven loyalty rationale tailored for Priya Sharma
              </p>
            </div>

            {/* Analysis Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-gray-200">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Gamification Type</span>
                  <strong className="text-sm font-black text-amber-700">Streak Challenge (3-Step Sprint)</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Reward Tied to It</span>
                  <strong className="text-sm font-black text-emerald-700">+500 Points + LKR 250 Voucher</strong>
                </div>
              </div>

              {/* Four Pillar Data Breakdown */}
              <div className="space-y-2.5">
                <h5 className="font-bold text-gray-900 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-[#ED1C24]" />
                  Engagement Metrics Evaluated
                </h5>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-gray-900 block">1. Points Earned vs. Purchase Frequency:</strong>
                      <span className="text-gray-600">
                        High monthly recharge frequency (LKR 2,850/month across 3 transactions), accumulating 12,450 Star Points.
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-amber-900 block">2. Points Redeemed & Expiry Risk:</strong>
                      <span className="text-amber-800">
                        Low redemption volume (only 1,400 points redeemed total = 10.1% redemption rate), with 1,200 points at risk of expiring in 45 days.
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-gray-900 block">3. Tier Progression Status:</strong>
                      <span className="text-gray-600">
                        Gold Tier (12,450 / 20,000 points). Needs 7,550 points to reach Platinum; streak challenge offers momentum towards tier elevation.
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-gray-900 block">4. Voucher & Benefit Usage:</strong>
                      <span className="text-gray-600">
                        High voucher accumulation with low utilization. Guiding the user to burn points on a partner voucher prevents loss of value.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trigger Reason Summary Box */}
              <div className="bg-red-50 p-3.5 rounded-2xl border border-red-200 text-red-950 space-y-1">
                <span className="font-bold text-[11px] uppercase tracking-wider block text-[#ED1C24]">
                  Trigger Reason
                </span>
                <p className="leading-relaxed">
                  <strong>High purchase frequency but low voucher redemption with expiring points.</strong> Priya regularly reloads her connection, but has let points accumulate without redeeming vouchers. A 3-step streak nudges immediate points utilization before the 1,200 points expire.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAnalysisModal(false)}
                className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close & Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
