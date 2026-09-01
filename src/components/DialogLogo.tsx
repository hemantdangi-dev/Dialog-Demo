import React from 'react';

interface DialogLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showStarPointsBadge?: boolean;
  variant?: 'light' | 'dark';
}

export const DialogLogo: React.FC<DialogLogoProps> = ({
  size = 'md',
  showStarPointsBadge = true,
  variant = 'light',
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const badgeSizes = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-sm px-2.5 py-1',
  };

  return (
    <div className="flex items-center gap-2.5 select-none group cursor-pointer" id="dialog-official-logo">
      {/* 1. Official Axiata 3D Prism Icon (Straight & Sharp Matching Reference Image) */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-Left Yellow Triangle (Peak) */}
          <polygon points="18,6 52,24 18,38" fill="#FFBF00" />
          <polygon points="18,38 52,24 52,52" fill="#FFA000" />

          {/* Top-Right Orange Diamond Facet */}
          <polygon points="52,24 84,40 52,52" fill="#FF5500" />

          {/* Middle-Right Purple / Plum Facet */}
          <polygon points="52,52 84,40 84,68 52,68" fill="#7E247D" />
          <polygon points="52,68 84,68 68,82 52,78" fill="#5F1662" />

          {/* Bottom-Left Magenta / Hot Pink Diamond Facet */}
          <polygon points="18,66 52,52 52,78 18,78" fill="#E6007E" />
          <polygon points="18,78 52,78 36,96 18,86" fill="#C50068" />
        </svg>
      </div>

      {/* 2. Official Dialog Red Wordmark (Standard, Clean, Straight Typography) */}
      <div className="flex items-center">
        <span
          className={`font-black tracking-tight text-[#ED1C24] select-none flex items-center leading-none ${textSizes[size]}`}
          style={{ fontFamily: '"Outfit", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        >
          {/* Custom Styled 'D' with the characteristic Dialog top-left wing flare */}
          <span className="relative inline-block font-black text-[#ED1C24] mr-[-0.5px]">
            <svg
              className="absolute -top-[14%] -left-[24%] w-[55%] h-[32%] pointer-events-none"
              viewBox="0 0 20 12"
              fill="#ED1C24"
            >
              <path d="M0 4 C4 1, 12 0, 20 0 L20 12 C14 12, 6 10, 0 4 Z" />
            </svg>
            D
          </span>
          <span className="font-extrabold tracking-tight text-[#ED1C24]">ialog</span>
        </span>
      </div>

      {/* 3. Star Points Brand Badge */}
      {showStarPointsBadge && (
        <div className="flex items-center ml-1">
          <span
            className={`inline-flex items-center gap-1 font-bold rounded-full border shadow-xs transition-transform group-hover:scale-105 ${
              isLight
                ? 'bg-amber-50 text-amber-900 border-amber-300/80'
                : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
            } ${badgeSizes[size]}`}
          >
            <svg className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-semibold tracking-wide whitespace-nowrap">Star Points</span>
          </span>
        </div>
      )}
    </div>
  );
};



