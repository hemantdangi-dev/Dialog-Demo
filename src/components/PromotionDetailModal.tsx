import React from 'react';
import { PromotionItem } from '../types';
import { X, Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${promotion.tagColor}`}>
              {promotion.tag}
            </span>
          </div>

          <h3 className="text-xl font-black text-white">
            {promotion.title}
          </h3>

          <p className="text-xs text-amber-300 font-semibold mt-1">
            {promotion.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {promotion.description}
          </p>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between text-amber-900">
              <span className="font-bold">Offer Validity</span>
              <span className="font-semibold">Until {promotion.endsDate}</span>
            </div>
            <div className="flex items-center justify-between text-amber-900">
              <span className="font-bold">Target Members</span>
              <span className="font-semibold">Gold & Platinum Tier</span>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Eligibility & How It Works
            </h5>
            <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
              {promotion.terms.map((term, i) => (
                <li key={i}>{term}</li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onParticipate(promotion);
                onClose();
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Recharge & Claim Offer
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
