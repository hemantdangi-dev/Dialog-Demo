import React from 'react';
import { Smartphone, Gift, Ticket, Sparkles, ArrowUpRight } from 'lucide-react';

interface QuickActionsProps {
  onRechargeClick: () => void;
  onRedeemClick: () => void;
  onVouchersClick: () => void;
  onOffersClick: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onRechargeClick,
  onRedeemClick,
  onVouchersClick,
  onOffersClick,
}) => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" id="quick-actions-row">
      {/* 1. Recharge Mobile (Primary Prominent Dialog Red Action) */}
      <button
        type="button"
        onClick={onRechargeClick}
        id="quick-action-recharge"
        className="group relative overflow-hidden text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#ED1C24] to-[#C9141B] text-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98] border border-red-600/30 flex flex-col justify-between min-h-[112px]"
      >
        <div className="flex items-center justify-between w-full">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs text-white px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <span>+Points</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

        <div className="mt-2">
          <div className="text-base sm:text-lg font-black text-white leading-tight">
            Recharge Mobile
          </div>
          <p className="text-xs text-red-100 font-medium mt-0.5">
            Earn 1.5x Star Points instantly
          </p>
        </div>
      </button>

      {/* 2. Redeem Points (Prominent Gold / Amber Action) */}
      <button
        type="button"
        onClick={onRedeemClick}
        id="quick-action-redeem"
        className="group relative overflow-hidden text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98] border border-amber-600/30 flex flex-col justify-between min-h-[112px]"
      >
        <div className="flex items-center justify-between w-full">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
            <Gift className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs text-white px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <span>12.4k Pts</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

        <div className="mt-2">
          <div className="text-base sm:text-lg font-black text-white leading-tight">
            Redeem Points
          </div>
          <p className="text-xs text-amber-100 font-medium mt-0.5">
            Vouchers, reloads & bills
          </p>
        </div>
      </button>

      {/* 3. View Vouchers (Clean Card) */}
      <button
        type="button"
        onClick={onVouchersClick}
        id="quick-action-vouchers"
        className="group relative overflow-hidden text-left p-4 sm:p-5 rounded-2xl bg-white hover:bg-slate-50/80 border border-gray-200/90 text-gray-900 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer active:scale-[0.98] flex flex-col justify-between min-h-[112px]"
      >
        <div className="flex items-center justify-between w-full">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 shrink-0 group-hover:scale-110 transition-transform">
            <Ticket className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
            3 Active
          </span>
        </div>

        <div className="mt-2">
          <div className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-purple-700 transition-colors">
            View Vouchers
          </div>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Reload, dining & store coupons
          </p>
        </div>
      </button>

      {/* 4. Explore Offers (Clean Card) */}
      <button
        type="button"
        onClick={onOffersClick}
        id="quick-action-offers"
        className="group relative overflow-hidden text-left p-4 sm:p-5 rounded-2xl bg-white hover:bg-slate-50/80 border border-gray-200/90 text-gray-900 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer active:scale-[0.98] flex flex-col justify-between min-h-[112px]"
      >
        <div className="flex items-center justify-between w-full">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#ED1C24] shrink-0 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
            2X Multiplier
          </span>
        </div>

        <div className="mt-2">
          <div className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-[#ED1C24] transition-colors">
            Explore Offers
          </div>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Promotions & partner perks
          </p>
        </div>
      </button>
    </section>
  );
};
