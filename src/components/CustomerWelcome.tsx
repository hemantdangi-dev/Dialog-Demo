import React from 'react';
import { CustomerProfile } from '../types';
import { User, Phone, Mail, Calendar, Edit3, ShieldCheck, CheckCircle2, Copy } from 'lucide-react';

interface CustomerWelcomeProps {
  profile: CustomerProfile;
  onViewProfile: () => void;
  onEditProfile: () => void;
}

export const CustomerWelcome: React.FC<CustomerWelcomeProps> = ({
  profile,
  onViewProfile,
  onEditProfile,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(profile.rawMobile);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-5 sm:p-7 relative overflow-hidden">
      {/* Background subtle decorative pattern */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-100/30 via-red-50/20 to-transparent rounded-bl-full pointer-events-none -mr-16 -mt-16" />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
        {/* Left: Avatar + Customer Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          {/* Avatar with Gold Tier Ring */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden ring-4 ring-amber-400/80 shadow-md bg-amber-50">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-lg px-2 py-0.5 text-[11px] font-extrabold shadow-xs flex items-center gap-1 border border-white">
              <span>★</span>
              <span>GOLD</span>
            </div>
          </div>

          {/* Salutation & Info */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-600" />
                Verified Dialog Loyalty Member
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {profile.salutation}
            </h1>
            
            <p className="text-gray-600 font-medium mt-0.5 flex items-center gap-2 text-sm sm:text-base">
              <span className="font-bold text-gray-800">{profile.name}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">Club Vision Gold</span>
            </p>

            {/* Contact Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200/80 rounded-lg px-2.5 py-1">
                <Phone className="w-3.5 h-3.5 text-[#ED1C24]" />
                <span className="font-semibold text-gray-800">{profile.mobileNumber}</span>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="text-gray-400 hover:text-gray-700 ml-1 transition-colors"
                  title="Copy mobile number"
                >
                  {copied ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200/80 rounded-lg px-2.5 py-1">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>{profile.email}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200/80 rounded-lg px-2.5 py-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <span>Customer Since: <strong className="text-gray-700">{profile.customerSince}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
          <button
            type="button"
            onClick={onViewProfile}
            id="btn-view-profile"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <User className="w-4 h-4 text-gray-300" />
            View Profile
          </button>

          <button
            type="button"
            onClick={onEditProfile}
            id="btn-edit-profile"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-sm font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-gray-600" />
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};
