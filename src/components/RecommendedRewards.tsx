import React from 'react';
import { RECOMMENDED_REWARDS } from '../data/mockData';
import { RecommendedReward } from '../types';
import { Sparkles, Gift, Smartphone, Utensils, ShoppingBag, ArrowRight } from 'lucide-react';

interface RecommendedRewardsProps {
  userPoints: number;
  onRedeemReward: (reward: RecommendedReward) => void;
  onViewReward: (reward: RecommendedReward) => void;
}

export const RecommendedRewards: React.FC<RecommendedRewardsProps> = ({
  userPoints,
  onRedeemReward,
  onViewReward,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Reload':
        return <Smartphone className="w-5 h-5 text-[#ED1C24]" />;
      case 'Dining':
        return <Utensils className="w-5 h-5 text-amber-600" />;
      case 'Shopping':
        return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
      default:
        return <Gift className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7" id="recommended-rewards-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED1C24]">
              Personalized
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-semibold">
              You have <strong className="text-gray-900">{userPoints.toLocaleString()} points</strong> available
            </span>
          </div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight mt-0.5">
            Recommended For You
          </h3>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
          ✓ All rewards affordable with your balance
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {RECOMMENDED_REWARDS.map((reward) => (
          <div
            key={reward.id}
            className="rounded-2xl border border-gray-200/90 p-5 bg-gradient-to-b from-slate-50/40 to-white hover:border-red-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Top Tag & Partner */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {reward.partnerName}
                </span>

                {reward.badge && (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-red-50 text-[#ED1C24] border border-red-200 px-2 py-0.5 rounded-full">
                    {reward.badge}
                  </span>
                )}
              </div>

              {/* Title & Icon */}
              <div className="mt-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {getCategoryIcon(reward.category)}
                </div>

                <div>
                  <h4 className="text-base font-black text-gray-900 leading-tight group-hover:text-[#ED1C24] transition-colors">
                    {reward.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {reward.description}
                  </p>
                </div>
              </div>

              {/* Points Cost Pill */}
              <div className="mt-4 bg-gray-50 p-3 rounded-xl border border-gray-200/80 flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-gray-400">Points Cost</div>
                  <div className="text-lg font-black text-gray-900">
                    {reward.pointsRequired.toLocaleString()} <span className="text-xs text-amber-600 font-bold">Star Points</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-gray-400">Value</div>
                  <div className="text-xs font-bold text-gray-700">
                    LKR {reward.originalLkrValue.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-5 pt-3 border-t border-gray-100">
              {reward.ctaText === 'Redeem Now' ? (
                <button
                  type="button"
                  onClick={() => onRedeemReward(reward)}
                  className="w-full py-2 px-4 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Redeem Now</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onViewReward(reward)}
                  className="w-full py-2 px-4 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>View Reward</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
