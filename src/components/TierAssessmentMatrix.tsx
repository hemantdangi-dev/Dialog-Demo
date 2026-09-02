import React, { useState } from 'react';
import { TIER_ASSESSMENT_RULE_DATA, TIERS } from '../data/mockData';
import {
  Layers,
  Filter,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Tag,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Utensils,
  Plane,
  Smartphone,
  Wifi,
  X,
  SlidersHorizontal,
  Eye,
  Check,
  Gift
} from 'lucide-react';
import { TierLevel } from '../types';

interface TierAssessmentMatrixProps {
  currentTier?: TierLevel;
  onSelectBenefit?: (benefitTitle: string) => void;
  onViewVouchers?: () => void;
}

export const TierAssessmentMatrix: React.FC<TierAssessmentMatrixProps> = ({
  currentTier = 'Gold',
  onSelectBenefit,
  onViewVouchers,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'experiences' | 'dining' | 'groceries' | 'travel' | 'devices'>('all');
  const [expandTruncatedText, setExpandTruncatedText] = useState(false);
  const [selectedBenefitDetail, setSelectedBenefitDetail] = useState<{
    title: string;
    partner: string;
    tier: string;
    description: string;
    type: string;
    discountValue?: string;
    terms?: string[];
  } | null>(null);

  const category = TIER_ASSESSMENT_RULE_DATA[0];

  const handleBenefitClick = (benefit: {
    id: string;
    partner: string;
    offer: string;
    fullTitle: string;
    type: string;
  }, tierName: string) => {
    setSelectedBenefitDetail({
      title: benefit.offer,
      partner: benefit.partner,
      tier: tierName,
      description: benefit.fullTitle,
      type: benefit.type,
      discountValue: benefit.offer,
      terms: [
        `Valid for all verified ${tierName} members with active Star Points wallet.`,
        'Must present Dialog Star Points digital voucher pass or QR code at merchant counter.',
        'Cannot be combined with other ongoing merchant seasonal promotions.',
        'Points accrual rate applies simultaneously upon settlement.'
      ]
    });
  };

  const handleUnassignedClick = (b: { title: string; description: string; details?: string }) => {
    setSelectedBenefitDetail({
      title: b.title,
      partner: 'Fashion Bug & Partner Stores',
      tier: 'All Tiers (Unassigned Universal Benefit)',
      description: b.description,
      type: 'fashion',
      discountValue: '10% OFF',
      terms: [
        'Available to all active Dialog Star Points members regardless of minimum balance.',
        'Requires minimum spend of LKR 3,000 at any Fashion Bug outlet or online.',
        'Present mobile number or scan QR code at checkout counter.'
      ]
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden" id="tier-assessment-matrix-section">
      {/* 1. Header Bar matching picture format */}
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Tiers
              </h2>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md">
                Assessment Matrix
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1.5">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-400 text-gray-600 text-[10px] font-serif font-bold">
                i
              </span>
              <span>
                Overview of tier qualification thresholds and exclusive member benefits across Silver, Gold, and Platinum.
              </span>
            </div>
          </div>

          {/* Navigation Controls and View Mode Switcher */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Display Mode Switcher Toggle */}
            <button
              type="button"
              onClick={() => setExpandTruncatedText(!expandTruncatedText)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                expandTruncatedText
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
              title="Toggle full text or compact screenshot view"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{expandTruncatedText ? 'Compact Format' : 'Expand Full Text'}</span>
            </button>

            {/* Pagination Controls as pictured */}
            <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-xl border border-gray-200 shadow-2xs">
              <button
                type="button"
                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors cursor-pointer"
                title="Previous Tiers"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium text-gray-600 select-none px-1">
                Showing Tiers 1 to 3 (out of 3)
              </span>
              <button
                type="button"
                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors cursor-pointer"
                title="Next Tiers"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tiers Assessment Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          {/* Table Header: Columns */}
          <thead>
            <tr className="border-b border-gray-200 divide-x divide-gray-200">
              {/* Col 1: BENEFIT TYPES BY CATEGORIES with Filter Icon */}
              <th className="w-[28%] p-4 sm:p-5 bg-white align-top relative">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-700 leading-tight">
                    BENEFIT TYPES BY CATEGORIES
                  </span>
                  
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                        activeCategoryFilter !== 'all'
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:border-blue-400'
                      }`}
                      title="Filter Benefits by Category"
                    >
                      <Filter className={`w-3.5 h-3.5 ${activeCategoryFilter !== 'all' ? 'fill-white' : 'fill-blue-600'}`} />
                    </button>

                    {/* Filter Dropdown */}
                    {showFilterDropdown && (
                      <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20 animate-in fade-in zoom-in-95">
                        <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100">
                          Filter Categories
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategoryFilter('all');
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                            activeCategoryFilter === 'all' ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-gray-700'
                          }`}
                        >
                          <span>All Categories</span>
                          {activeCategoryFilter === 'all' && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategoryFilter('experiences');
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                            activeCategoryFilter === 'experiences' ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-gray-700'
                          }`}
                        >
                          <span>Experiences</span>
                          {activeCategoryFilter === 'experiences' && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategoryFilter('dining');
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                            activeCategoryFilter === 'dining' ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-gray-700'
                          }`}
                        >
                          <span>Dining (KFC)</span>
                          {activeCategoryFilter === 'dining' && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategoryFilter('groceries');
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                            activeCategoryFilter === 'groceries' ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-gray-700'
                          }`}
                        >
                          <span>Supermarket (Cargills)</span>
                          {activeCategoryFilter === 'groceries' && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategoryFilter('travel');
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                            activeCategoryFilter === 'travel' ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-gray-700'
                          }`}
                        >
                          <span>Travel (SriLankan Airlines)</span>
                          {activeCategoryFilter === 'travel' && <Check className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </th>

              {/* Col 2: Silver */}
              <th className="w-[24%] p-4 sm:p-5 bg-white text-center align-top">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#0066CC] text-white flex items-center justify-center shadow-xs mb-2 ring-4 ring-blue-50">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0066CC]">
                    Silver
                  </h4>
                  <span className="text-xs text-gray-500 font-medium mt-0.5">
                    Minimum Balance: 0
                  </span>
                </div>
              </th>

              {/* Col 3: Gold (Current User Tier) */}
              <th className="w-[24%] p-4 sm:p-5 bg-white text-center align-top relative">
                {currentTier === 'Gold' && (
                  <span className="absolute top-2 right-2 text-[9px] font-black uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-2xs">
                    Your Tier
                  </span>
                )}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#0066CC] text-white flex items-center justify-center shadow-xs mb-2 ring-4 ring-amber-100">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0066CC]">
                    Gold
                  </h4>
                  <span className="text-xs text-gray-500 font-medium mt-0.5">
                    Minimum Balance: 25000
                  </span>
                </div>
              </th>

              {/* Col 4: Platinum */}
              <th className="w-[24%] p-4 sm:p-5 bg-white text-center align-top">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#0066CC] text-white flex items-center justify-center shadow-xs mb-2 ring-4 ring-blue-50">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0066CC]">
                    Platinum
                  </h4>
                  <span className="text-xs text-gray-500 font-medium mt-0.5">
                    Minimum Balance: 50000
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {/* Category Banner Row: Experiences (Grey Bar across all cols) */}
            <tr className="bg-[#EFEFEF] border-b border-gray-300/80">
              <td
                colSpan={4}
                className="px-4 sm:px-5 py-2.5 text-xs font-semibold text-gray-700 tracking-wide"
              >
                {category.categoryName}
              </td>
            </tr>

            {/* Benefit Types Row */}
            <tr className="border-b border-gray-200 divide-x divide-gray-200 align-top">
              {/* Column 1: Star Points Benefit Types & Unassigned Benefits */}
              <td className="p-4 sm:p-5 bg-white space-y-3">
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#0066CC] block leading-snug">
                    {category.subCategoryTitle}
                  </strong>
                  <span className="text-xs font-bold text-gray-900 mt-1 block">
                    Unassigned Benefits
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-gray-600">
                  {category.unassignedBenefits.map((b, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleUnassignedClick(b)}
                      className="cursor-pointer group flex items-start gap-1 p-1 rounded hover:bg-blue-50/70 transition-colors"
                      title={b.description}
                    >
                      <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                        {expandTruncatedText ? b.description : b.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>

              {/* Column 2: Silver Benefits (Light Sky Blue Shaded block matching screenshot) */}
              <td className="p-4 sm:p-5 bg-[#DCEAF9] text-center">
                <div className="h-full min-h-[110px] flex items-center justify-center text-xs text-blue-900/40 font-medium italic">
                  {/* Kept subtly empty / shaded exactly as in screenshot */}
                </div>
              </td>

              {/* Column 3: Gold Benefits */}
              <td className="p-4 sm:p-5 bg-white space-y-2.5">
                <ul className="space-y-2 text-xs text-gray-900">
                  {category.tierBenefits.gold
                    .filter((b) =>
                      activeCategoryFilter === 'all' ||
                      activeCategoryFilter === 'experiences' ||
                      activeCategoryFilter === b.type
                    )
                    .map((b) => (
                      <li
                        key={b.id}
                        onClick={() => handleBenefitClick(b, 'Gold')}
                        className="cursor-pointer group p-1 rounded-lg hover:bg-amber-50/80 transition-all flex items-start gap-1.5"
                      >
                        <span className="text-gray-500 font-bold shrink-0">•</span>
                        <span className="text-gray-800 group-hover:text-[#0066CC] leading-relaxed transition-colors">
                          {expandTruncatedText ? (
                            <span>
                              <strong>{b.partner}</strong> – {b.fullTitle.replace(`${b.partner} – `, '')}
                            </span>
                          ) : (
                            <span>
                              {b.partner} – {b.offer}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                </ul>
              </td>

              {/* Column 4: Platinum Benefits */}
              <td className="p-4 sm:p-5 bg-white space-y-2.5">
                <ul className="space-y-2 text-xs text-gray-900">
                  {category.tierBenefits.platinum
                    .filter((b) =>
                      activeCategoryFilter === 'all' ||
                      activeCategoryFilter === 'experiences' ||
                      activeCategoryFilter === b.type
                    )
                    .map((b) => (
                      <li
                        key={b.id}
                        onClick={() => handleBenefitClick(b, 'Platinum')}
                        className="cursor-pointer group p-1 rounded-lg hover:bg-blue-50/80 transition-all flex items-start gap-1.5"
                      >
                        <span className="text-gray-500 font-bold shrink-0">•</span>
                        <span className="text-gray-800 group-hover:text-[#0066CC] leading-relaxed transition-colors">
                          {expandTruncatedText ? (
                            <span>
                              <strong>{b.partner}</strong> – {b.fullTitle.replace(`${b.partner} – `, '')}
                            </span>
                          ) : (
                            <span>
                              {b.partner} – {b.offer}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. Footer Bar with Active Status Indicator */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Tier Status:{' '}
            <strong className="text-gray-900 font-semibold">Active & Live</strong> (Continuous rolling evaluation)
          </span>
        </div>

        <div className="text-[11px] text-gray-500 font-medium">
          Silver: 0 Pts • Gold: 25,000 Pts • Platinum: 50,000 Pts
        </div>
      </div>

      {/* Modal: Benefit Detail Modal */}
      {selectedBenefitDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedBenefitDetail(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 p-6 space-y-4 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                {selectedBenefitDetail.tier}
              </span>
              <button
                type="button"
                onClick={() => setSelectedBenefitDetail(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider block">
                {selectedBenefitDetail.partner}
              </span>
              <h3 className="text-base font-black text-gray-900 mt-1">
                {selectedBenefitDetail.description}
              </h3>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Available for eligible Star Points members via QR code or Dialog Partner Voucher Pass.</span>
            </div>

            {selectedBenefitDetail.terms && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                  Privilege Guidelines:
                </span>
                <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
                  {selectedBenefitDetail.terms.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-3 flex items-center gap-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setSelectedBenefitDetail(null);
                  if (onViewVouchers) {
                    onViewVouchers();
                  } else if (onSelectBenefit) {
                    onSelectBenefit(selectedBenefitDetail.description);
                  }
                }}
                className="flex-1 py-2.5 px-4 bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Gift className="w-4 h-4" />
                <span>View in Partner Passes</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedBenefitDetail(null)}
                className="py-2.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
