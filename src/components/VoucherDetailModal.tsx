import React, { useState } from 'react';
import { VoucherItem } from '../types';
import {
  X,
  QrCode,
  Copy,
  CheckCircle2,
  Calendar,
  Tag,
  AlertCircle,
  ShieldCheck,
  Star,
  ExternalLink,
  Smartphone,
  Tv,
  Store,
  ShoppingBag,
  Clock,
  Check,
  Maximize2
} from 'lucide-react';

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
  const [showFullImage, setShowFullImage] = useState(false);

  if (!voucher) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucher.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUsed = voucher.status === 'used';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Styled with Dialog Red & StarPoints badge */}
        <div className="text-white p-4 sm:p-5 relative bg-gradient-to-r from-[#ED1C24] via-[#D31820] to-[#990000]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-black/30 px-2 py-0.5 rounded">
              <Star className="w-3 h-3 fill-amber-300" />
              DIALOG STARPOINTS VOUCHER
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 bg-white/15 px-2 py-0.5 rounded">
              {voucher.category}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
            {voucher.title}
          </h3>

          {voucher.subHeadline && (
            <div className="text-xs font-bold text-red-100 mt-0.5">
              {voucher.subHeadline}
            </div>
          )}
        </div>

        {/* Voucher Pass Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-gray-900">
          {/* PHOTO VOUCHER AS IT IS */}
          {voucher.imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group bg-black">
              <img
                src={voucher.imageUrl}
                alt={voucher.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[260px] mx-auto transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
                Official Voucher
              </div>
            </div>
          )}

          {/* Pass Details & Promo Code Bar */}
          <div className="bg-gradient-to-b from-slate-50 to-white border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center space-y-3.5 relative shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2.5 text-left">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Partner</span>
                <strong className="text-sm font-black text-gray-900">{voucher.partnerName}</strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Discount Value</span>
                <strong className="text-sm font-black text-[#ED1C24]">{voucher.discountOrValue}</strong>
              </div>
            </div>

            {/* QR Code Presentation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-1">
              <div className="w-28 h-28 bg-white border border-gray-300 rounded-xl flex items-center justify-center p-2 shadow-xs shrink-0">
                <QrCode className="w-full h-full text-gray-900" />
              </div>

              {/* Promo Code Info */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="text-[10px] uppercase font-extrabold tracking-wider text-gray-400">
                  Official Voucher Promo Code
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-mono text-base sm:text-lg font-black text-[#ED1C24] bg-red-50/80 px-3 py-1 rounded-lg border border-red-200 tracking-wider">
                    {voucher.code}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-red-100/80 text-[#ED1C24] hover:bg-red-200 transition-colors cursor-pointer"
                    title="Copy Voucher Code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[11px] text-gray-500 font-medium">
                  {copied ? (
                    <span className="text-emerald-600 font-bold">✓ Code copied to clipboard</span>
                  ) : (
                    'Tap copy icon or present QR code at checkout'
                  )}
                </div>
              </div>
            </div>

            {/* Barcode Mockup */}
            <div className="pt-2 border-t border-gray-200">
              <div className="h-8 w-full flex items-center justify-center gap-1 opacity-80 overflow-hidden">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 h-full"
                    style={{ width: i % 3 === 0 ? '3px' : i % 5 === 0 ? '4px' : '1.5px' }}
                  />
                ))}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-1">
                {voucher.barcodeText || voucher.code}
              </div>
            </div>

            {/* Validity and Status */}
            <div className="pt-2 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
              <span>Status: <strong className="uppercase text-emerald-700 font-bold">{voucher.statusLabel}</strong></span>
              <span>Valid Until: <strong className="text-gray-900 font-bold">{voucher.validUntil}</strong></span>
            </div>
          </div>

          {/* How It Works Section (if available) */}
          {voucher.howItWorks && voucher.howItWorks.length > 0 && (
            <div className="p-3.5 bg-red-50/60 rounded-2xl border border-red-100 space-y-2">
              <h5 className="text-xs font-black text-[#ED1C24] uppercase tracking-wider">
                How It Works
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                {voucher.howItWorks.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#ED1C24] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
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
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Apply / Redeem Voucher</span>
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
