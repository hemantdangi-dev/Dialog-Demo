import React from 'react';
import { AlertTriangle, ArrowRight, Clock, Sparkles } from 'lucide-react';

interface PointsExpiryAlertProps {
  expiringPoints: number;
  expiryDate: string;
  expiryDays: number;
  onExploreRewards: () => void;
}

export const PointsExpiryAlert: React.FC<PointsExpiryAlertProps> = ({
  expiringPoints,
  expiryDate,
  expiryDays,
  onExploreRewards,
}) => {
  return (
    <div
      className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
      id="points-expiry-alert"
    >
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Clock className="w-5 h-5 animate-pulse" />
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-gray-900 text-sm sm:text-base">
              {expiringPoints.toLocaleString()} Star Points are expiring soon
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-700" />
              {expiryDays} Days Left
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Use your points before <strong className="text-gray-900 font-semibold">{expiryDate}</strong> to avoid forfeiture. Redeem for mobile reloads, dining, or shopping vouchers.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onExploreRewards}
        id="btn-explore-expiring-rewards"
        className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer w-full sm:w-auto justify-center"
      >
        <Sparkles className="w-4 h-4 text-amber-200" />
        Explore Rewards
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
