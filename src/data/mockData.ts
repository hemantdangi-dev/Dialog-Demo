import {
  CustomerProfile,
  TierDefinition,
  PointsChartPoint,
  LoyaltyTransaction,
  RechargeRecord,
  VoucherItem,
  PromotionItem,
  TierBenefitCard,
  RedemptionRecord,
  RecommendedReward,
  JourneyTimelineEvent,
  RechargePreset,
  PaymentOption
} from '../types';

export const INITIAL_CUSTOMER_PROFILE: CustomerProfile = {
  name: 'Priya Sharma',
  salutation: 'Good Morning, Priya!',
  mobileNumber: '077 123 4567',
  rawMobile: '0771234567',
  email: 'priya.sharma@example.com',
  customerSince: 'January 2024',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
  tier: 'Gold',
  pointsBalance: 12450,
  pointsExpiringSoon: 1200,
  expiryDays: 45,
  expiryDateFormatted: '10 October 2026',
  nextTier: 'Platinum',
  pointsToNextTier: 7550,
  nextTierThreshold: 20000,
  currentTierMin: 5000,
  earnedThisMonth: 2850,
  redeemedTotal: 1400,
  growthRatePercent: 18,
};

export const TIERS: TierDefinition[] = [
  {
    id: 'Silver',
    name: 'Silver',
    rangeLabel: '0 - 4,999 points',
    minPoints: 0,
    maxPoints: 4999,
    badgeBg: 'bg-slate-100 text-slate-700 border-slate-300',
    badgeText: 'Silver Member',
    borderColor: 'border-slate-300',
    accentColor: '#64748B',
    gradient: 'from-slate-100 to-slate-200',
    multiplier: '1.0x Star Points',
    summary: 'Essential rewards on every reload and standard partner discounts.',
    benefits: [
      '1 Star Point for every Rs. 100 on Dialog Reloads',
      'Basic merchant discounts across 500+ partner outlets',
      'Instant USSD #141# points check and balance transfers',
      'Birthday bonus voucher on selected partners'
    ]
  },
  {
    id: 'Gold',
    name: 'Gold',
    rangeLabel: '5,000 - 19,999 points',
    minPoints: 5000,
    maxPoints: 19999,
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-400',
    badgeText: 'Gold Member (You)',
    borderColor: 'border-amber-400',
    accentColor: '#D97706',
    gradient: 'from-amber-100 via-amber-50 to-yellow-100',
    multiplier: '1.5x Star Points',
    summary: 'Accelerated earn rate, exclusive dining vouchers and priority promotions.',
    benefits: [
      '1.5x Accelerated Star Points earn rate on reloads',
      'Exclusive Gold-tier dining, shopping & lifestyle vouchers',
      'Special loyalty promotions and double points weekends',
      'Faster Star Points redemption at over 1,000+ islandwide merchants',
      'Priority Customer Care routing via Dialog 1777'
    ]
  },
  {
    id: 'Platinum',
    name: 'Platinum',
    rangeLabel: '20,000 - 49,999 points',
    minPoints: 20000,
    maxPoints: 49999,
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    badgeText: 'Platinum VIP',
    borderColor: 'border-indigo-300',
    accentColor: '#4F46E5',
    gradient: 'from-indigo-100 via-purple-50 to-blue-100',
    multiplier: '2.0x Star Points',
    summary: 'Premium VIP perks, SriLankan FlySMILES conversions, and airport lounge offers.',
    benefits: [
      '2.0x Double Star Points multiplier on all Dialog transactions',
      'Direct conversion to SriLankan Airlines FlySMILES Miles',
      'Exclusive invites to Dialog Club Vision VIP events',
      'Complimentary data packs and anniversary bonus rewards',
      'Dedicated Relationship Manager and zero-wait service'
    ]
  },
  {
    id: 'Diamond',
    name: 'Diamond',
    rangeLabel: '50,000+ points',
    minPoints: 50000,
    maxPoints: null,
    badgeBg: 'bg-cyan-100 text-cyan-950 border-cyan-400',
    badgeText: 'Diamond Elite',
    borderColor: 'border-cyan-400',
    accentColor: '#0891B2',
    gradient: 'from-cyan-100 via-teal-50 to-sky-100',
    multiplier: '3.0x Star Points',
    summary: 'The ultimate tier with bespoke concierge, maximum multipliers and luxury lifestyle gifts.',
    benefits: [
      '3.0x Maximum Star Points accrual across all Dialog and partner bills',
      'Complimentary airport lounge access and VIP concierge services',
      'Annual luxury gift hampers and complimentary high-speed 5G home broadband perks',
      'Uncapped points validity with zero expiration on accumulated balance'
    ]
  }
];

