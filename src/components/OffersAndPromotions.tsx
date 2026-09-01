import React from 'react';
import { PROMOTIONS } from '../data/mockData';
import { PromotionItem } from '../types';
import { Sparkles, Zap, Gift, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface OffersAndPromotionsProps {
  onSelectPromotion: (promo: PromotionItem) => void;
}

export const OffersAndPromotions: React.FC<OffersAndPromotionsProps> = ({
  onSelectPromotion,
}) => {
  const getIllustration = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-red-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Gift':
        return <Gift className="w-6 h-6 text-indigo-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7" id="promotions-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED1C24]">
            Campaigns & Bonuses
          </span>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Offers & Promotions
          </h3>
        </div>

        <span className="text-xs text-gray-500">
          Exclusive to Gold & Platinum members
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {PROMOTIONS.map((promo) => (
          <div
            key={promo.id}
            onClick={() => onSelectPromotion(promo)}
            className="rounded-2xl border border-gray-200/90 p-5 bg-gradient-to-b from-slate-50/50 to-white hover:border-red-300 hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Top Tag & Multiplier */}
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${promo.tagColor}`}>
                  {promo.tag}
                </span>

                {promo.multiplier && (
                  <span className="text-xs font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-mono">
                    {promo.multiplier}
                  </span>
                )}
              </div>

              {/* Icon & Title */}
              <div className="mt-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {getIllustration(promo.imageIllustration)}
                </div>

                <div>
                  <h4 className="text-base font-black text-gray-900 leading-tight group-hover:text-[#ED1C24] transition-colors">
                    {promo.title}
                  </h4>
                  <p className="text-xs text-gray-600 font-semibold mt-1">
                    {promo.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 mt-3 line-clamp-2">
                {promo.description}
              </p>

              {/* Validity */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 p-2 rounded-xl border border-gray-100">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>Ends: <strong className="text-gray-800">{promo.endsDate}</strong></span>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-400">
                Terms Apply
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPromotion(promo);
                }}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <span>{promo.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
