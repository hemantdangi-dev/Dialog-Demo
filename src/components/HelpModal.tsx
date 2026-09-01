import React from 'react';
import { X, PhoneCall, Smartphone, HelpCircle, ShieldAlert, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const ussdCodes = [
    { code: '#141#', desc: 'Main Star Points USSD Menu (Check balance, redeem)' },
    { code: '#141*1#', desc: 'Instant Star Points Balance Check' },
    { code: '#141*2#', desc: 'Star Points Transfer to another Dialog mobile' },
    { code: '#141*5#', desc: 'Check Star Points Expiry Date & Threshold' },
    { code: '1777', desc: 'Dialog 24/7 Priority Customer Care' },
  ];

  const faqs = [
    {
      q: 'What is 1 Star Point worth in Sri Lankan Rupees?',
      a: '1 Star Point is equivalent to exactly Rs. 1.00 LKR. Points can be used 1:1 for Dialog bill payments, prepaid reloads, or partner discounts.',
    },
    {
      q: 'How do I earn Star Points?',
      a: 'Points are automatically accrued every time you reload, pay Dialog bills, or present your registered phone number at 1,000+ partner outlets.',
    },
    {
      q: 'When do Star Points expire?',
      a: 'Star Points remain valid for a rolling period. You will always receive SMS warnings 45 days prior to any points expiration.',
    },
  ];

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
              Dialog Star Points Support
            </span>
          </div>

          <h3 className="text-xl font-black text-white">
            Help & USSD Quick Dial
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Quick dial codes and loyalty guidelines for Dialog customers
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* USSD Codes */}
          <div>
            <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#ED1C24]" />
              USSD Short Codes (Free from Dialog SIM)
            </h5>
            <div className="space-y-2">
              {ussdCodes.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-3 text-xs"
                >
                  <span className="text-gray-600">{item.desc}</span>
                  <span className="font-mono font-black text-gray-900 bg-white px-2 py-1 rounded border border-gray-300 shrink-0">
                    {item.code}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              Frequently Asked Questions
            </h5>
            <div className="space-y-2.5">
              {faqs.map((faq, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-gray-200/80 text-xs">
                  <div className="font-bold text-gray-900 mb-1">{faq.q}</div>
                  <div className="text-gray-600 leading-relaxed">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Care Contact */}
          <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-gray-900 block">Need Personalized Assistance?</span>
              <span className="text-gray-600">Dial 1777 (Dialog Priority Hotline)</span>
            </div>
            <a
              href="tel:1777"
              className="px-3.5 py-1.5 rounded-xl bg-[#ED1C24] text-white font-bold shadow-xs flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Call 1777
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
