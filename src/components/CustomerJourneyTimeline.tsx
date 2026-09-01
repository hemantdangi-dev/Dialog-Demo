import React from 'react';
import { CUSTOMER_JOURNEY_TIMELINE } from '../data/mockData';
import { Smartphone, Gift, Utensils, Crown, ArrowUpRight, ArrowDownRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const CustomerJourneyTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-4 h-4 text-[#ED1C24]" />;
      case 'Gift':
        return <Gift className="w-4 h-4 text-purple-600" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'Crown':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7" id="journey-timeline-section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ED1C24]">
            Milestones
          </span>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Priya's Star Points Journey
          </h3>
        </div>

        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Member Since Jan 2024
        </span>
      </div>

      {/* Horizontal / Vertical Stepper Layout */}
      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {CUSTOMER_JOURNEY_TIMELINE.map((event, index) => {
            return (
              <div
                key={event.id}
                className={`p-4 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between ${
                  event.isTierChange
                    ? 'bg-gradient-to-b from-amber-500/10 via-amber-50 to-white border-amber-400 shadow-xs ring-2 ring-amber-400/20'
                    : 'bg-slate-50/70 hover:bg-white border-gray-200/80 shadow-2xs'
                }`}
              >
                <div>
                  {/* Top: Date + Icon Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-500">
                      {event.date}
                    </span>

                    <div
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
                        event.isTierChange
                          ? 'bg-amber-100 border-amber-300'
                          : event.isPositive
                          ? 'bg-red-50 border-red-100'
                          : 'bg-purple-50 border-purple-100'
                      }`}
                    >
                      {getIcon(event.iconName)}
                    </div>
                  </div>

                  {/* Points / Badge */}
                  <div className="mb-2">
                    {event.isTierChange ? (
                      <span className="inline-flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                        <Crown className="w-3 h-3 text-amber-700" />
                        Tier Upgrade
                      </span>
                    ) : event.isPositive ? (
                      <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-mono">
                        <ArrowUpRight className="w-3 h-3" />
                        {event.pointsChange}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full font-mono">
                        <ArrowDownRight className="w-3 h-3" />
                        {event.pointsChange}
                      </span>
                    )}
                  </div>

                  {/* Event Title */}
                  <h4 className="text-sm font-bold text-gray-900 leading-snug">
                    {event.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 border-t border-gray-100 pt-2">
                  {event.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
