import React from 'react';
import { GOLD_TIER_BENEFITS } from '../data/mockData';
import { Crown, ShoppingBag, Flame, TrendingUp, ChevronRight, Award } from 'lucide-react';

interface GoldTierBenefitsProps {
  onExploreAllBenefits: () => void;
}

export const GoldTierBenefits: React.FC<GoldTierBenefitsProps> = ({
  onExploreAllBenefits,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-5 h-5 text-amber-500" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#ED1C24]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      default:
        return <Award className="w-5 h-5 text-amber-500" />;
    }
  };

  const getIconBg = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return 'bg-amber-50 border-amber-200';
      case 'ShoppingBag':
        return 'bg-emerald-50 border-emerald-200';
      case 'Flame':
        return 'bg-red-50 border-red-200';
      case 'TrendingUp':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7" id="tier-benefits-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              ★ Gold Perks
            </span>
          </div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight mt-1">
            Your Gold Tier Benefits
          </h3>
        </div>

        <button
          type="button"
          onClick={onExploreAllBenefits}
          id="btn-explore-all-benefits-link"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ED1C24] hover:text-[#C9141B] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>Explore All Benefits</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GOLD_TIER_BENEFITS.map((benefit) => (
          <div
            key={benefit.id}
            onClick={onExploreAllBenefits}
            className="rounded-2xl p-5 border border-gray-200/90 bg-gradient-to-b from-slate-50/50 to-white hover:border-amber-300 hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${getIconBg(benefit.iconName)} group-hover:scale-105 transition-transform`}>
                  {getIcon(benefit.iconName)}
                </div>

                {benefit.highlightTag && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full">
                    {benefit.highlightTag}
                  </span>
                )}
              </div>

              <h4 className="text-base font-bold text-gray-900 mt-4 leading-snug group-hover:text-amber-700 transition-colors">
                {benefit.title}
              </h4>

              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                {benefit.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-bold text-amber-700 flex items-center justify-between">
              <span>Active for Priya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
