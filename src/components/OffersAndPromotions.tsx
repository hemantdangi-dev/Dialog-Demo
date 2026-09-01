import React, { useState } from 'react';
import { PROMOTIONS } from '../data/mockData';
import { PromotionItem } from '../types';
import {
  Percent,
  Sparkles,
  Zap,
  Gift,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Smartphone,
  Tv,
  ChevronRight,
  Tag,
  ShieldCheck,
  Flame,
  Info
} from 'lucide-react';

interface OffersAndPromotionsProps {
  onSelectPromotion: (promo: PromotionItem) => void;
}

export const OffersAndPromotions: React.FC<OffersAndPromotionsProps> = ({
  onSelectPromotion,
}) => {
  const [filterCategory, setFilterCategory] = useState<'All' | 'Bonus' | 'Reloads' | 'Partners'>('All');

  const filteredPromotions = PROMOTIONS.filter(
    (p) => filterCategory === 'All' || p.category === filterCategory
  );

  const getPromoIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-600" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-purple-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-red-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Gift':
        return <Gift className="w-5 h-5 text-indigo-500" />;
      default:
        return <Percent className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-5 sm:p-7 space-y-6" id="promotions-section">
      {/* 1. Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#ED1C24]">
              Active Campaigns & Bonuses
            </span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md">
              Live Promos
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-1">
            Offers & Promotions
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Boost your Star Points balance with current seasonal bonuses and partner campaigns.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Bonus', 'Reloads', 'Partners'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'All' ? 'All Promotions' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Promotions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredPromotions.map((promo) => {
          const isFeatured = promo.id.startsWith('PROMO-PAY-') || promo.id.startsWith('PROMO-ANNUAL-');

          return (
            <div
              key={promo.id}
              onClick={() => onSelectPromotion(promo)}
              className={`rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between group relative ${
                isFeatured
                  ? 'bg-gradient-to-b from-slate-50/90 via-white to-white border-gray-200 hover:border-emerald-500 hover:shadow-md ring-1 ring-black/5'
                  : 'bg-white border-gray-200 hover:border-red-300 hover:shadow-xs'
              }`}
            >
              {/* Top Accent Ribbon for featured */}
              {isFeatured && (
                <div className={`h-1.5 w-full ${promo.id.includes('PHONE') ? 'bg-emerald-600' : 'bg-purple-600'}`} />
              )}

              <div className="p-5 sm:p-6 space-y-4">
                {/* Visual Header matching uploaded image */}
                <div className="flex items-start gap-3">
                  {/* Circular Green Icon with % */}
                  <div className="w-10 h-10 rounded-full bg-[#006039] text-white flex items-center justify-center shrink-0 shadow-xs ring-4 ring-emerald-50">
                    <Percent className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-gray-500 block leading-tight">
                      Promotion
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-[#0B2545] leading-snug group-hover:text-blue-700 transition-colors">
                      {promo.title}
                    </h4>
                  </div>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {promo.description}
                </p>

                {/* Campaign Metadata Table matching screenshot structure */}
                <div className="bg-slate-50/90 rounded-xl border border-gray-200/80 p-3 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      Campaign
                    </span>
                    <span className="text-xs font-bold text-gray-800 truncate block mt-0.5" title={promo.campaignName || promo.title}>
                      {promo.campaignName || 'Star Points Promo'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      Start Date
                    </span>
                    <span className="text-xs font-semibold text-gray-700 font-mono block mt-0.5">
                      {promo.startDate || '01/09/2026'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      End Date
                    </span>
                    <span className="text-xs font-bold text-[#ED1C24] font-mono block mt-0.5">
                      {promo.endsDate}
                    </span>
                  </div>
                </div>

                {/* Bonus Tags and Rewards */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {promo.multiplier && (
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{promo.multiplier}</span>
                    </span>
                  )}

                  {promo.bonusReward && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 inline-flex items-center gap-1">
                      <Tag className="w-3 h-3 text-blue-600" />
                      <span className="truncate max-w-[200px] sm:max-w-none">{promo.bonusReward}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 sm:px-6 py-3.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500">
                  Gold & Platinum Privilege
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPromotion(promo);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <span>{promo.ctaText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Promotional Terms Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Points multiplier campaigns credit automatically within 24 to 48 hours of transaction completion.
          </span>
        </div>

        <span className="text-[11px] text-gray-400 font-mono">
          Dialog Axiata PLC Loyalty Engine
        </span>
      </div>
    </section>
  );
};
