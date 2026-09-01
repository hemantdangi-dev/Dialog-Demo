import React from 'react';
import { PromotionItem } from '../types';
import {
  X,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  Percent,
  Calendar,
  Layers,
  ShoppingBag,
  Gift,
  ShieldCheck,
  Tag,
  Store
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B2545] text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-[#006039] text-white flex items-center justify-center shadow-xs">
              <Percent className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
                Campaign Promotion
              </span>
              <span className="text-xs text-gray-300 font-mono">
                {promotion.campaignName || 'Campaign Details'}
              </span>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white leading-snug mt-1">
            {promotion.title}
          </h3>

          <p className="text-xs text-amber-300 font-semibold mt-1">
            {promotion.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {promotion.description}
          </p>

          {/* Campaign Metadata Table matching screenshot */}
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
                  Bonus Multiplier
                </span>
                <span className="text-xs font-black text-emerald-700 block mt-0.5">
                  {promotion.multiplier || 'Bonus Reward'}
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
                  End Date
                </span>
                <span className="text-xs font-bold text-[#ED1C24] font-mono block mt-0.5">
                  {promotion.endsDate}
                </span>
              </div>
            </div>
          </div>

          {/* Eligible Channels */}
          {promotion.channels && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-gray-500" />
                <span>Eligible Touchpoints & Channels</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {promotion.channels.map((channel, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-medium border border-gray-200"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
          <div>
            <h5 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2">
              Eligibility & Promotion Terms
            </h5>
            <ul className="space-y-1.5 text-gray-600 list-disc list-inside">
              {promotion.terms.map((term, i) => (
                <li key={i} className="leading-normal">{term}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Eligible for all active Dialog Star Points members. Auto-enrolled.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onParticipate(promotion);
                onClose();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Gift className="w-4 h-4" />
              <span>Claim & Proceed</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
