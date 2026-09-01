import React, { useState } from 'react';
import { CustomerProfile } from '../types';
import { X, Sparkles, CheckCircle2, Gift, Smartphone, ShoppingBag, Utensils, Plane, AlertCircle } from 'lucide-react';

interface RedeemPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CustomerProfile;
  onConfirmRedemption: (points: number, title: string, category: string) => void;
}

export const RedeemPointsModal: React.FC<RedeemPointsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onConfirmRedemption,
}) => {
  const [selectedReward, setSelectedReward] = useState<{
    id: string;
    title: string;
    points: number;
    category: string;
    description: string;
    partner: string;
  } | null>(null);

  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [redeemedDetails, setRedeemedDetails] = useState<{ title: string; points: number } | null>(null);

  if (!isOpen) return null;

  const redemptionOptions = [
    {
      id: 'opt-1',
      title: 'Rs. 500 Dialog Mobile Reload',
      points: 500,
      category: 'Reloads',
      description: 'Direct credit to your 077 123 4567 Dialog connection.',
      partner: 'Dialog Mobile',
      icon: Smartphone,
    },
    {
      id: 'opt-2',
      title: 'Rs. 1,000 Dialog Mobile Reload',
      points: 1000,
      category: 'Reloads',
      description: 'Instant reload to your registered mobile connection.',
      partner: 'Dialog Mobile',
      icon: Smartphone,
    },
    {
      id: 'opt-3',
      title: 'Rs. 1,000 Cargills FoodCity Voucher',
      points: 1000,
      category: 'Partner Rewards',
      description: 'Supermarket e-Voucher redeemable at any outlet.',
      partner: 'Cargills FoodCity',
      icon: ShoppingBag,
    },
    {
      id: 'opt-4',
      title: 'Rs. 750 KFC & Pizza Hut Voucher',
      points: 750,
      category: 'Partner Rewards',
      description: 'Delicious family dining voucher with instant QR.',
      partner: 'KFC Sri Lanka',
      icon: Utensils,
    },
    {
      id: 'opt-5',
      title: '500 SriLankan FlySMILES Miles',
      points: 1000,
      category: 'Partner Rewards',
      description: 'Direct frequent flyer mile conversion for holiday trips.',
      partner: 'SriLankan Airlines',
      icon: Plane,
    },
  ];

  const handleSelect = (opt: typeof redemptionOptions[0]) => {
    setSelectedReward(opt);
    setStep('confirm');
  };

  const handleConfirm = () => {
    if (!selectedReward) return;
    onConfirmRedemption(selectedReward.points, selectedReward.title, selectedReward.category);
    setRedeemedDetails({ title: selectedReward.title, points: selectedReward.points });
    setStep('success');
  };

  const handleReset = () => {
    setStep('select');
    setSelectedReward(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-700 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200 bg-black/20 px-2 py-0.5 rounded">
              Star Points Redemption Center
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            Redeem Star Points
          </h3>

          <div className="mt-3 flex items-center justify-between bg-black/20 p-3 rounded-2xl border border-white/10 text-xs">
            <div>
              <span className="text-amber-200 text-[10px] uppercase font-bold block">Available Balance</span>
              <span className="text-lg font-black text-white">{profile.pointsBalance.toLocaleString()} Pts</span>
            </div>
            <div className="text-right">
              <span className="text-amber-200 text-[10px] uppercase font-bold block">Value (1 Pt = Rs. 1)</span>
              <span className="text-sm font-bold text-white">Rs. {profile.pointsBalance.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {step === 'select' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500 font-medium">
                Choose a reward or voucher to redeem instantly using your Star Points balance:
              </p>

              <div className="space-y-2.5">
                {redemptionOptions.map((opt) => {
                  const Icon = opt.icon;
                  const canAfford = profile.pointsBalance >= opt.points;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => canAfford && handleSelect(opt)}
                      className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                        canAfford
                          ? 'border-gray-200 hover:border-amber-400 hover:bg-amber-50/40 cursor-pointer shadow-2xs hover:shadow-xs'
                          : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{opt.title}</h4>
                          <p className="text-xs text-gray-500">{opt.description}</p>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">{opt.partner}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-black font-mono text-amber-700">
                          {opt.points.toLocaleString()} Pts
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Instant
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 'confirm' && selectedReward && (
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Confirm Redemption
                </span>
                <h4 className="text-lg font-black text-gray-900 mt-1">
                  {selectedReward.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {selectedReward.description}
                </p>

                <div className="my-4 py-3 border-y border-amber-200 flex items-center justify-around text-xs">
                  <div>
                    <span className="text-gray-500 block">Deduction</span>
                    <strong className="text-amber-800 font-mono font-black text-base">-{selectedReward.points} Pts</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Remaining Balance</span>
                    <strong className="text-emerald-700 font-mono font-black text-base">
                      {(profile.pointsBalance - selectedReward.points).toLocaleString()} Pts
                    </strong>
                  </div>
                </div>

                <div className="text-[11px] text-gray-500 text-left bg-white p-3 rounded-xl border border-amber-100">
                  By clicking confirm, Star Points will be deducted from your account. Voucher code will be delivered instantly via SMS to <strong>{profile.mobileNumber}</strong>.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shadow-md transition-all cursor-pointer"
                >
                  Confirm & Redeem
                </button>
              </div>
            </div>
          )}

          {step === 'success' && redeemedDetails && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-black text-gray-900">
                  Redemption Successful!
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  You have successfully redeemed <strong>{redeemedDetails.points.toLocaleString()} Star Points</strong> for <strong>{redeemedDetails.title}</strong>.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs text-left space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Voucher Reference:</span>
                  <span className="font-mono font-bold text-gray-900">SP-RED-2026-CONFIRM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">SMS Confirmation sent to:</span>
                  <span className="font-bold text-gray-900">{profile.mobileNumber}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 px-4 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Done / Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
