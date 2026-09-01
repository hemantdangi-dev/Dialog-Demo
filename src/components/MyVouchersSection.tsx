import React, { useState } from 'react';
import { VoucherItem, VoucherStatus } from '../types';
import {
  Ticket,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  QrCode,
  Copy,
  ExternalLink,
  Tv,
  Film,
  Smartphone,
  Store,
  ShoppingBag,
  Shirt,
  Truck,
  Utensils,
  Wifi,
  Laptop,
  Zap,
  ShieldCheck,
  Award,
  Star,
  Percent,
  Check,
  Gift,
  Eye,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

interface MyVouchersSectionProps {
  vouchers: VoucherItem[];
  onSelectVoucher: (voucher: VoucherItem) => void;
  onUseVoucher: (voucher: VoucherItem) => void;
  onViewAllVouchers: () => void;
}

export const MyVouchersSection: React.FC<MyVouchersSectionProps> = ({
  vouchers,
  onSelectVoucher,
  onUseVoucher,
  onViewAllVouchers,
}) => {
  const [filter, setFilter] = useState<'all' | 'available' | 'expiring_soon' | 'used'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<'photo' | 'interactive'>('photo');

  const handleCopyCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredVouchers = vouchers.filter((v) => {
    if (filter !== 'all' && v.status !== filter) return false;
    if (categoryFilter !== 'all' && v.category !== categoryFilter) return false;
    return true;
  });

  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tv':
        return <Tv className="w-3.5 h-3.5" />;
      case 'Film':
        return <Film className="w-3.5 h-3.5" />;
      case 'Smartphone':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'Store':
        return <Store className="w-3.5 h-3.5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'Shirt':
        return <Shirt className="w-3.5 h-3.5" />;
      case 'Truck':
        return <Truck className="w-3.5 h-3.5" />;
      case 'Utensils':
        return <Utensils className="w-3.5 h-3.5" />;
      case 'Wifi':
        return <Wifi className="w-3.5 h-3.5" />;
      case 'Laptop':
        return <Laptop className="w-3.5 h-3.5" />;
      case 'Zap':
        return <Zap className="w-3.5 h-3.5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'Award':
        return <Award className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-5 sm:p-7 space-y-6" id="vouchers-section">
      {/* Header with Title, Badge and Subtext */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-[#ED1C24] font-bold text-[11px] uppercase tracking-wider">
              <Ticket className="w-3.5 h-3.5" />
              Dialog StarPoints Rewards
            </span>
            <span className="text-xs font-semibold text-gray-400">
              {vouchers.length} Official Partner Passes
            </span>
          </div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
            My Vouchers & Partner Passes
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Original Dialog StarPoints voucher passes. Click any voucher to enlarge, scan QR, or copy promo code.
          </p>
        </div>

        {/* View Mode & Top Status Filters */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Display Mode Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setDisplayMode('photo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                displayMode === 'photo'
                  ? 'bg-[#ED1C24] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photo Vouchers</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('interactive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                displayMode === 'interactive'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Ticket View</span>
            </button>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({vouchers.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('available')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === 'available'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Available ({vouchers.filter((v) => v.status === 'available').length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('expiring_soon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === 'expiring_soon'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Expiring ({vouchers.filter((v) => v.status === 'expiring_soon').length})
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-gray-400 font-bold uppercase text-[10px] tracking-wider shrink-0">Category:</span>
        {['all', 'Entertainment', 'Shopping', 'Dining', 'Reload'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 rounded-full font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-gray-900 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* PHOTO VOUCHERS GRID (User's Exact Photos Placed As-Is) */}
      {displayMode === 'photo' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVouchers.map((voucher) => {
            const isUsed = voucher.status === 'used';
            const isExpiring = voucher.status === 'expiring_soon';

            return (
              <div
                key={voucher.id}
                onClick={() => onSelectVoucher(voucher)}
                className={`group bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 relative ${
                  isExpiring
                    ? 'border-amber-300 ring-2 ring-amber-400/20'
                    : 'border-gray-200 hover:border-[#ED1C24]'
                }`}
              >
                {/* Image Container with high fidelity rendering */}
                <div className="relative bg-slate-900 overflow-hidden aspect-[4/3] flex items-center justify-center">
                  {voucher.imageUrl ? (
                    <img
                      src={voucher.imageUrl}
                      alt={voucher.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="p-6 text-center text-white">
                      <Ticket className="w-12 h-12 mx-auto mb-2 text-red-500" />
                      <div className="font-bold text-sm">{voucher.title}</div>
                    </div>
                  )}

                  {/* Gradient Overlay for Top Badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Status & Category Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white border border-white/20">
                      {voucher.partnerName}
                    </span>

                    {isExpiring ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow-xs animate-pulse">
                        Expiring Soon
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white shadow-xs">
                        {voucher.category}
                      </span>
                    )}
                  </div>

                  {/* Hover Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVoucher(voucher);
                      }}
                      className="py-2 px-4 rounded-xl bg-white text-gray-900 font-black text-xs shadow-lg hover:bg-gray-100 transition-all flex items-center gap-1.5 cursor-pointer transform translate-y-2 group-hover:translate-y-0 duration-200"
                    >
                      <Eye className="w-4 h-4 text-[#ED1C24]" />
                      <span>View Pass</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleCopyCode(e, voucher.code)}
                      className="py-2 px-3 rounded-xl bg-[#ED1C24] text-white font-black text-xs shadow-lg hover:bg-[#C9141B] transition-all flex items-center gap-1 cursor-pointer transform translate-y-2 group-hover:translate-y-0 duration-200"
                      title="Copy Code"
                    >
                      {copiedCode === voucher.code ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Voucher Meta Card Footer */}
                <div className="p-4 bg-white space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-sm sm:text-base text-gray-900 leading-snug group-hover:text-[#ED1C24] transition-colors line-clamp-2">
                      {voucher.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1 font-medium">
                      {voucher.discountOrValue}
                    </p>
                  </div>

                  {/* Voucher Code Box & Quick Copy */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="bg-gray-100 hover:bg-gray-200 rounded-lg px-2.5 py-1 font-mono font-bold text-xs text-gray-800 tracking-wider truncate max-w-[170px] border border-gray-200">
                      {voucher.code}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleCopyCode(e, voucher.code)}
                      className="text-[11px] font-bold text-[#ED1C24] hover:text-[#C9141B] flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedCode === voucher.code ? (
                        <span className="text-emerald-600 font-black">Copied!</span>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Validity Info */}
                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      Expires: <strong className="text-gray-700">{voucher.validUntil}</strong>
                    </span>
                    <span className="font-bold text-gray-600">{voucher.pointsCost} Pts</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* INTERACTIVE PERFORATED TICKET VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredVouchers.map((voucher) => {
            const isUsed = voucher.status === 'used';
            const isExpiring = voucher.status === 'expiring_soon';

            return (
              <div
                key={voucher.id}
                onClick={() => onSelectVoucher(voucher)}
                className={`rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden group shadow-sm hover:shadow-md ${
                  isUsed
                    ? 'bg-gray-50/90 border-gray-200 opacity-75'
                    : isExpiring
                    ? 'bg-white border-amber-300 hover:border-amber-400'
                    : 'bg-white border-gray-200 hover:border-[#ED1C24]/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row min-h-[220px]">
                  {/* LEFT MAIN TICKET BODY */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between relative bg-gradient-to-br from-white via-white to-slate-50">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: voucher.partnerLogoBg || '#ED1C24' }}
                          />
                          <span className="font-extrabold text-xs tracking-tight text-gray-900 uppercase">
                            {voucher.partnerName}
                          </span>
                        </div>

                        {isUsed ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                            Used
                          </span>
                        ) : isExpiring ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                            Expiring Soon
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {voucher.category}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        {voucher.headline && (
                          <div className="text-[11px] font-black uppercase tracking-wider text-[#ED1C24]">
                            {voucher.headline}
                          </div>
                        )}
                        <h4 className="text-base sm:text-lg font-black text-gray-900 leading-snug group-hover:text-[#ED1C24] transition-colors">
                          {voucher.title}
                        </h4>
                        {voucher.subHeadline && (
                          <p className="text-xs font-semibold text-gray-500">
                            {voucher.subHeadline}
                          </p>
                        )}
                      </div>

                      {voucher.highlights && voucher.highlights.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
                          {voucher.highlights.slice(0, 4).map((hl, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-600 font-medium">
                              <span className="text-[#ED1C24] shrink-0">
                                {getHighlightIcon(hl.icon)}
                              </span>
                              <span className="truncate">{hl.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-dashed border-gray-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>Expires: <strong className="text-gray-800">{voucher.validUntil}</strong></span>
                      </div>

                      <span className="text-[11px] font-bold text-gray-400">
                        Cost: <strong className="text-gray-900">{voucher.pointsCost.toLocaleString()} Pts</strong>
                      </span>
                    </div>
                  </div>

                  {/* RIGHT TEAR-OFF COUPON STUB */}
                  <div className="sm:w-56 bg-gradient-to-br from-[#ED1C24] via-[#D31820] to-[#990000] text-white p-4 sm:p-5 flex flex-col justify-between relative border-t sm:border-t-0 sm:border-l border-dashed border-red-300/40">
                    <div className="hidden sm:block absolute -top-2.5 -left-2.5 w-5 h-5 bg-white rounded-full border-r border-b border-gray-200/90 z-10" />
                    <div className="hidden sm:block absolute -bottom-2.5 -left-2.5 w-5 h-5 bg-white rounded-full border-r border-t border-gray-200/90 z-10" />

                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                        <Star className="w-3 h-3 fill-amber-300" />
                        DIALOG STARPOINTS
                        <Star className="w-3 h-3 fill-amber-300" />
                      </div>

                      <div className="inline-block px-2 py-0.5 rounded bg-black/25 text-[10px] font-black uppercase tracking-wider text-white">
                        ★ VOUCHER ★
                      </div>

                      <div className="pt-1 font-black text-lg sm:text-xl tracking-tight text-white leading-tight">
                        {voucher.stubValue || voucher.discountOrValue}
                      </div>

                      <div className="text-[9px] uppercase font-bold text-red-100/80 leading-tight">
                        {voucher.validityDaysText || 'Redeem with StarPoints'}
                      </div>
                    </div>

                    <div className="my-2 bg-white rounded-xl p-2 text-center shadow-inner text-gray-900 relative">
                      <div className="text-[9px] font-black uppercase tracking-wider text-gray-400">
                        VOUCHER CODE
                      </div>
                      <div className="font-mono text-xs sm:text-sm font-black text-[#ED1C24] tracking-wider mt-0.5 truncate">
                        {voucher.code}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleCopyCode(e, voucher.code)}
                        className="mt-1 w-full py-1 px-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {copiedCode === voucher.code ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-gray-500" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="pt-1 flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectVoucher(voucher);
                        }}
                        className="w-full py-1.5 px-2 rounded-xl bg-white text-[#ED1C24] hover:bg-red-50 text-xs font-black transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>View Pass</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info & View All */}
      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-gray-400 shrink-0" />
          <span>Present digital voucher codes at participating merchant outlets or enter online for instant checkout credits.</span>
        </div>

        <button
          type="button"
          onClick={onViewAllVouchers}
          id="btn-view-all-vouchers"
          className="inline-flex items-center gap-1 font-bold text-[#ED1C24] hover:text-[#C9141B] transition-colors cursor-pointer shrink-0"
        >
          <span>Refresh Vouchers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
