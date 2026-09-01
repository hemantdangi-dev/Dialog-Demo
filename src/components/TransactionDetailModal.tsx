import React from 'react';
import { LoyaltyTransaction } from '../types';
import { X, CheckCircle2, Copy, Receipt, Calendar, Clock, Smartphone, Hash, ArrowUpRight, ArrowDownRight, Printer } from 'lucide-react';

interface TransactionDetailModalProps {
  transaction: LoyaltyTransaction | null;
  onClose: () => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!transaction) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transaction.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative"
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
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
              Star Points e-Receipt
            </span>
          </div>

          <h3 className="text-xl font-black text-white">
            {transaction.activity}
          </h3>

          <p className="text-xs text-gray-300 mt-0.5">
            {transaction.description}
          </p>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-baseline justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-400">Points Movement</div>
              <div className="text-2xl font-black font-mono">
                {transaction.points === 0 ? (
                  <span className="text-amber-300">Tier Upgraded</span>
                ) : transaction.isPositive ? (
                  <span className="text-emerald-400">+{transaction.points.toLocaleString()} Pts</span>
                ) : (
                  <span className="text-purple-300">-{transaction.points.toLocaleString()} Pts</span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {transaction.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span>Date & Time</span>
              <span className="font-semibold text-gray-900">{transaction.date} • {transaction.time}</span>
            </div>

            {transaction.mobileNumber && (
              <div className="flex items-center justify-between text-gray-600">
                <span>Account / Mobile</span>
                <span className="font-mono font-bold text-gray-900">{transaction.mobileNumber}</span>
              </div>
            )}

            {transaction.rechargeAmount && (
              <div className="flex items-center justify-between text-gray-600">
                <span>Transaction Amount</span>
                <span className="font-bold text-gray-900">LKR {transaction.rechargeAmount.toLocaleString()}.00</span>
              </div>
            )}

            <div className="flex items-center justify-between text-gray-600">
              <span>Merchant / Channel</span>
              <span className="font-semibold text-gray-900">{transaction.merchant || 'Dialog Star Points Network'}</span>
            </div>

            <div className="flex items-center justify-between text-gray-600 pt-2 border-t border-gray-200">
              <span>Reference Number</span>
              <div className="flex items-center gap-1 font-mono font-bold text-gray-800 text-xs">
                <span>{transaction.referenceId}</span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="p-1 hover:text-gray-900 cursor-pointer"
                  title="Copy Reference"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 leading-relaxed bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
            Star Points transactions are reconciled in real-time. For queries, dial <strong>1777</strong> or check USSD balance with <strong>#141#</strong>.
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Receipt
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
