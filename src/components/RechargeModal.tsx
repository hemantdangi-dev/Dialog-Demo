import React, { useState } from 'react';
import { CustomerProfile } from '../types';
import { RECHARGE_PRESETS, PAYMENT_METHODS } from '../data/mockData';
import { X, Smartphone, CreditCard, Star, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CustomerProfile;
  onConfirmRecharge: (amount: number, pointsEarned: number, paymentMethod: string) => void;
}

export const RechargeModal: React.FC<RechargeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onConfirmRecharge,
}) => {
  const [mobileNumber, setMobileNumber] = useState(profile.mobileNumber);
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('card');
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastRechargeDetails, setLastRechargeDetails] = useState<{ amount: number; points: number } | null>(null);

  if (!isOpen) return null;

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  // Gold Tier earn rate: 50% points per Rs. (i.e. Rs. 1,000 = 500 points at 1.5x)
  const calculatedPoints = Math.round(currentAmount * 0.5);

  const handleRechargeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount < 50) return;

    const paymentLabel = PAYMENT_METHODS.find((p) => p.id === selectedPayment)?.title || 'Credit Card';
    onConfirmRecharge(currentAmount, calculatedPoints, paymentLabel);
    setLastRechargeDetails({ amount: currentAmount, points: calculatedPoints });
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#ED1C24] text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-100 bg-black/20 px-2 py-0.5 rounded">
              Dialog Axiata Online Reload
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            Recharge & Earn Points
          </h3>

          <p className="text-xs text-red-100 mt-0.5">
            Gold Tier Member • 1.5x Accelerated Star Points Multiplier
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isSuccess && lastRechargeDetails ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-black text-gray-900">
                  Recharge Successful!
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Reload of <strong>Rs. {lastRechargeDetails.amount.toLocaleString()}</strong> completed for <strong>{mobileNumber}</strong>.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-900 text-center">
                <span className="text-xs font-bold uppercase tracking-wider block">Star Points Credited</span>
                <span className="text-2xl font-black font-mono text-amber-800">
                  +{lastRechargeDetails.points.toLocaleString()} Points
                </span>
                <p className="text-[11px] text-amber-700 mt-1">
                  Added instantly to Priya Sharma's loyalty balance.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleRechargeSubmit} className="space-y-4">
              {/* Mobile Number Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Dialog Mobile Number
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#ED1C24] focus:ring-2 focus:ring-red-100 outline-hidden text-sm font-bold text-gray-900"
                    placeholder="077 123 4567"
                    required
                  />
                </div>
              </div>

              {/* Amount Presets */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Select Reload Amount (LKR)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {RECHARGE_PRESETS.map((preset) => {
                    const isSelected = selectedAmount === preset.amount && !customAmount;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(preset.amount);
                          setCustomAmount('');
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#ED1C24] text-white border-[#ED1C24] shadow-xs'
                            : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-xs font-black">{preset.label}</div>
                        <div className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-red-100' : 'text-emerald-700'}`}>
                          +{preset.bonusPoints} pts
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calculated Reward Notification */}
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-amber-900 font-semibold">You will earn:</span>
                </div>
                <span className="font-mono font-black text-amber-900 text-sm">
                  +{calculatedPoints} Star Points
                </span>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Payment Method
                </label>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedPayment === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#ED1C24] bg-red-50/50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            checked={isSelected}
                            onChange={() => setSelectedPayment(method.id)}
                            className="text-[#ED1C24] focus:ring-red-500"
                          />
                          <div>
                            <div className="text-xs font-bold text-gray-900">{method.title}</div>
                            <div className="text-[11px] text-gray-500">{method.description}</div>
                          </div>
                        </div>

                        {method.badge && (
                          <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                            {method.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-gray-100">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Pay Rs. {currentAmount.toLocaleString()} & Earn {calculatedPoints} Points</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
