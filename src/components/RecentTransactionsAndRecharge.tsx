import React, { useState } from 'react';
import { LoyaltyTransaction, RechargeRecord } from '../types';
import {
  Smartphone,
  Gift,
  FileText,
  Crown,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ExternalLink,
  Receipt,
  CheckCircle2,
  Calendar,
  Phone
} from 'lucide-react';

interface RecentTransactionsAndRechargeProps {
  transactions: LoyaltyTransaction[];
  recharges: RechargeRecord[];
  onSelectTransaction: (txn: LoyaltyTransaction) => void;
  onViewAllTransactions: () => void;
  onViewAllRecharges: () => void;
  onRechargeNow: () => void;
}

export const RecentTransactionsAndRecharge: React.FC<RecentTransactionsAndRechargeProps> = ({
  transactions,
  recharges,
  onSelectTransaction,
  onViewAllTransactions,
  onViewAllRecharges,
  onRechargeNow,
}) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'recharges'>('transactions');

  const getCategoryIcon = (category: string, isPositive: boolean) => {
    switch (category) {
      case 'Recharge':
        return <Smartphone className="w-4 h-4 text-[#ED1C24]" />;
      case 'Bill':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'Voucher':
        return <Gift className="w-4 h-4 text-purple-600" />;
      case 'Partner':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'Tier':
        return <Crown className="w-4 h-4 text-yellow-600" />;
      default:
        return isPositive ? (
          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-purple-600" />
        );
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'Recharge':
        return 'bg-red-50 border-red-100';
      case 'Bill':
        return 'bg-blue-50 border-blue-100';
      case 'Voucher':
        return 'bg-purple-50 border-purple-100';
      case 'Partner':
        return 'bg-amber-50 border-amber-100';
      case 'Tier':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7" id="transactions-recharge-section">
      {/* Top Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED1C24]">
            Activity Logs
          </span>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Recent Transactions & Recharges
          </h3>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'transactions'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Recent Transactions ({transactions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('recharges')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'recharges'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Recharge History ({recharges.length})
          </button>
        </div>
      </div>

      {/* 1. Transactions Tab Content */}
      {activeTab === 'transactions' && (
        <div className="mt-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[11px] tracking-wider">
                  <th className="pb-3 pl-2">Date & Time</th>
                  <th className="pb-3">Activity</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-right">Star Points</th>
                  <th className="pb-3 text-center">Status</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.slice(0, 6).map((txn) => (
                  <tr
                    key={txn.id}
                    onClick={() => onSelectTransaction(txn)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Date */}
                    <td className="py-3.5 pl-2 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{txn.date}</div>
                      <div className="text-[11px] text-gray-400">{txn.time}</div>
                    </td>

                    {/* Activity */}
                    <td className="py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${getCategoryBg(txn.category)}`}>
                          {getCategoryIcon(txn.category, txn.isPositive)}
                        </div>
                        <span className="font-bold text-gray-800">{txn.activity}</span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-3.5">
                      <div className="font-medium text-gray-700">{txn.description}</div>
                      <div className="text-[11px] text-gray-400 font-mono">Ref: {txn.referenceId}</div>
                    </td>

                    {/* Points */}
                    <td className="py-3.5 text-right whitespace-nowrap">
                      {txn.points === 0 ? (
                        <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-xs">
                          Tier Upgrade
                        </span>
                      ) : txn.isPositive ? (
                        <span className="font-black text-emerald-700 text-sm sm:text-base font-mono">
                          +{txn.points.toLocaleString()}
                        </span>
                      ) : (
                        <span className="font-black text-purple-700 text-sm sm:text-base font-mono">
                          -{txn.points.toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        {txn.status}
                      </span>
                    </td>

                    {/* View Action */}
                    <td className="py-3.5 pr-2 text-right whitespace-nowrap">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#ED1C24] group-hover:underline cursor-pointer"
                      >
                        <span>Details</span>
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
              Showing recent transactions. Click any row to view complete receipt details.
            </span>

            <button
              type="button"
              onClick={onViewAllTransactions}
              id="btn-view-all-transactions"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>View All Transactions</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Recharge History Tab Content */}
      {activeTab === 'recharges' && (
        <div className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {recharges.map((rec) => (
              <div
                key={rec.id}
                className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 flex flex-col justify-between hover:border-red-200 hover:bg-white transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {rec.date}
                    </span>
                    <span className="font-mono text-[11px] text-gray-400">{rec.referenceId}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-[#ED1C24]" />
                    <span className="font-bold text-gray-900 text-sm">{rec.mobileNumber}</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-gray-200/80 my-2">
                    <div className="text-[11px] text-gray-500">Recharge Amount</div>
                    <div className="text-base font-black text-gray-900">
                      Rs. {rec.rechargeAmount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    +{rec.pointsEarned} Points
                  </span>
                  <span className="text-[11px] font-semibold text-gray-500">{rec.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-gray-500">
              Demo Calculations: Points calculated at Gold tier 1.5x earn rate.
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onRechargeNow}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <span>Recharge Mobile</span>
              </button>

              <button
                type="button"
                onClick={onViewAllRecharges}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <span>View Recharge History</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
