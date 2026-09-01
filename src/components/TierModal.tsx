import React from 'react';
import { TIERS } from '../data/mockData';
import { CustomerProfile } from '../types';
import { X, Award, CheckCircle2, Crown, Sparkles, TrendingUp, Info } from 'lucide-react';

interface TierModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CustomerProfile;
}

export const TierModal: React.FC<TierModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-7 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
              Loyalty Tier Progression Guide
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            Dialog Star Points Tier Structure
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Currently: <strong className="text-amber-400">{profile.tier} Tier</strong> with {profile.pointsBalance.toLocaleString()} points.
            You need <strong className="text-white">{profile.pointsToNextTier.toLocaleString()} more points</strong> to reach Platinum.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map((tier) => {
              const isCurrent = tier.id === profile.tier;

              return (
                <div
                  key={tier.id}
                  className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                    isCurrent
                      ? 'bg-amber-50/60 border-2 border-amber-500 shadow-md ring-4 ring-amber-400/20'
                      : 'bg-slate-50/70 border-gray-200'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-500 font-mono">
                        {tier.rangeLabel}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-black uppercase bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-2xs">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: tier.accentColor }}
                      />
                      <h4 className="text-lg font-black text-gray-900">
                        {tier.name}
                      </h4>
                    </div>

                    <div className="text-xs font-bold text-[#ED1C24] mt-1">
                      {tier.multiplier}
                    </div>

                    <p className="text-[11px] text-gray-600 mt-2 pb-3 border-b border-gray-200">
                      {tier.summary}
                    </p>

                    {/* Benefits List */}
                    <div className="mt-3 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-gray-400">Key Privileges</div>
                      <ul className="space-y-1.5 text-xs text-gray-700">
                        {tier.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-tight">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                    <span className="text-[11px] font-bold text-gray-500">
                      {isCurrent ? 'Your Current Tier' : 'Tier Benefits'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-gray-400 shrink-0" />
              <span>Points thresholds are calculated on rolling 12-month transaction spend. Demo sample data.</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
