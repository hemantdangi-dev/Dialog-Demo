import React from 'react';
import { CustomerProfile } from '../types';
import { Sparkles, TrendingUp, Gift, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';

interface PointsSummaryCardsProps {
  profile: CustomerProfile;
  onViewPointsHistory: () => void;
}

export const PointsSummaryCards: React.FC<PointsSummaryCardsProps> = ({
  profile,
  onViewPointsHistory,
}) => {
  const cards = [
    {
      id: 'available',
      title: 'Available Points',
      value: profile.pointsBalance.toLocaleString(),
      unit: 'Star Points',
      helper: 'Active & ready for instant checkout',
      icon: Sparkles,
      iconBg: 'bg-red-50 text-[#ED1C24] border-red-100',
      borderAccent: 'hover:border-red-300',
      tag: '1 Pt = LKR 1.00',
      tagBg: 'bg-red-50 text-[#ED1C24]',
    },
    {
      id: 'earned',
      title: 'Earned This Month',
      value: profile.earnedThisMonth.toLocaleString(),
      unit: 'Star Points',
      helper: 'Recharges, bills & partner transactions',
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      borderAccent: 'hover:border-emerald-300',
      trendText: `+${profile.growthRatePercent}% vs last month`,
      trendPositive: true,
      tagBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'redeemed',
      title: 'Redeemed Total',
      value: profile.redeemedTotal.toLocaleString(),
      unit: 'Star Points',
      helper: 'Used for reloads & partner vouchers',
      icon: Gift,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      borderAccent: 'hover:border-purple-300',
      tag: '4 Transactions',
      tagBg: 'bg-purple-50 text-purple-700',
    },
    {
      id: 'expiring',
      title: 'Expiring Soon',
      value: profile.pointsExpiringSoon.toLocaleString(),
      unit: 'Star Points',
      helper: `Valid until ${profile.expiryDateFormatted}`,
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      borderAccent: 'hover:border-amber-300',
      tag: `${profile.expiryDays} Days Left`,
      tagBg: 'bg-amber-50 text-amber-800',
    },
  ];

  return (
    <section className="flex flex-col gap-4" id="points-overview-section">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED1C24]">
            Balance Metrics
          </span>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Points Summary
          </h3>
        </div>

        <button
          type="button"
          onClick={onViewPointsHistory}
          id="btn-view-points-history"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ED1C24] hover:text-[#C9141B] transition-colors cursor-pointer"
        >
          <span>View Points History</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={onViewPointsHistory}
              className={`bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[148px] ${card.borderAccent}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">
                  {card.title}
                </span>
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${card.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="my-2">
                <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {card.value}
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">
                  {card.helper}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                {card.trendText ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    {card.trendText}
                  </span>
                ) : (
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${card.tagBg}`}>
                    {card.tag}
                  </span>
                )}
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
