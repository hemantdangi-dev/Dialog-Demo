import React, { useState } from 'react';
import { DialogLogo } from './DialogLogo';
import { CustomerProfile } from '../types';
import {
  Bell,
  HelpCircle,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Smartphone,
  PhoneCall,
  ShieldCheck,
  LogOut,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  profile: CustomerProfile;
  activeNavTab: string;
  onNavTabClick: (tabId: string) => void;
  onProfileClick: () => void;
  onHelpClick: () => void;
  onNotificationsClick: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeNavTab,
  onNavTabClick,
  onProfileClick,
  onHelpClick,
  onNotificationsClick,
  unreadNotificationsCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'points', label: 'Points' },
    { id: 'vouchers', label: 'Vouchers' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'transactions', label: 'Transactions' },
  ];

  const handleNavClick = (tabId: string) => {
    onNavTabClick(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Dialog Logo & Star Points Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => handleNavClick('overview')}
              className="flex items-center gap-3 cursor-pointer group text-left"
              title="Dialog Star Points Loyalty Portal"
            >
              <DialogLogo className="h-7 sm:h-9" />
              <div className="hidden sm:block border-l border-gray-300 pl-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-900 leading-none">
                    Star Points
                  </span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded">
                    GOLD
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-medium leading-tight block mt-0.5">
                  Customer Loyalty
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeNavTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer relative ${
                    isActive
                      ? 'text-[#ED1C24] bg-red-50/80 shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#ED1C24] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Notifications, Help, Profile Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Help / USSD #141# Button */}
            <button
              type="button"
              onClick={onHelpClick}
              id="btn-header-help"
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer relative"
              title="Help & USSD Dial Codes"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Notification Bell with Badge */}
            <button
              type="button"
              onClick={onNotificationsClick}
              id="btn-header-notifications"
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ED1C24] rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Profile Dropdown / Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                id="btn-header-profile-menu"
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden ring-2 ring-amber-400 bg-amber-50 shrink-0">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-gray-900 leading-none truncate max-w-[90px]">
                    {profile.name}
                  </div>
                  <div className="text-[10px] font-bold text-amber-700 leading-tight mt-0.5">
                    {profile.tier} Tier
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                    <p className="text-sm font-black text-gray-900">{profile.name}</p>
                    <p className="text-xs font-mono text-gray-600">{profile.mobileNumber}</p>
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                      ★ Gold Member ({profile.pointsBalance.toLocaleString()} Pts)
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={onProfileClick}
                      className="w-full px-4 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      Customer Profile & Settings
                    </button>
                    <button
                      type="button"
                      onClick={onHelpClick}
                      className="w-full px-4 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4 text-gray-500" />
                      Dial #141# USSD / 1777 Help
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      type="button"
                      onClick={() => alert('Demo Experience: Priya Sharma is currently logged in.')}
                      className="w-full px-4 py-2 text-left text-xs font-semibold text-gray-500 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Switch Demo Profile
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-mobile-menu-toggle"
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mb-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-900">Priya Sharma (Gold)</div>
              <div className="text-xs text-amber-700">{profile.pointsBalance.toLocaleString()} Star Points Available</div>
            </div>
            <button
              type="button"
              onClick={() => {
                onProfileClick();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-[#ED1C24] underline"
            >
              Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = activeNavTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                    isActive
                      ? 'bg-[#ED1C24] text-white shadow-xs'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>USSD: Dial #141#</span>
            <span>Dialog Hotline: 1777</span>
          </div>
        </div>
      )}
    </header>
  );
};
