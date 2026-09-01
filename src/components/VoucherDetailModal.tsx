import React, { useState } from 'react';
import { VoucherItem } from '../types';
import { X, QrCode, Copy, CheckCircle2, Calendar, Tag, AlertCircle, ShieldCheck } from 'lucide-react';

interface VoucherDetailModalProps {
  voucher: VoucherItem | null;
  onClose: () => void;
  onUseNow: (voucher: VoucherItem) => void;
}

export const VoucherDetailModal: React.FC<VoucherDetailModalProps> = ({
  voucher,
  onClose,
  onUseNow,
}) => {
  const [copied, setCopied] = useState(false);

  if (!voucher) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucher.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUsed = voucher.status === 'used';

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
        <div
          className="text-white p-5 sm:p-6 relative"
          style={{ backgroundColor: voucher.partnerLogoBg || '#ED1C24' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90 bg-black/20 px-2 py-0.5 rounded">
              {voucher.partnerName}
            </span>
          </div>

          <h3 className="text-xl font-black text-white leading-tight">
            {voucher.title}
          </h3>

          <div className="text-sm font-bold text-white/90 mt-0.5">
            {voucher.discountOrValue}
          </div>
        </div>

        {/* Voucher Pass Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Digital QR / Barcode Card */}
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 text-center space-y-3">
            <div className="w-32 h-32 bg-white border border-gray-300 rounded-2xl mx-auto flex items-center justify-center p-2 shadow-xs">
              <QrCode className="w-full h-full text-gray-900" />
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-gray-400">Voucher Promo Code</div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="font-mono text-base font-black text-gray-900 tracking-wider">
                  {voucher.code}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-[#ED1C24] hover:text-[#C9141B] p-1 cursor-pointer"
                  title="Copy Voucher Code"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
              <span>Status: <strong className="uppercase text-gray-900">{voucher.statusLabel}</strong></span>
              <span>Valid: <strong className="text-gray-900">{voucher.validUntil}</strong></span>
            </div>
          </div>

          {/* Terms and conditions */}
          <div>
            <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Terms & Conditions
            </h5>
            <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
              {voucher.terms.map((term, i) => (
                <li key={i}>{term}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
            {!isUsed && (
              <button
                type="button"
                onClick={() => {
                  onUseNow(voucher);
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Apply / Use Voucher
              </button>
            )}

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
