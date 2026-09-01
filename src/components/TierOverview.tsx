import React, { useState } from 'react';
import { TIERS } from '../data/mockData';
import { TierLevel } from '../types';
import { Award, CheckCircle2, ChevronRight, Info, Sparkles, Table, LayoutGrid } from 'lucide-react';
import { TierAssessmentMatrix } from './TierAssessmentMatrix';

interface TierOverviewProps {
  currentTier: TierLevel;
  pointsToNextTier: number;
  onViewAllTierBenefits: () => void;
}

export const TierOverview: React.FC<TierOverviewProps> = ({
  currentTier,
  pointsToNextTier,
  onViewAllTierBenefits,
}) => {
  const [viewMode, setViewMode] = useState<'matrix' | 'cards'>('matrix');

  return (
    <div className="space-y-6" id="tier-overview-section">
      {/* 1. Tiers Benefit Types Matrix Component as requested from picture */}
      <TierAssessmentMatrix
        currentTier={currentTier}
        onSelectBenefit={(benefit) => {
          onViewAllTierBenefits();
        }}
      />

      {/* 2. Visual Tier Progression Cards Card */}
      <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED1C24]">
              Progression Track
            </span>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              Tier Progression & Minimum Balance Thresholds
            </h3>
          </div>

          <button
            type="button"
            onClick={onViewAllTierBenefits}
            id="btn-view-all-tier-benefits-link"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ED1C24] hover:text-[#C9141B] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Compare All Tiers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Tier Progression Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 relative">
          {TIERS.map((tier, index) => {
            const isCurrent = tier.id === currentTier;
            const isCompleted = index < TIERS.findIndex((t) => t.id === currentTier);

            return (
              <div
                key={tier.id}
                onClick={onViewAllTierBenefits}
                className={`rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[160px] ${
                  isCurrent
                    ? 'bg-gradient-to-b from-amber-500/10 via-amber-50 to-white border-2 border-amber-500 shadow-md ring-4 ring-amber-400/20'
                    : isCompleted
                    ? 'bg-slate-50/80 border border-slate-200/80 text-gray-700 hover:bg-slate-100'
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {/* Status Header Badge */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                      isCurrent
                        ? 'bg-amber-500 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {isCurrent && <Sparkles className="w-3 h-3" />}
                    {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    <span>{isCurrent ? 'You are here' : isCompleted ? 'Achieved' : 'Upcoming'}</span>
                  </span>

                  <span className="text-xs font-bold text-gray-400">
                    {tier.multiplier}
                  </span>
                </div>

                {/* Tier Name & Points Range */}
                <div className="my-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tier.accentColor }}
                    />
                    <h4 className="text-lg font-black text-gray-900 leading-tight">
                      {tier.name}
                    </h4>
                  </div>

                  <div className="text-xs font-bold text-gray-600 mt-1 font-mono">
                    {tier.rangeLabel}
                  </div>

                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                    {tier.summary}
                  </p>
                </div>

                {/* Sub-text footer */}
                <div className="pt-2 border-t border-gray-100 text-[11px] font-semibold flex items-center justify-between">
                  <span className={isCurrent ? 'text-amber-800' : 'text-gray-500'}>
                    {isCurrent
                      ? 'Current Tier Active'
                      : isCompleted
                      ? 'Threshold Met'
                      : 'Target Tier'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Footer Under Tiers */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-2 h-2 rounded-full bg-[#ED1C24]" />
            <span>
              Target Progress: <strong className="text-gray-900 font-bold">{pointsToNextTier.toLocaleString()} points to Platinum</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Minimum balance rules configured in member assessment engine.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