export const POINTS_ACTIVITY_CHART: Record<'7days' | '30days' | '6months' | '12months', PointsChartPoint[]> = {
  '7days': [
    { period: '18 Aug', earned: 0, redeemed: 1000, netBalance: 11450 },
    { period: '19 Aug', earned: 150, redeemed: 0, netBalance: 11600 },
    { period: '20 Aug', earned: 0, redeemed: 0, netBalance: 11600 },
    { period: '21 Aug', earned: 350, redeemed: 0, netBalance: 11950 },
    { period: '22 Aug', earned: 0, redeemed: 0, netBalance: 11950 },
    { period: '23 Aug', earned: 0, redeemed: 0, netBalance: 11950 },
    { period: '24 Aug', earned: 500, redeemed: 0, netBalance: 12450 },
  ],
  '30days': [
    { period: '28 Jul', earned: 400, redeemed: 0, netBalance: 10600 },
    { period: '02 Aug', earned: 250, redeemed: 0, netBalance: 10850 },
    { period: '05 Aug', earned: 300, redeemed: 0, netBalance: 11150 },
    { period: '10 Aug', earned: 0, redeemed: 500, netBalance: 10650 },
    { period: '15 Aug', earned: 750, redeemed: 0, netBalance: 11400 },
    { period: '18 Aug', earned: 0, redeemed: 1000, netBalance: 10400 },
    { period: '21 Aug', earned: 350, redeemed: 0, netBalance: 10750 },
    { period: '24 Aug', earned: 500, redeemed: 0, netBalance: 12450 },
  ],
  '6months': [
    { period: 'Jan', earned: 2100, redeemed: 500, netBalance: 6800 },
    { period: 'Feb', earned: 2800, redeemed: 1000, netBalance: 8600 },
    { period: 'Mar', earned: 1900, redeemed: 400, netBalance: 10100 },
    { period: 'Apr', earned: 3200, redeemed: 1800, netBalance: 11500 },
    { period: 'May', earned: 2450, redeemed: 900, netBalance: 13050 },
    { period: 'Jun', earned: 2850, redeemed: 1400, netBalance: 14500 },
    { period: 'Jul', earned: 3100, redeemed: 2200, netBalance: 11000 },
    { period: 'Aug', earned: 2850, redeemed: 1400, netBalance: 12450 },
  ],
  '12months': [
    { period: 'Sep 25', earned: 1500, redeemed: 0, netBalance: 2500 },
    { period: 'Oct 25', earned: 1800, redeemed: 400, netBalance: 3900 },
    { period: 'Nov 25', earned: 2200, redeemed: 800, netBalance: 5300 },
    { period: 'Dec 25', earned: 2600, redeemed: 1500, netBalance: 6400 },
    { period: 'Jan 26', earned: 2100, redeemed: 500, netBalance: 8000 },
    { period: 'Feb 26', earned: 2800, redeemed: 1000, netBalance: 9800 },
    { period: 'Mar 26', earned: 1900, redeemed: 400, netBalance: 11300 },
    { period: 'Apr 26', earned: 3200, redeemed: 1800, netBalance: 12700 },
    { period: 'May 26', earned: 2450, redeemed: 900, netBalance: 14250 },
    { period: 'Jun 26', earned: 2850, redeemed: 1400, netBalance: 15700 },
    { period: 'Jul 26', earned: 3100, redeemed: 2200, netBalance: 16600 },
    { period: 'Aug 26', earned: 2850, redeemed: 1400, netBalance: 12450 },
  ]
};

