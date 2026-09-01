import React from 'react';
import { CustomerProfile } from '../types';
import { Award, ArrowRight, Shield, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

interface LoyaltyMembershipOverviewProps {
  profile: CustomerProfile;
  onViewTierBenefits: () => void;
  onRedeemPoints: () => void;
}

export const LoyaltyMembershipOverview: React.FC<LoyaltyMembershipOverviewProps> = ({
  profile,
  onViewTierBenefits,
  onRedeemPoints,
}) => {
  // Progress calculation towards Platinum (20,000 pts) from Gold start (5,000 pts)
  const rangeTotal = profile.nextTierThreshold - profile.currentTierMin; // 15,000
  const progressInTier = profile.pointsBalance - profile.currentTierMin; // 7,450
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((progressInTier / rangeTotal) * 100))
  );

  return (
    <section
      className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-gray-800"
      id="loyalty-membership-section"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/20 via-red-500/15 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-600/10 to-transparent rounded-full blur-2xl pointer-events-none -ml-16 -mb-16" />

      <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-gray-950 font-black shadow-md shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Dialog Loyalty Program
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Star Points Membership
              </h2>
            </div>
          </div>

          {/* Current Tier Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 border border-amber-400/50 rounded-2xl px-4 py-2 flex items-center gap-2.5 backdrop-blur-xs">
              <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]" />
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-300/80 leading-none">
                  Current Tier
                </div>
                <div className="text-sm sm:text-base font-black text-amber-300 leading-tight">
                  {profile.tier} Member
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onViewTierBenefits}
              id="btn-view-tier-benefits-header"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            >
              <span>Benefits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Stat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primary: Current Points */}
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-xs relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Current Points Balance
                </span>
                <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  Available for redemption
                </span>
              </div>

              <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {profile.pointsBalance.toLocaleString()}
                </span>
                <span className="text-lg sm:text-xl font-bold text-amber-400">
                  Star Points
                </span>
              </div>

              <div className="mt-1 text-xs text-gray-400 flex items-center gap-2">
                <span>Equivalent Cash Value:</span>
                <strong className="text-white font-bold text-sm">
                  Rs. {profile.pointsBalance.toLocaleString()}.00 LKR
                </strong>
                <span className="text-gray-500">(1 Pt = Rs. 1.00)</span>
              </div>
            </div>

            {/* Progress to Next Tier */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                <span className="font-semibold text-gray-300">
                  Progress to <strong className="text-indigo-300">{profile.nextTier}</strong>
                </span>
                <span className="font-mono font-bold text-amber-300">
                  {profile.pointsBalance.toLocaleString()} / {profile.nextTierThreshold.toLocaleString()} points
                </span>
              </div>

              {/* Progress Bar with Gradient */}
              <div className="w-full h-3.5 bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 transition-all duration-700 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1 text-amber-200">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <strong>{profile.pointsToNextTier.toLocaleString()} points needed</strong> to reach Platinum
                </span>
                <span className="text-gray-400">
                  {progressPercent}% Complete
                </span>
              </div>
            </div>
          </div>

          {/* Secondary: Expiry & Quick Action Card */}
          <div className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-4 h-4 text-amber-400" />
                Points Expiring Soon
              </div>

              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black text-amber-300">
                  {profile.pointsExpiringSoon.toLocaleString()} <span className="text-sm font-semibold text-gray-300">points</span>
                </div>
                <p className="text-xs text-gray-300 mt-1 font-medium">
                  Expire in <strong className="text-white">{profile.expiryDays} days</strong> ({profile.expiryDateFormatted})
                </p>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-gray-300">
                Earn 1.5x accelerated points on all Dialog mobile reloads as a Gold tier member.
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onRedeemPoints}
                id="btn-redeem-points-hero"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-gray-950" />
                Redeem Available Points
              </button>

              <button
                type="button"
                onClick={onViewTierBenefits}
                id="btn-view-tier-benefits-cta"
                className="w-full py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Tier Benefits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
