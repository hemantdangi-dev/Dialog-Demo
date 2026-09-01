import React, { useState } from 'react';
import { POINTS_ACTIVITY_CHART } from '../data/mockData';
import { PointsChartPoint } from '../types';
import { BarChart3, TrendingUp, Sparkles, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

type TimeframeOption = '7days' | '30days' | '6months' | '12months';

export const PointsActivityChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('6months');
  const [hoveredPoint, setHoveredPoint] = useState<PointsChartPoint | null>(null);

  const data = POINTS_ACTIVITY_CHART[timeframe];

  // Calculations for scale
  const maxEarned = Math.max(...data.map((d) => d.earned), 1000);
  const maxRedeemed = Math.max(...data.map((d) => d.redeemed), 500);
  const maxValue = Math.max(maxEarned, maxRedeemed, 3500);

  const totalEarned = data.reduce((acc, curr) => acc + curr.earned, 0);
  const totalRedeemed = data.reduce((acc, curr) => acc + curr.redeemed, 0);

  return (
    <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-7" id="points-activity-section">
      {/* Header with Title and Timeframe Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ED1C24]">
              Analytics
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Live Accrual Tracker
            </span>
          </div>

          <h3 className="text-xl font-black text-gray-900 tracking-tight mt-0.5">
            Points Activity
          </h3>
        </div>

        {/* Timeframe Switcher Tabs */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setTimeframe('7days')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              timeframe === '7days'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Last 7 Days
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('30days')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              timeframe === '30days'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Last 30 Days
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('6months')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              timeframe === '6months'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Last 6 Months
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('12months')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              timeframe === '12months'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Last 12 Months
          </button>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 bg-slate-50/80 p-3 sm:p-4 rounded-xl border border-slate-200/70">
        <div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Total Earned in Period
          </div>
          <div className="text-lg sm:text-xl font-black text-emerald-700 mt-0.5 flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" />
            +{totalEarned.toLocaleString()} Pts
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Total Redeemed in Period
          </div>
          <div className="text-lg sm:text-xl font-black text-purple-700 mt-0.5 flex items-center gap-1">
            <ArrowDownRight className="w-4 h-4" />
            -{totalRedeemed.toLocaleString()} Pts
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 pt-2 sm:pt-0">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Avg. Monthly Earn Rate
          </div>
          <div className="text-lg sm:text-xl font-black text-[#ED1C24] mt-0.5 flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            ~2,650 Pts
          </div>
        </div>
      </div>

      {/* Chart Visual Graphic (Interactive SVG Bars) */}
      <div className="relative pt-6 pb-2">
        {/* Active Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-0 right-4 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-3 z-20 pointer-events-none">
            <span className="font-bold text-amber-300">{hoveredPoint.period}:</span>
            <span className="text-emerald-400">+{hoveredPoint.earned.toLocaleString()} earned</span>
            {hoveredPoint.redeemed > 0 && (
              <span className="text-purple-300">-{hoveredPoint.redeemed.toLocaleString()} redeemed</span>
            )}
          </div>
        )}

        {/* Bars Container */}
        <div className="h-56 sm:h-64 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-gray-200">
          {data.map((item, index) => {
            const earnedHeight = Math.max(8, (item.earned / maxValue) * 100);
            const redeemedHeight = item.redeemed > 0 ? Math.max(8, (item.redeemed / maxValue) * 100) : 0;

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                onMouseEnter={() => setHoveredPoint(item)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Value Label on Hover or High Earn */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 text-[11px] font-mono font-bold text-gray-800 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-xs pointer-events-none whitespace-nowrap z-10">
                  +{item.earned.toLocaleString()}
                </div>

                {/* Bars Pair */}
                <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-full">
                  {/* Earned Bar (Dialog Red / Coral Gradient) */}
                  <div
                    className="w-full max-w-[20px] rounded-t-md bg-gradient-to-t from-[#ED1C24] to-[#FF6B6B] transition-all duration-300 group-hover:brightness-110 shadow-2xs"
                    style={{ height: `${earnedHeight}%` }}
                  />

                  {/* Redeemed Bar (Purple / Plum) */}
                  {item.redeemed > 0 && (
                    <div
                      className="w-full max-w-[20px] rounded-t-md bg-gradient-to-t from-purple-700 to-purple-400 transition-all duration-300 group-hover:brightness-110 shadow-2xs opacity-80"
                      style={{ height: `${redeemedHeight}%` }}
                    />
                  )}
                </div>

                {/* X-Axis Label */}
                <span className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-2 truncate w-full text-center group-hover:text-gray-900 group-hover:font-bold">
                  {item.period}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-xs font-semibold text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#ED1C24]" />
            <span>Points Earned (Dialog Reloads & Bills)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-purple-700" />
            <span>Points Redeemed (Vouchers & Offers)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