export const RECENT_TRANSACTIONS: LoyaltyTransaction[] = [
  {
    id: 'TXN-20260824-001',
    date: '24 Aug 2026',
    time: '10:42 AM',
    activity: 'Points Earned',
    description: 'Dialog Mobile Recharge',
    points: 500,
    isPositive: true,
    status: 'Completed',
    category: 'Recharge',
    mobileNumber: '077 123 4567',
    rechargeAmount: 1000,
    referenceId: 'SP-20260824-00125',
    merchant: 'Dialog Axiata PLC'
  },
  {
    id: 'TXN-20260821-002',
    date: '21 Aug 2026',
    time: '04:15 PM',
    activity: 'Points Earned',
    description: 'Bill Payment',
    points: 350,
    isPositive: true,
    status: 'Completed',
    category: 'Bill',
    mobileNumber: '077 123 4567',
    rechargeAmount: 700,
    referenceId: 'SP-20260821-00894',
    merchant: 'Dialog Home Broadband'
  },
  {
    id: 'TXN-20260818-003',
    date: '18 Aug 2026',
    time: '02:30 PM',
    activity: 'Points Redeemed',
    description: 'Voucher Redemption',
    points: 1000,
    isPositive: false,
    status: 'Completed',
    category: 'Voucher',
    referenceId: 'SP-20260818-00441',
    merchant: 'Cargills FoodCity Outlets'
  },
  {
    id: 'TXN-20260815-004',
    date: '15 Aug 2026',
    time: '11:18 AM',
    activity: 'Points Earned',
    description: 'Mobile Recharge',
    points: 750,
    isPositive: true,
    status: 'Completed',
    category: 'Recharge',
    mobileNumber: '077 123 4567',
    rechargeAmount: 1500,
    referenceId: 'SP-20260815-00912',
    merchant: 'Dialog Axiata PLC'
  },
  {
    id: 'TXN-20260810-005',
    date: '10 Aug 2026',
    time: '07:45 PM',
    activity: 'Points Redeemed',
    description: 'Partner Reward',
    points: 500,
    isPositive: false,
    status: 'Completed',
    category: 'Partner',
    referenceId: 'SP-20260810-00332',
    merchant: 'KFC Colombo Showrooms'
  },
  {
    id: 'TXN-20260805-006',
    date: '05 Aug 2026',
    time: '09:05 AM',
    activity: 'Points Earned',
    description: 'Dialog Mobile Recharge',
    points: 300,
    isPositive: true,
    status: 'Completed',
    category: 'Recharge',
    mobileNumber: '077 123 4567',
    rechargeAmount: 600,
    referenceId: 'SP-20260805-00771',
    merchant: 'Dialog Axiata PLC'
  },
  {
    id: 'TXN-20260802-007',
    date: '02 Aug 2026',
    time: '01:20 PM',
    activity: 'Points Earned',
    description: 'Mobile Recharge',
    points: 250,
    isPositive: true,
    status: 'Completed',
    category: 'Recharge',
    mobileNumber: '077 123 4567',
    rechargeAmount: 500,
    referenceId: 'SP-20260802-00109',
    merchant: 'Dialog Axiata PLC'
  },
  {
    id: 'TXN-20260801-008',
    date: '01 Aug 2026',
    time: '12:00 AM',
    activity: 'Tier Upgrade',
    description: 'Upgraded from Silver to Gold Tier',
    points: 0,
    isPositive: true,
    status: 'Completed',
    category: 'Tier',
    referenceId: 'SP-20260801-TIER01',
    merchant: 'Star Points Loyalty Program'
  }
];

export const RECHARGE_HISTORY: RechargeRecord[] = [
  {
    id: 'REC-01',
    date: '24 Aug 2026',
    mobileNumber: '077 123 4567',
    rechargeAmount: 1000,
    pointsEarned: 500,
    paymentMethod: 'Credit/Debit Card (Visa)',
    status: 'Completed',
    referenceId: 'REC-20260824-7721'
  },
  {
    id: 'REC-02',
    date: '15 Aug 2026',
    mobileNumber: '077 123 4567',
    rechargeAmount: 1500,
    pointsEarned: 750,
    paymentMethod: 'Dialog Pay / eZ Cash',
    status: 'Completed',
    referenceId: 'REC-20260815-4490'
  },
  {
    id: 'REC-03',
    date: '02 Aug 2026',
    mobileNumber: '077 123 4567',
    rechargeAmount: 500,
    pointsEarned: 250,
    paymentMethod: 'Genie QR / Internet Banking',
    status: 'Completed',
    referenceId: 'REC-20260802-1132'
  },
  {
    id: 'REC-04',
    date: '22 Jul 2026',
    mobileNumber: '077 123 4567',
    rechargeAmount: 2000,
    pointsEarned: 1000,
    paymentMethod: 'Credit/Debit Card (Mastercard)',
    status: 'Completed',
    referenceId: 'REC-20260722-9904'
  },
  {
    id: 'REC-05',
    date: '10 Jul 2026',
    mobileNumber: '077 123 4567',
    rechargeAmount: 1000,
    pointsEarned: 500,
    paymentMethod: 'Star Points Redemption',
    status: 'Completed',
    referenceId: 'REC-20260710-3321'
  }
];

