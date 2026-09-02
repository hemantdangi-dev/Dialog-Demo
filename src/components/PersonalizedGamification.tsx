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
  RotateCw,
  Trophy,
  ChevronRight,
  BarChart3,
  Smartphone,
  ShoppingBag,
  Star,
  Check,
  Crown,
  HelpCircle,
  Tv,
  Utensils,
  Plane,
  Coins,
  ShieldCheck,
  Tag
} from 'lucide-react';

interface PersonalizedGamificationProps {
  profile: CustomerProfile;
  onOpenRecharge: () => void;
  onOpenRedeem: () => void;
  onNavigateVouchers: () => void;
  onClaimSpinReward?: (reward: {
    title: string;
    pointsBonus?: number;
    voucherName?: string;
    category: string;
    discountText?: string;
  }) => void;
  onViewTierBenefits?: () => void;
}

interface SpinWheelPrize {
  id: string;
  label: string;
  shortText: string;
  pointsBonus?: number;
  voucherName?: string;
  discountText?: string;
  category: string;
  color: string;
  textColor: string;
  icon: any;
  desc: string;
}

const WHEEL_PRIZES: SpinWheelPrize[] = [
  {
    id: 'p-1',
    label: '+500 Pts',
    shortText: '+500 Star Points',
    pointsBonus: 500,
    category: 'Points',
    color: '#ED1C24', // Dialog Red
    textColor: '#ffffff',
    icon: Sparkles,
    desc: 'Instant credit of 500 bonus Star Points to your active balance.',
  },
  {
    id: 'p-2',
    label: '2X Multiplier',
    shortText: '2X Points Multiplier',
    pointsBonus: 250,
    category: 'Bonus',
    color: '#0B2545', // Deep Navy
    textColor: '#ffffff',
    icon: Zap,
    desc: 'Double Star Points on your next 3 Dialog mobile reloads or bill payments.',
  },
  {
    id: 'p-3',
    label: 'LKR 250 Voucher',
    shortText: 'LKR 250 Cargills FoodCity Voucher',
    voucherName: 'Cargills FoodCity LKR 250 Supermarket Voucher',
    discountText: 'LKR 250 OFF on Groceries',
    category: 'Supermarket',
    color: '#059669', // Emerald Green
    textColor: '#ffffff',
    icon: ShoppingBag,
    desc: 'Supermarket e-Voucher redeemable at any Cargills FoodCity islandwide.',
  },
  {
    id: 'p-4',
    label: 'LKR 500 Reload',
    shortText: 'LKR 500 Mobile Reload Voucher',
    voucherName: 'Dialog Mobile LKR 500 Prepaid Reload Pass',
    discountText: 'LKR 500 Instant Reload',
    category: 'Reloads',
    color: '#D97706', // Amber Gold
    textColor: '#ffffff',
    icon: Smartphone,
    desc: 'Direct LKR 500 credit to your 077 123 4567 Dialog prepaid connection.',
  },
  {
    id: 'p-5',
    label: '3M Dialog Play',
    shortText: '3 Months Free Dialog Play OTT',
    voucherName: 'Dialog Play 3-Month VIP Streaming Pass',
    discountText: '3 Months Free HBO GO & Prime Video',
    category: 'OTT',
    color: '#7C3AED', // Purple
    textColor: '#ffffff',
    icon: Tv,
    desc: 'Complimentary 3-month VIP access to HBO GO, Prime Video, and SonyLIV.',
  },
  {
    id: 'p-6',
    label: '+1,000 Pts Jackpot',
    shortText: '+1,000 Star Points Jackpot',
    pointsBonus: 1000,
    category: 'Points',
    color: '#EA580C', // Orange
    textColor: '#ffffff',
    icon: Trophy,
    desc: 'Jackpot loyalty bonus of 1,000 Star Points worth LKR 1,000.00 cash value.',
  },
  {
    id: 'p-7',
    label: 'LKR 100 KFC',
    shortText: 'LKR 100 KFC Dining Voucher',
    voucherName: 'KFC Sri Lanka LKR 100 Dining Voucher',
    discountText: 'LKR 100 Instant Dining Discount',
    category: 'Dining',
    color: '#E11D48', // Rose Red
    textColor: '#ffffff',
    icon: Utensils,
    desc: 'Instant QR discount pass valid across all KFC and Pizza Hut restaurants.',
  },
  {
    id: 'p-8',
    label: '500 FlySMILES',
    shortText: '500 Extra FlySMILES Air Miles',
    voucherName: 'SriLankan Airlines 500 FlySMILES Air Miles Pass',
    discountText: '500 Frequent Flyer Miles',
    category: 'Partners',
    color: '#2563EB', // Royal Blue
    textColor: '#ffffff',
    icon: Plane,
    desc: 'Convertible air miles credited to your SriLankan Airlines FlySMILES account.',
  },
];

