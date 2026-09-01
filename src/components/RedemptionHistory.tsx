import React, { useState } from 'react';
import { REDEMPTION_HISTORY } from '../data/mockData';
import { RedemptionRecord } from '../types';
import { Gift, Calendar, CheckCircle2, ChevronRight, ArrowDownRight, Tag } from 'lucide-react';

interface RedemptionHistoryProps {
  onViewFullHistory: () => void;
  onSelectRedemption: (record: RedemptionRecord) => void;
}

export const RedemptionHistory: React.FC<RedemptionHistoryProps> = ({
  onViewFullHistory,
  onSelectRedemption,
}) => {
  const [filter, setFilter] = useState<'All' | 'Vouchers' | 'Reloads' | 'Partner Rewards'>('All');

  const filteredHistory = REDEMPTION_HISTORY.filter((item) => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  return (
    <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7" id="redemption-history-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED1C24]">
            Past Redemptions
          </span>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Points Redemption History
          </h3>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
          {(['All', 'Vouchers', 'Reloads', 'Partner Rewards'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === cat
                  ? 'bg-white text-gray-900 shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table / List */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[11px] tracking-wider">
              <th className="pb-3 pl-2">Date</th>
              <th className="pb-3">Reward / Service</th>
              <th className="pb-3">Category</th>
              <th className="pb-3 text-right">Points Used</th>
              <th className="pb-3 text-center">Status</th>
              <th className="pb-3 pr-2 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredHistory.map((rec) => (
              <tr
                key={rec.id}
                onClick={() => onSelectRedemption(rec)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="py-3.5 pl-2 whitespace-nowrap font-medium text-gray-900">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{rec.date}</span>
                  </div>
                </td>

                <td className="py-3.5">
                  <div className="font-bold text-gray-900">{rec.rewardTitle}</div>
                  <div className="text-[11px] text-gray-500">{rec.partnerOrService}</div>
                </td>

                <td className="py-3.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                    <Tag className="w-3 h-3 text-gray-400" />
                    {rec.category}
                  </span>
                </td>

                <td className="py-3.5 text-right whitespace-nowrap font-mono font-black text-purple-700">
                  -{rec.pointsUsed.toLocaleString()} Pts
                </td>

                <td className="py-3.5 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    {rec.status}
                  </span>
                </td>

                <td className="py-3.5 pr-2 text-right whitespace-nowrap">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#ED1C24] group-hover:underline cursor-pointer"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-gray-500">
          Showing completed Star Points redemptions.
        </span>

        <button
          type="button"
          onClick={onViewFullHistory}
          id="btn-view-full-redemption-history"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ED1C24] hover:text-[#C9141B] transition-colors cursor-pointer"
        >
          <span>View Full Redemption History</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