export const MY_VOUCHERS: VoucherItem[] = [
  {
    id: 'VOUCH-01',
    title: 'Rs. 500 Reload Voucher',
    category: 'Reload',
    discountOrValue: 'Rs. 500 Reload',
    status: 'available',
    statusLabel: 'Available',
    validUntil: '30 Sep 2026',
    code: 'DIALOG-REL-500-GOLD',
    partnerName: 'Dialog Axiata PLC',
    partnerLogoBg: '#ED1C24',
    pointsCost: 1000,
    terms: [
      'Valid for Prepaid or Postpaid mobile connections only.',
      'Redeemable once per customer connection.',
      'Expires 30 September 2026 at 11:59 PM.'
    ]
  },
  {
    id: 'VOUCH-02',
    title: '20% Off Dining',
    category: 'Dining',
    discountOrValue: '20% Discount',
    status: 'available',
    statusLabel: 'Available',
    validUntil: '15 Sep 2026',
    code: 'DINE-20-PRIYA-GLD',
    partnerName: 'KFC Sri Lanka & Pizza Hut',
    partnerLogoBg: '#DC2626',
    pointsCost: 750,
    terms: [
      'Valid at participating KFC & Pizza Hut outlets islandwide.',
      'Maximum discount cap of Rs. 2,000 per bill.',
      'Present voucher QR code or SMS at billing counter.'
    ]
  },
  {
    id: 'VOUCH-03',
    title: 'Rs. 1,000 Partner Voucher',
    category: 'Shopping',
    discountOrValue: 'Rs. 1,000 Voucher',
    status: 'used',
    statusLabel: 'Used',
    validUntil: '18 Aug 2026',
    redeemedDate: '18 Aug 2026',
    code: 'CARG-1000-REDEEMED',
    partnerName: 'Cargills FoodCity',
    partnerLogoBg: '#B91C1C',
    pointsCost: 1000,
    terms: [
      'Redeemed on 18 August 2026 at Cargills FoodCity Majestic City.',
      'Applied directly to the grocery basket total.'
    ]
  },
  {
    id: 'VOUCH-04',
    title: 'Rs. 750 Keells Fresh Produce Voucher',
    category: 'Shopping',
    discountOrValue: 'Rs. 750 Off',
    status: 'expiring_soon',
    statusLabel: 'Expiring Soon',
    validUntil: '05 Sep 2026',
    code: 'KEEL-750-SEPT',
    partnerName: 'Keells Supermarket',
    partnerLogoBg: '#16A34A',
    pointsCost: 750,
    terms: [
      'Valid on minimum grocery basket of Rs. 3,500.',
      'Applicable on fresh vegetables, fruits & bakery items.'
    ]
  },
  {
    id: 'VOUCH-05',
    title: '15% Off Eyewear & Sunglasses',
    category: 'Healthcare',
    discountOrValue: '15% Off Frames',
    status: 'available',
    statusLabel: 'Available',
    validUntil: '31 Oct 2026',
    code: 'VISION-15-GOLD',
    partnerName: 'Vision Care Optical Services',
    partnerLogoBg: '#0D9488',
    pointsCost: 500,
    terms: [
      'Valid at all 55+ Vision Care branches islandwide.',
      'Includes complimentary professional eye examination.'
    ]
  }
];

export const PROMOTIONS: PromotionItem[] = [
  {
    id: 'PROMO-01',
    title: 'Double Star Points',
    subtitle: 'Earn 2X Star Points on eligible Dialog reloads',
    description: 'Reload Rs. 500 or more via MyDialog App or online web portal and receive double Star Points credited within 24 hours.',
    endsDate: '31 Aug 2026',
    ctaText: 'View Offer',
    tag: 'Limited Time',
    tagColor: 'bg-red-500 text-white',
    multiplier: '2X Points',
    category: 'Reloads',
    terms: [
      'Valid on all online reloads over Rs. 500.',
      'Bonus points credited instantly.',
      'Available for all Gold and Platinum tier members.'
    ],
    imageIllustration: 'Zap'
  },
  {
    id: 'PROMO-02',
    title: 'Weekend Rewards',
    subtitle: 'Get additional rewards on selected transactions this weekend.',
    description: 'Earn 500 bonus Star Points when spending Rs. 3,000 or more at participating partner supermarket and dining chains on Saturday and Sunday.',
    endsDate: '30 Aug 2026',
    ctaText: 'Explore Offer',
    tag: 'Weekend Special',
    tagColor: 'bg-amber-500 text-white',
    multiplier: '+500 Bonus',
    category: 'Weekend',
    terms: [
      'Valid on Saturday & Sunday transactions only.',
      'Participating merchants: Cargills, Keells, KFC, Domino’s.',
      'Must present Star Points registered mobile number at POS.'
    ],
    imageIllustration: 'Sparkles'
  },
  {
    id: 'PROMO-03',
    title: 'Partner Special',
    subtitle: 'Enjoy exclusive Star Points benefits from selected partners.',
    description: 'Convert your Star Points into SriLankan Airlines FlySMILES miles or luxury fashion vouchers with a 15% promotional bonus value.',
    endsDate: '15 Sep 2026',
    ctaText: 'Explore',
    tag: 'Partner Exclusive',
    tagColor: 'bg-indigo-600 text-white',
    multiplier: '15% Extra',
    category: 'Partners',
    terms: [
      'Minimum conversion batch: 1,000 Star Points.',
      'Points conversion is instantaneous and non-reversible.'
    ],
    imageIllustration: 'Gift'
  }
];

