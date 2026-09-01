import React, { useState } from 'react';
import { CustomerProfile } from '../types';
import { X, User, Phone, Mail, Calendar, ShieldCheck, CheckCircle2, Save, BellRing, Lock } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CustomerProfile;
  onSaveProfile: (updated: Partial<CustomerProfile>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [mobile, setMobile] = useState(profile.mobileNumber);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({ name, email, mobileNumber: mobile });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150 relative max-h-[90vh] flex flex-col"
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

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
              Account Preferences
            </span>
          </div>

          <h3 className="text-xl font-black text-white">
            Customer Profile & Settings
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage your Star Points registration and notifications
          </p>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {savedSuccess && (
            <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Profile updated successfully!
            </div>
          )}

          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-amber-400 bg-amber-50 shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">{profile.name}</div>
              <div className="text-xs text-amber-700 font-semibold">{profile.tier} Member • {profile.customerSince}</div>
              <div className="text-[11px] text-gray-500 font-mono">12,450 Star Points</div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#ED1C24] focus:ring-2 focus:ring-red-100 outline-hidden text-sm font-semibold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Registered Dialog Mobile Number
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#ED1C24] focus:ring-2 focus:ring-red-100 outline-hidden text-sm font-semibold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#ED1C24] focus:ring-2 focus:ring-red-100 outline-hidden text-sm font-semibold"
              required
            />
          </div>

          {/* Preferences */}
          <div className="pt-2 border-t border-gray-100">
            <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Notification Preferences
            </h5>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2.5">
                <BellRing className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="text-xs font-bold text-gray-900">SMS Points Alerts</div>
                  <div className="text-[11px] text-gray-500">Receive instant SMS upon reload / redemption</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-[#ED1C24] rounded focus:ring-red-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
