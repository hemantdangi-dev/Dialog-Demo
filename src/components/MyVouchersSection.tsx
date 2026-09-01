import React, { useState } from 'react';
import { MY_VOUCHERS } from '../data/mockData';
import { VoucherItem, VoucherStatus } from '../types';
import { Ticket, Calendar, CheckCircle2, Clock, AlertTriangle, ArrowRight, Sparkles, QrCode } from 'lucide-react';

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
  const [filter, setFilter] = useState<'all' | 'available' | 'used' | 'expiring_soon'>('all');

  const filteredVouchers = vouchers.filter((v) => {
    if (filter === 'all') return true;
    return v.status === filter;
  });

  const getStatusBadge = (status: VoucherStatus, label: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/80 px-2.5 py-0.5 rounded-full shadow-2xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Available
          </span>
        );
      case 'expiring_soon':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full shadow-2xs">
            <Clock className="w-3 h-3 text-amber-600" />
            Expiring Soon
          </span>
        );
      case 'used':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full">
            Used
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 border border-red-200 px-2.5 py-0.5 rounded-full">
            Expired
          </span>
        );
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7" id="vouchers-section">
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED1C24]">
            Rewards & Coupons
          </span>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            My Vouchers
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white text-gray-900 shadow-2xs'
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
                ? 'bg-white text-gray-900 shadow-2xs'
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
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Expiring ({vouchers.filter((v) => v.status === 'expiring_soon').length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('used')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'used'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Used ({vouchers.filter((v) => v.status === 'used').length})
          </button>
        </div>
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredVouchers.map((voucher) => {
          const isUsed = voucher.status === 'used';

          return (
            <div
              key={voucher.id}
              onClick={() => onSelectVoucher(voucher)}
              className={`rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                isUsed
                  ? 'bg-gray-50/80 border-gray-200 opacity-75'
                  : voucher.status === 'expiring_soon'
                  ? 'bg-gradient-to-b from-amber-50/50 to-white border-amber-300 shadow-2xs hover:shadow-xs'
                  : 'bg-white hover:bg-slate-50/50 border-gray-200/90 shadow-2xs hover:shadow-xs hover:border-red-200'
              }`}
            >
              {/* Top Header */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {voucher.partnerName}
                  </span>
                  {getStatusBadge(voucher.status, voucher.statusLabel)}
                </div>

                {/* Title & Value */}
                <div className="mt-3">
                  <h4 className="text-lg font-black text-gray-900 leading-tight group-hover:text-[#ED1C24] transition-colors">
                    {voucher.title}
                  </h4>
                  <div className="text-sm font-bold text-gray-600 mt-1">
                    {voucher.discountOrValue}
                  </div>
                </div>

                {/* Code & Valid Until */}
                <div className="mt-4 bg-gray-50 rounded-xl p-2.5 border border-dashed border-gray-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-gray-500" />
                    <span className="font-mono text-xs font-bold text-gray-800">
                      {voucher.code}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    Tap for QR
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {isUsed ? (
                    <span>Redeemed: <strong className="text-gray-700">{voucher.redeemedDate}</strong></span>
                  ) : (
                    <span>Expires: <strong className="text-gray-700">{voucher.validUntil}</strong></span>
                  )}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500">
                  Cost: {voucher.pointsCost.toLocaleString()} Pts
                </span>

                {isUsed ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVoucher(voucher);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    <span>View Receipt</span>
                  </button>
                ) : voucher.status === 'available' && voucher.category === 'Reload' ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUseVoucher(voucher);
                    }}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Use Voucher</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVoucher(voucher);
                    }}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>View Voucher</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Present digital voucher codes at participating partner counters or redeem online for Dialog reloads.
        </span>

        <button
          type="button"
          onClick={onViewAllVouchers}
          id="btn-view-all-vouchers"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ED1C24] hover:text-[#C9141B] transition-colors cursor-pointer"
        >
          <span>View All Vouchers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