export const GOLD_TIER_BENEFITS: TierBenefitCard[] = [
  {
    id: 'BEN-01',
    title: 'Exclusive Rewards',
    description: 'Access curated rewards and high-value vouchers reserved exclusively for Gold members.',
    iconName: 'Crown',
    tierRequirement: 'Gold',
    highlightTag: 'Gold Tier Exclusive'
  },
  {
    id: 'BEN-02',
    title: 'Partner Discounts',
    description: 'Enjoy selected premium discounts from participating partners across supermarkets, fashion, dining and travel.',
    iconName: 'ShoppingBag',
    tierRequirement: 'Gold',
    highlightTag: '1,000+ Outlets'
  },
  {
    id: 'BEN-03',
    title: 'Special Promotions',
    description: 'Get early access to selected loyalty promotions, flash weekend rewards and double points multipliers.',
    iconName: 'Flame',
    tierRequirement: 'Gold',
    highlightTag: 'Priority Access'
  },
  {
    id: 'BEN-04',
    title: 'Faster Rewards',
    description: 'Earn points through eligible Dialog transactions at an accelerated 1.5x multiplier rate.',
    iconName: 'TrendingUp',
    tierRequirement: 'Gold',
    highlightTag: '1.5x Accelerated'
  }
];

export const REDEMPTION_HISTORY: RedemptionRecord[] = [
  {
    id: 'RED-01',
    date: '18 Aug 2026',
    rewardTitle: 'Rs. 500 Reload Voucher',
    pointsUsed: 1000,
    status: 'Redeemed',
    category: 'Vouchers',
    referenceId: 'RED-20260818-091',
    partnerOrService: 'Dialog Mobile Reload'
  },
  {
    id: 'RED-02',
    date: '10 Aug 2026',
    rewardTitle: 'Restaurant Partner Voucher',
    pointsUsed: 500,
    status: 'Redeemed',
    category: 'Partner Rewards',
    referenceId: 'RED-20260810-338',
    partnerOrService: 'KFC Sri Lanka'
  },
  {
    id: 'RED-03',
    date: '22 Jul 2026',
    rewardTitle: 'Shopping Voucher',
    pointsUsed: 1500,
    status: 'Redeemed',
    category: 'Vouchers',
    referenceId: 'RED-20260722-554',
    partnerOrService: 'Cargills FoodCity'
  },
  {
    id: 'RED-04',
    date: '15 Jul 2026',
    rewardTitle: 'Dialog Payment',
    pointsUsed: 750,
    status: 'Completed',
    category: 'Reloads',
    referenceId: 'RED-20260715-102',
    partnerOrService: 'Dialog Broadband Bill Offset'
  },
  {
    id: 'RED-05',
    date: '01 Jul 2026',
    rewardTitle: 'DSI Footwear Discount e-Voucher',
    pointsUsed: 1200,
    status: 'Completed',
    category: 'Partner Rewards',
    referenceId: 'RED-20260701-889',
    partnerOrService: 'DSI Showrooms Colombo'
  }
];

