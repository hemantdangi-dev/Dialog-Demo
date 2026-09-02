import React from 'react';
import { PromotionItem } from '../types';
import {
  X,
  Sparkles,
  CheckCircle2,
  Percent,
  Calendar,
  Gift,
  Store,
  Smartphone,
  CreditCard,
  Tag,
  Tv,
  Star,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface PromotionDetailModalProps {
  promotion: PromotionItem | null;
  onClose: () => void;
  onParticipate: (promo: PromotionItem) => void;
}

export const PromotionDetailModal: React.FC<PromotionDetailModalProps> = ({
  promotion,
  onClose,
  onParticipate,
}) => {
  if (!promotion) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Visual Banner Picture */}
        {promotion.imageUrl && (
          <div className="relative w-full aspect-16/9 bg-slate-950 overflow-hidden shrink-0 border-b border-gray-200">
            <img
              src={promotion.imageUrl}
              alt={promotion.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {promotion.bannerTagline && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-amber-300 font-black text-[10px] sm:text-xs tracking-wider uppercase border border-amber-300/30">
                {promotion.bannerTagline}
              </div>
            )}
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Header Title Section */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ED1C24] text-white text-[10px] font-black uppercase tracking-wider">
                {promotion.tag}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500 font-semibold text-xs">
                {promotion.campaignName || 'Campaign Offer'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#0B2545] leading-tight">
              {promotion.title}
            </h3>

            <p className="text-xs sm:text-sm font-bold text-red-600 mt-1">
              {promotion.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-gray-100">
            {promotion.description}
          </p>

          {/* Why You'll Love It / Key Highlights */}
          {promotion.whyLoveIt && promotion.whyLoveIt.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#ED1C24] text-white text-[10px] font-black uppercase tracking-wider">
                  Why You'll Love It
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {promotion.whyLoveIt.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-gradient-to-br from-red-50/50 via-white to-amber-50/40 border border-red-100 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-red-100 text-[#ED1C24] flex items-center justify-center font-bold text-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-black text-gray-900 text-xs">{item.title}</span>
                    </div>
                    <span className="text-[11px] text-gray-600 leading-snug">{item.subtitle}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Eligible Data Packs list (for 2X points promo) */}
          {promotion.eligiblePacks && promotion.eligiblePacks.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#ED1C24] text-white text-[10px] font-black uppercase tracking-wider">
                  Eligible Data Packs
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {promotion.eligiblePacks.map((pack, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-gray-200 flex items-center gap-2 font-bold text-gray-800 text-[11px]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{pack}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4-Step How It Works Flow Pipeline */}
          {promotion.howItWorksSteps && promotion.howItWorksSteps.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#0B2545] text-white text-[10px] font-black uppercase tracking-wider">
                  How It Works
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                {promotion.howItWorksSteps.map((stepItem) => (
                  <div
                    key={stepItem.step}
                    className="p-3 rounded-xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between space-y-1.5 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-[#ED1C24] text-white flex items-center justify-center font-black text-xs">
                        {stepItem.step}
                      </span>
                      <span className="text-[10px] font-bold uppercase text-gray-400">Step {stepItem.step}</span>
                    </div>
                    <div>
                      <div className="font-extrabold text-gray-900 text-xs">{stepItem.title}</div>
                      <div className="text-[11px] text-gray-600 leading-snug mt-0.5">{stepItem.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Slogan Footer Banner matching original graphics */}
          {promotion.footerSlogan && (
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-900 via-indigo-900 to-black text-white flex items-center gap-2.5 shadow-sm">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
              <span className="font-black text-xs sm:text-sm tracking-wide text-amber-300 uppercase">
                {promotion.footerSlogan}
              </span>
            </div>
          )}

          {/* Campaign Metadata Details */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-gray-200 space-y-2.5">
            <div className="grid grid-cols-2 gap-3 pb-2 border-b border-gray-200">
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  Campaign Name
                </span>
                <span className="text-xs font-bold text-gray-900 block mt-0.5">
                  {promotion.campaignName || promotion.title}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  Reward Value
                </span>
                <span className="text-xs font-black text-emerald-700 block mt-0.5">
                  {promotion.multiplier || 'Special Bonus'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  Start Date
                </span>
                <span className="text-xs font-semibold text-gray-700 font-mono block mt-0.5">
                  {promotion.startDate || '01/09/2026'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-gray-400 block">
                  Valid Until
                </span>
                <span className="text-xs font-bold text-[#ED1C24] font-mono block mt-0.5">
                  {promotion.endsDate}
                </span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h5 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2">
              Eligibility & Promotion Terms (*T&C Apply)
            </h5>
            <ul className="space-y-1.5 text-gray-600 list-disc list-inside">
              {promotion.terms.map((term, i) => (
                <li key={i} className="leading-normal">{term}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onParticipate(promotion);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>{promotion.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
