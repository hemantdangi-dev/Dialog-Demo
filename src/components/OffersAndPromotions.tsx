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
  const [filterCategory, setFilterCategory] = useState<'All' | 'Bonus' | 'Reloads'>('All');

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
          {(['All', 'Bonus', 'Reloads'] as const).map((cat) => (
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {filteredPromotions.map((promo) => {
          return (
            <div
              key={promo.id}
              onClick={() => onSelectPromotion(promo)}
              className="rounded-2xl border border-gray-200 bg-white hover:border-red-400 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group relative"
            >
              {/* Promotion Banner Image */}
              {promo.imageUrl && (
                <div className="relative w-full aspect-16/9 bg-slate-900 overflow-hidden border-b border-gray-100">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {promo.multiplier && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white text-[11px] font-black shadow-md flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      <span>{promo.multiplier}</span>
                    </div>
                  )}
                  {promo.tag && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase">
                      {promo.tag}
                    </div>
                  )}
                </div>
              )}

              <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#006039] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Percent className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-800">
                      Dialog Star Points Promo
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-black text-[#0B2545] leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                    {promo.title}
                  </h4>

                  <p className="text-xs text-gray-600 leading-relaxed mt-1 line-clamp-2">
                    {promo.subtitle || promo.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Campaign Metadata */}
                  <div className="bg-slate-50 rounded-xl border border-gray-100 p-2.5 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block">Valid Until</span>
                      <span className="text-[11px] font-bold text-red-600 font-mono block">{promo.endsDate}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-bold text-gray-400 block">Reward Type</span>
                      <span className="text-[11px] font-black text-emerald-700 block truncate">{promo.multiplier || 'Bonus'}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-500">
                      Tap to view details
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPromotion(promo);
                      }}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gray-900 hover:bg-[#ED1C24] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <span>{promo.ctaText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
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

        <span className="text-[11px] text-gray-500 font-medium">
          Dialog Axiata PLC • Star Points Rewards
        </span>
      </div>
    </section>
  );
};