export const RECOMMENDED_REWARDS: RecommendedReward[] = [
  {
    id: 'REC-REW-01',
    title: 'Rs. 500 Reload Voucher',
    category: 'Reload',
    pointsRequired: 1000,
    originalLkrValue: 500,
    ctaText: 'Redeem Now',
    partnerName: 'Dialog Mobile',
    badge: 'Popular for Gold',
    colorTheme: '#ED1C24',
    description: 'Instant mobile credit for any active Dialog connection in Sri Lanka.'
  },
  {
    id: 'REC-REW-02',
    title: 'Dining Partner Voucher',
    category: 'Dining',
    pointsRequired: 750,
    originalLkrValue: 1000,
    ctaText: 'View Reward',
    partnerName: 'KFC & Domino’s',
    badge: 'Save 25%',
    colorTheme: '#D97706',
    description: 'Enjoy delicious family meals and burgers across 100+ partner restaurants.'
  },
  {
    id: 'REC-REW-03',
    title: 'Shopping Reward',
    category: 'Shopping',
    pointsRequired: 1500,
    originalLkrValue: 1500,
    ctaText: 'Redeem Now',
    partnerName: 'Cargills & Keells',
    badge: 'Instant e-Coupon',
    colorTheme: '#16A34A',
    description: 'Redeem directly at checkout for groceries, fresh produce, and essentials.'
  }
];

export const CUSTOMER_JOURNEY_TIMELINE: JourneyTimelineEvent[] = [
  {
    id: 'JRN-01',
    date: '24 Aug 2026',
    title: 'Dialog Mobile Recharge',
    pointsChange: '+500 points',
    isPositive: true,
    description: 'Reload of Rs. 1,000 on 077 123 4567 earned 500 Star Points.',
    iconName: 'Smartphone'
  },
  {
    id: 'JRN-02',
    date: '18 Aug 2026',
    title: 'Rs. 500 Reload Voucher Redeemed',
    pointsChange: '-1,000 points',
    isPositive: false,
    description: 'Redeemed 1,000 points for a Rs. 500 mobile reload voucher.',
    iconName: 'Gift'
  },
  {
    id: 'JRN-03',
    date: '15 Aug 2026',
    title: 'Dialog Mobile Recharge',
    pointsChange: '+750 points',
    isPositive: true,
    description: 'Reload of Rs. 1,500 on 077 123 4567 earned 750 Star Points.',
    iconName: 'Smartphone'
  },
  {
    id: 'JRN-04',
    date: '10 Aug 2026',
    title: 'Partner Reward Redeemed',
    pointsChange: '-500 points',
    isPositive: false,
    description: 'Redeemed 500 points at KFC Colombo showroom.',
    iconName: 'Utensils'
  },
  {
    id: 'JRN-05',
    date: '01 Aug 2026',
    title: 'Tier Upgraded: Silver → Gold',
    pointsChange: 'Tier Upgrade',
    isPositive: true,
    isTierChange: true,
    description: 'Crossed 5,000 lifetime points threshold to unlock 1.5x accelerated earn rate and Gold benefits.',
    iconName: 'Crown'
  }
];

export const RECHARGE_PRESETS: RechargePreset[] = [
  { id: '100', amount: 100, label: 'Rs. 100', benefit: 'Basic reload', bonusPoints: 50 },
  { id: '250', amount: 250, label: 'Rs. 250', benefit: 'Standard reload', bonusPoints: 125 },
  { id: '500', amount: 500, label: 'Rs. 500', popular: true, benefit: 'Most Popular (250 pts)', bonusPoints: 250 },
  { id: '1000', amount: 1000, label: 'Rs. 1,000', benefit: 'Heavy Usage (500 pts)', bonusPoints: 500 },
  { id: '1500', amount: 1500, label: 'Rs. 1,500', popular: true, benefit: 'Max Value (750 pts)', bonusPoints: 750 },
  { id: '2000', amount: 2000, label: 'Rs. 2,000', benefit: 'Monthly Pack (1,000 pts)', bonusPoints: 1000 },
];

export const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: 'card',
    title: 'Credit / Debit Card',
    description: 'Visa, Mastercard, AMEX & LankaPay accepted',
    iconName: 'CreditCard',
    isRecommended: true,
  },
  {
    id: 'dialog_pay',
    title: 'Dialog Pay / eZ Cash',
    description: 'Instant debit from linked Dialog wallet',
    iconName: 'Smartphone',
    badge: 'Instant'
  },
  {
    id: 'star_points',
    title: 'Redeem Star Points (Balance: 12,450)',
    description: 'Use your points (1 Star Point = Rs. 1.00 LKR)',
    iconName: 'Star',
    badge: '1 Pt = Rs. 1'
  },
  {
    id: 'bank_transfer',
    title: 'Genie QR / Internet Banking',
    description: 'Sampath, Commercial, HNB, BOC & Genie QR',
    iconName: 'Building2'
  }
];
