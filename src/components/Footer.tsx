import React from 'react';
import { DialogLogo } from './DialogLogo';
import { ShieldCheck, PhoneCall, Smartphone, HelpCircle, ExternalLink, Heart, Globe, Award } from 'lucide-react';

interface FooterProps {
  onOpenHelp: () => void;
  onOpenTiers: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHelp, onOpenTiers }) => {
  return (
    <footer className="bg-slate-950 text-white mt-16 border-t border-gray-800">
      {/* Top Value Banner */}
      <div className="border-b border-gray-800/80 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 text-[#ED1C24] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Sri Lanka’s #1 Loyalty</div>
              <p className="text-gray-400 mt-0.5">Over 15 million Dialog customers earning Star Points daily.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Instant USSD #141#</div>
              <p className="text-gray-400 mt-0.5">Free balance checks, transfers & redemptions on any handset.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">1,000+ Partner Outlets</div>
              <p className="text-gray-400 mt-0.5">Redeem at Cargills, Keells, KFC, Vision Care and more.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">24/7 Hotline 1777</div>
              <p className="text-gray-400 mt-0.5">Priority customer support for Gold & Club Vision members.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <DialogLogo className="h-8" />
              <div className="border-l border-gray-700 pl-3">
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Star Points
                </span>
                <span className="text-[10px] text-gray-400 block">
                  Dialog Axiata PLC
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Dialog Star Points is Sri Lanka’s premier customer loyalty rewards program. Earn points on every mobile reload, broadband bill, and at partner merchant locations islandwide.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-gray-400">
              <span>Official Links:</span>
              <a
                href="https://dialog.lk/starpoints"
                target="_blank"
                rel="noreferrer"
                className="text-[#ED1C24] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                dialog.lk/starpoints
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 1: Loyalty */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
              Loyalty Program
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button type="button" onClick={onOpenTiers} className="hover:text-white transition-colors">
                  Tier Structure & Multipliers
                </button>
              </li>
              <li>
                <a href="https://dialog.lk/starpoints" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Partner Merchant Directory
                </a>
              </li>
              <li>
                <a href="https://dialog.lk/starpoints" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  FlySMILES Conversions
                </a>
              </li>
              <li>
                <a href="https://dialog.lk/starpoints" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Club Vision Privileges
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Dialog Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
              Dialog Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="https://dialog.lk/mobile" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Mobile Prepaid & Postpaid
                </a>
              </li>
              <li>
                <a href="https://dialog.lk/home-broadband" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Home Broadband & 5G
                </a>
              </li>
              <li>
                <a href="https://dialog.lk/dialog-television" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Dialog Television
                </a>
              </li>
              <li>
                <a href="https://dialog.lk/genie" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Genie Digital Banking & QR
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
              Support & Quick Dial
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button type="button" onClick={onOpenHelp} className="hover:text-white transition-colors">
                  Dial #141# USSD Codes
                </button>
              </li>
              <li>
                <a href="tel:1777" className="hover:text-white transition-colors">
                  Dialog Hotline: 1777
                </a>
              </li>
              <li>
                <button type="button" onClick={onOpenHelp} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenHelp} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Experience Disclaimer - Mandatory Requirement */}
        <div className="mt-10 pt-6 border-t border-gray-800/80">
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200/90 flex items-start sm:items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="leading-relaxed">
              <strong className="text-amber-300 font-bold">Demo Experience:</strong> Customer information, transactions, points balances, vouchers, and rewards shown on this page are sample data for demonstration purposes representing <strong>Priya Sharma</strong> (077 123 4567, Gold Member).
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Dialog Axiata PLC. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Powered by Dialog Axiata Digital Experience Platform
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