export const PersonalizedGamification: React.FC<PersonalizedGamificationProps> = ({
  profile,
  onOpenRecharge,
  onOpenRedeem,
  onNavigateVouchers,
  onClaimSpinReward,
  onViewTierBenefits,
}) => {
  // Gamification 3-Step Tasks
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
      title: 'Spin Lucky Wheel & Claim Reward',
      desc: 'Spin for instant points, OTT passes or vouchers',
      completed: false,
      icon: RotateCw,
      actionText: 'Spin Wheel',
    },
    {
      id: 'task-3',
      title: 'Redeem Star Points / Partner Pass',
      desc: 'Use at least 500 points for bill, reload or voucher',
      completed: false,
      icon: Gift,
      actionText: 'Redeem Now',
    },
  ]);

  // Spin Wheel States
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activePrize, setActivePrize] = useState<SpinWheelPrize | null>(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [wonRewardsHistory, setWonRewardsHistory] = useState<
    { prize: SpinWheelPrize; wonAt: string; status: 'claimed' | 'pending' }[]
  >([]);
  const [loyaltyProgramTab, setLoyaltyProgramTab] = useState<'star-rewards' | 'club-vision'>('star-rewards');

  // Milestone points gap (Aligning with user script: "You are only 750 points away from your next reward level")
  const pointsAwayFromNext = 750;
  const currentThresholdProgress = 19250; // out of 20000
  const milestoneProgressPct = Math.round((currentThresholdProgress / 20000) * 100);

  const completedCount = tasks.filter((t) => t.completed).length;
  const streakProgressPercent = Math.round((completedCount / tasks.length) * 100);

  // Trigger Spin Action
  const handleSpinClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Pick a random prize index
    const randomIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const selectedPrize = WHEEL_PRIZES[randomIndex];

    // Calculate rotation angle to align chosen wedge with top pointer (270 deg / -90 deg)
    const segmentAngle = 360 / WHEEL_PRIZES.length;
    // Each segment i covers [i * segmentAngle, (i + 1) * segmentAngle]
    // The top needle is at 0 degrees. Center of slice i is at i * segmentAngle + segmentAngle / 2
    const targetSliceCenter = randomIndex * segmentAngle + segmentAngle / 2;
    const extraSpins = 6 * 360; // 6 full rotations for dramatic suspense
    const finalRotation = rotationAngle + extraSpins + (360 - (targetSliceCenter % 360));

    setRotationAngle(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setActivePrize(selectedPrize);
      setShowPrizeModal(true);

      // Record in history
      const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setWonRewardsHistory((prev) => [{ prize: selectedPrize, wonAt: nowTime, status: 'pending' }, ...prev]);

      // Complete Task 2 automatically
      setTasks((prev) =>
        prev.map((t) => (t.id === 'task-2' ? { ...t, completed: true, actionText: 'Completed' } : t))
      );
    }, 3200);
  };

  // Claim and Redeem Prize
  const handleClaimPrize = (prize: SpinWheelPrize) => {
    if (onClaimSpinReward) {
      onClaimSpinReward({
        title: prize.shortText,
        pointsBonus: prize.pointsBonus,
        voucherName: prize.voucherName,
        discountText: prize.discountText,
        category: prize.category,
      });
    }

    // Update prize status in session history
    setWonRewardsHistory((prev) =>
      prev.map((item) => (item.prize.id === prize.id ? { ...item, status: 'claimed' } : item))
    );

    setShowPrizeModal(false);
  };

  const handleTaskAction = (taskId: string) => {
    if (taskId === 'task-1') {
      onOpenRecharge();
    } else if (taskId === 'task-2') {
      handleSpinClick();
    } else if (taskId === 'task-3') {
      onOpenRedeem();
      setTasks((prev) =>
        prev.map((t) => (t.id === 'task-3' ? { ...t, completed: true, actionText: 'Completed' } : t))
      );
    }
  };

  return (
    <section id="gamification-section" className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. PROGRESSION FRAMEWORK: WHERE AM I TODAY? WHAT HAVE I EARNED? WHAT NEXT? */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden">
        {/* Section Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0B2545] via-[#0F3560] to-slate-900 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
              Progression & Gamification
            </span>
            <span className="text-gray-300 text-xs hidden sm:inline">•</span>
            <span className="text-gray-300 text-xs font-medium hidden sm:inline">
              Interactive Loyalty Journey & Goal Tracking
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            Customer Loyalty Progression & Rewards
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
            Every recharge, eligible payment, and interaction contributes toward a visible goal — giving you a reason to remain continuously engaged.
          </p>
        </div>

        {/* The Three Essential Customer Questions (Where am I today? What have I earned? What can I unlock next?) */}
        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 bg-slate-50/70 border-b border-gray-200/80">
          {/* 1. Where am I today? */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col justify-between space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Question 1
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-bold text-[10px]">
                  Active Member
                </span>
              </div>
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                <span className="text-base">📍</span> Where am I today?
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Your current standing across Dialog loyalty programmes.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Current Status:</span>
                <span className="font-black text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md text-[11px] flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                  {profile.tier} Tier Member
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Programmes Enrolled:</span>
                <span className="font-bold text-gray-800 text-[11px]">Star Rewards & Club Vision</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Active Balance:</span>
                <span className="font-black text-red-600 font-mono text-xs">
                  {profile.pointsBalance.toLocaleString()} Pts (LKR {profile.pointsBalance.toLocaleString()})
                </span>
              </div>
            </div>
          </div>

          {/* 2. What have I earned? */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col justify-between space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Question 2
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[10px]">
                  Accumulated Value
                </span>
              </div>
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                <span className="text-base">🎁</span> What have I earned?
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Total loyalty points, benefits, and vouchers accrued to date.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Lifetime Points Earned:</span>
                <span className="font-black text-emerald-700 font-mono text-[11px]">13,850 Star Points</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Earned This Month:</span>
                <span className="font-bold text-gray-800 text-[11px]">+{profile.earnedThisMonth.toLocaleString()} Pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Partner Vouchers Unlocked:</span>
                <span className="font-bold text-blue-700 text-[11px]">6 Active Partner Passes</span>
              </div>
            </div>
          </div>

          {/* 3. What can I unlock next? (Goal Highlight) */}
          <div className="bg-gradient-to-br from-amber-500/10 via-red-500/5 to-white rounded-2xl p-4 sm:p-5 border-2 border-amber-400/80 shadow-md flex flex-col justify-between space-y-3 relative overflow-hidden group">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-400/20 rounded-full blur-lg pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#ED1C24] bg-red-100 px-2 py-0.5 rounded-full">
                  Question 3 • The Next Goal
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase animate-pulse">
                  Next Tier Milestone
                </span>
              </div>
              <h3 className="text-sm font-black text-[#0B2545] flex items-center gap-1.5">
                <span className="text-base">🚀</span> What can I unlock next?
              </h3>
              <div className="mt-1.5 p-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-[#0B2545]">
                <p className="text-xs font-black leading-snug">
                  "You are only <span className="text-red-600 underline font-black">{pointsAwayFromNext} points away</span> from your next reward level."
                </p>
              </div>
            </div>

            {/* Visual Status -> Next Tier Flow */}
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex items-center justify-between text-[11px] font-extrabold text-gray-800">
                <span>Current: Gold Tier</span>
                <span className="text-[#ED1C24] flex items-center gap-1">
                  Next: Platinum & Club Vision Silver <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              {/* Live Progress Bar */}
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden p-0.5 border border-gray-300">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-[#ED1C24] to-red-600 rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${milestoneProgressPct}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-gray-500">
                <span>19,250 Pts</span>
                <span className="font-bold text-red-600">Goal: 20,000 Pts ({milestoneProgressPct}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Programme Value Communication: Star Rewards vs Club Vision */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#ED1C24]" />
                Dialog Multi-Tier Programmes Progression
              </h4>
              <p className="text-xs text-gray-600 mt-0.5">
                Dialog has multiple loyalty programmes including <strong>Star Rewards</strong> and <strong>Club Vision</strong>.
              </p>
            </div>

            {/* Program Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setLoyaltyProgramTab('star-rewards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  loyaltyProgramTab === 'star-rewards'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                ⭐ Star Rewards (Points)
              </button>
              <button
                type="button"
                onClick={() => setLoyaltyProgramTab('club-vision')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  loyaltyProgramTab === 'club-vision'
                    ? 'bg-white text-[#0B2545] shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                👑 Club Vision (VIP)
              </button>
            </div>
          </div>

          {/* Tab 1: Star Rewards Track */}
          {loyaltyProgramTab === 'star-rewards' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-100/70 border border-gray-200 text-gray-600 text-xs space-y-1 opacity-70">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-gray-700">Silver Tier</span>
                  <span className="text-[10px] font-bold text-gray-400">0 - 5,000 Pts</span>
                </div>
                <p className="text-[11px] text-gray-500">1.0x earn rate • Basic partner discounts</p>
                <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 pt-1">
                  <Check className="w-3 h-3" /> Completed Milestone
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-400 text-amber-950 text-xs space-y-1 relative shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-black text-amber-900 flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                    Gold Tier (Current)
                  </span>
                  <span className="text-[10px] font-black text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-amber-900 leading-snug">
                  1.5x earn rate • 15% partner passes • Birthday bonus points
                </p>
                <div className="text-[10px] text-amber-800 font-bold flex items-center gap-1 pt-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> 750 points away from Platinum
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 text-purple-950 text-xs space-y-1 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-purple-900">Platinum Tier</span>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    Next Tier
                  </span>
                </div>
                <p className="text-[11px] text-purple-900 leading-snug">
                  2.0x earn rate • Free airport lounge • Priority customer care
                </p>
                <div className="text-[10px] text-purple-700 font-bold flex items-center gap-1 pt-1">
                  <TrendingUp className="w-3 h-3 text-purple-600" /> Unlock at 20,000 Points
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Club Vision VIP Track */
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-slate-50 border border-gray-200 text-gray-700 text-xs space-y-1">
                <div className="font-bold text-gray-900">CV Silver</div>
                <p className="text-[10px] text-gray-500">Dedicated hotline, merchant privileges.</p>
                <span className="text-[10px] font-bold text-emerald-600">Eligible on next reload</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
                <div className="font-bold text-amber-900">CV Gold</div>
                <p className="text-[10px] text-gray-600">Priority bill credit, airport lounge passes.</p>
              </div>
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 text-xs space-y-1">
                <div className="font-bold text-purple-900">CV Platinum</div>
                <p className="text-[10px] text-gray-600">Dedicated relationship manager, VIP invites.</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 text-white border border-gray-800 text-xs space-y-1">
                <div className="font-black text-amber-300">CV Black (Ultra VIP)</div>
                <p className="text-[10px] text-gray-300">Concierge services, bespoke global benefits.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ADVANCED INTERACTIVE SPIN-THE-WHEEL & INSTANT REDEMPTION EXPERIENCE   */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#0B2545] text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-amber-500/30 relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/20 via-red-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-purple-600/15 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Challenge Overview & Streak Sprint (7 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                Personalized Loyalty Streak Sprint
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-[10px] font-bold">
                <Clock className="w-3 h-3" />
                Weekly Reset in 4 Days
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              🔥 Spin the Lucky Wheel to unlock bonus Star Points, OTT streaming passes, and instant vouchers!
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Every recharge or qualifying action brings you closer to your next tier. Complete your 3-step sprint and spin the interactive wheel to earn immediate redeemable rewards.
            </p>

            {/* Streak Sprint Progress Bar */}
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300 font-medium">
                  Sprint Completion: <strong className="text-amber-300 font-bold">{completedCount} of {tasks.length} Completed</strong>
                </span>
                <span className="font-mono font-bold text-amber-400">{streakProgressPercent}%</span>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${streakProgressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                <span>Streak Reward:</span>
                <span className="font-bold text-amber-300">+500 Points + LKR 250 FoodCity Voucher</span>
              </div>
            </div>

            {/* 3 Step Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {tasks.map((task, idx) => {
                const Icon = task.icon;
                return (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                      task.completed
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-white'
                        : 'bg-slate-800/60 border-slate-700/80 hover:border-amber-400/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase text-gray-400">Step {idx + 1}</span>
                        {task.completed && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300">
                            Done
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-white line-clamp-1">{task.title}</div>
                      <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{task.desc}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTaskAction(task.id)}
                      className={`mt-2.5 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        task.completed
                          ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-xs'
                      }`}
                    >
                      <span>{task.actionText}</span>
                      {!task.completed && <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Interactive 8-Segment Spin-the-Wheel (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">
            {/* The Spin Wheel Canvas Container */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer Golden Glow & Border Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.35)] pointer-events-none" />

              {/* Decorative Wheel Lights/Dots */}
              <div className="absolute inset-1 rounded-full border border-dashed border-amber-300/40 pointer-events-none" />

              {/* Top Pointer Needle (Positioned at 12 o'clock pointing down) */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none drop-shadow-md">
                <div className="w-6 h-6 bg-gradient-to-b from-amber-300 to-amber-500 rotate-45 rounded-sm border-2 border-slate-900 shadow-lg" />
              </div>

              {/* Rotating Wheel Graphic (SVG) */}
              <div
                className="w-full h-full rounded-full overflow-hidden transition-transform ease-out"
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  transitionDuration: isSpinning ? '3.2s' : '0s',
                  transitionTimingFunction: 'cubic-bezier(0.15, 0.9, 0.2, 1)',
                }}
              >
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <g transform="translate(200, 200)">
                    {WHEEL_PRIZES.map((prize, i) => {
                      const totalSlices = WHEEL_PRIZES.length;
                      const sliceAngle = 360 / totalSlices;
                      const startAngle = i * sliceAngle - 90;
                      const endAngle = (i + 1) * sliceAngle - 90;

                      // Convert to radians for path
                      const startRad = (startAngle * Math.PI) / 180;
                      const endRad = (endAngle * Math.PI) / 180;
                      const r = 200;

                      const x1 = r * Math.cos(startRad);
                      const y1 = r * Math.sin(startRad);
                      const x2 = r * Math.cos(endRad);
                      const y2 = r * Math.sin(endRad);

                      const pathData = `M 0 0 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
                      const textAngle = startAngle + sliceAngle / 2;

                      return (
                        <g key={prize.id}>
                          {/* Wedge Slice */}
                          <path
                            d={pathData}
                            fill={prize.color}
                            stroke="#0f172a"
                            strokeWidth="2.5"
                          />
                          {/* Wedge Text & Icon representation */}
                          <g transform={`rotate(${textAngle}) translate(115, 0)`}>
                            <text
                              x="0"
                              y="4"
                              fill={prize.textColor}
                              fontSize="12"
                              fontWeight="900"
                              textAnchor="middle"
                              transform="rotate(90)"
                              className="font-sans select-none tracking-tight"
                            >
                              {prize.label}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* Center Hub Button */}
              <button
                type="button"
                onClick={handleSpinClick}
                disabled={isSpinning}
                className="absolute z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 border-4 border-slate-900 text-slate-950 flex flex-col items-center justify-center font-black text-xs shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all disabled:opacity-80 disabled:cursor-not-allowed group"
                aria-label="Spin the wheel"
              >
                <RotateCw className={`w-5 h-5 mb-0.5 ${isSpinning ? 'animate-spin' : 'group-hover:rotate-45'} transition-transform`} />
                <span>{isSpinning ? 'SPINNING' : 'SPIN NOW'}</span>
              </button>
            </div>

            {/* Spin CTA Button & Info text */}
            <div className="text-center space-y-2 max-w-xs">
              <button
                type="button"
                onClick={handleSpinClick}
                disabled={isSpinning}
                className="w-full py-2.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950 fill-current" />
                <span>{isSpinning ? 'Spinning...' : 'Spin for Instant Rewards'}</span>
              </button>
              <p className="text-[11px] text-gray-400">
                100% Guaranteed Reward on every spin • Claim instantly to balance or wallet.
              </p>
            </div>
          </div>
        </div>

        {/* Won Rewards Tray (History & Direct Redeem Trigger) */}
        {wonRewardsHistory.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                Your Unlocked Spin Rewards (Session)
              </span>
              <button
                type="button"
                onClick={onNavigateVouchers}
                className="text-xs text-gray-300 hover:text-white underline font-semibold cursor-pointer"
              >
                View in My Vouchers →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {wonRewardsHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-black text-white truncate">{item.prize.shortText}</div>
                    <div className="text-[10px] text-gray-400">Won at {item.wonAt}</div>
                  </div>

                  {item.status === 'claimed' ? (
                    <span className="px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold shrink-0 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Claimed
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleClaimPrize(item.prize)}
                      className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black shrink-0 transition-colors cursor-pointer"
                    >
                      Redeem Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. SPIN REWARD CELEBRATION & REDEMPTION MODAL                             */}
      {/* ========================================================================= */}
      {showPrizeModal && activePrize && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowPrizeModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative text-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Celebration Header */}
            <div className="bg-gradient-to-r from-[#0B2545] via-slate-900 to-[#ED1C24] text-white p-6 text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg ring-4 ring-white/20">
                <Trophy className="w-8 h-8 fill-current" />
              </div>

              <span className="px-3 py-1 rounded-full bg-white/20 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                🎉 Congratulations!
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                You Won {activePrize.shortText}!
              </h3>

              <p className="text-xs text-gray-200 mt-1">
                {activePrize.desc}
              </p>
            </div>

            {/* Prize Details & Action Buttons */}
            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Reward Category:</span>
                  <span className="font-bold text-gray-900">{activePrize.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Delivery:</span>
                  <span className="font-bold text-emerald-700">Instant Digital Wallet Credit</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Redemption Value:</span>
                  <span className="font-black text-red-600">
                    {activePrize.pointsBonus
                      ? `+${activePrize.pointsBonus} Star Points`
                      : activePrize.discountText || 'Exclusive Voucher'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleClaimPrize(activePrize)}
                  className="w-full py-3 px-4 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  <span>Claim & Redeem Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleClaimPrize(activePrize);
                    onNavigateVouchers();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Save to My Vouchers & View Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
