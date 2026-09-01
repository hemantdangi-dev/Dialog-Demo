import {
  CustomerProfile,
  TierDefinition,
  TierAssessmentCategory,
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

import dialogPlayVoucherImg from '../assets/images/dialog_play_voucher_1788269719097.jpg';
import dialogDeviceVoucherImg from '../assets/images/dialog_device_voucher_1788269748774.jpg';
import dialogBroadbandVoucherImg from '../assets/images/dialog_broadband_voucher_1788269770379.jpg';
import kfcVoucherImg from '../assets/images/kfc_starpoints_voucher_1788269790496.jpg';
import cargillsVoucherImg from '../assets/images/cargills_voucher_1788269812366.jpg';
import fashionBugVoucherImg from '../assets/images/fashion_bug_voucher_1788269839475.jpg';

export const INITIAL_CUSTOMER_PROFILE: CustomerProfile = {
  name: 'Priya Sharma',
  salutation: 'Good Morning, Priya!',
  mobileNumber: '077 123 4567',
  rawMobile: '0771234567',
  email: 'priya.sharma@example.com',
  customerSince: 'January 2024',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
  tier: 'Gold',
  pointsBalance: 28450,
  pointsExpiringSoon: 1200,
  expiryDays: 45,
  expiryDateFormatted: '10 October 2026',
  nextTier: 'Platinum',
  pointsToNextTier: 21550,
  nextTierThreshold: 50000,
  currentTierMin: 25000,
  earnedThisMonth: 2850,
  redeemedTotal: 1400,
  growthRatePercent: 18,
};

export const TIERS: TierDefinition[] = [
  {
    id: 'Silver',
    name: 'Silver',
    rangeLabel: '0 - 24,999 points',
    minPoints: 0,
    maxPoints: 24999,
    badgeBg: 'bg-slate-100 text-slate-700 border-slate-300',
    badgeText: 'Silver Member',
    borderColor: 'border-slate-300',
    accentColor: '#0284C7',
    gradient: 'from-slate-100 to-slate-200',
    multiplier: '1.0x Star Points',
    summary: 'Minimum Balance: 0. Essential rewards on every reload and standard partner discounts.',
    benefits: [
      '1 Star Point for every LKR 100 on Dialog Reloads',
      'Standard merchant discounts across 500+ partner outlets',
      'Instant USSD #141# points balance check and mobile reloads',
      'Base Star Points wallet access'
    ]
  },
  {
    id: 'Gold',
    name: 'Gold',
    rangeLabel: '25,000 - 49,999 points',
    minPoints: 25000,
    maxPoints: 49999,
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-400',
    badgeText: 'Gold Member (You)',
    borderColor: 'border-amber-400',
    accentColor: '#0284C7',
    gradient: 'from-amber-100 via-amber-50 to-yellow-100',
    multiplier: '1.5x Star Points',
    summary: 'Minimum Balance: 25,000. Includes Cargill Food City and KFC tier benefits.',
    benefits: [
      'Cargill Food City – LKR 500 OFF on Minimum Spend of LKR 2,500',
      'KFC – Flat LKR 100 OFF on First Purchase',
      '1.5x Accelerated Star Points earn rate on reloads',
      'Priority Customer Care routing via Dialog 1777'
    ]
  },
  {
    id: 'Platinum',
    name: 'Platinum',
    rangeLabel: '50,000+ points',
    minPoints: 50000,
    maxPoints: null,
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    badgeText: 'Platinum VIP',
    borderColor: 'border-indigo-300',
    accentColor: '#0284C7',
    gradient: 'from-indigo-100 via-purple-50 to-blue-100',
    multiplier: '2.0x Star Points',
    summary: 'Minimum Balance: 50,000. SriLankan Airlines, Device Upgrade Voucher & Home Broadband discounts.',
    benefits: [
      'SriLankan Airlines – 10% OFF Tariff / FlySMILES Mile Conversions',
      'Dialog Device & Accessory Upgrade Voucher (Worth LKR 2,000)',
      'Dialog Home Broadband 25% Discount Voucher',
      '2.0x Double Star Points multiplier on all Dialog transactions',
      'Exclusive invites to Dialog Club Vision VIP events'
    ]
  }
];

export const TIER_ASSESSMENT_RULE_DATA: TierAssessmentCategory[] = [
  {
    categoryName: 'Experiences',
    subCategoryTitle: 'Star Points Benefit Types',
    unassignedBenefits: [
      {
        title: '10% OFF - on Minimum Sp...',
        description: '10% OFF on Minimum Spend of LKR 3,000 (Fashion Bug)',
        details: 'Available across all tiers upon meeting partner minimum threshold.'
      }
    ],
    tierBenefits: {
      silver: [],
      gold: [
        {
          id: 'gold-cargills',
          partner: 'Cargill Food City',
          offer: 'LKR 500 OFF on...',
          fullTitle: 'Cargill Food City – LKR 500 OFF on Minimum Spend of LKR 2,500',
          type: 'groceries'
        },
        {
          id: 'gold-kfc',
          partner: 'KFC',
          offer: 'Flat LKR 100 OFF on First Pu...',
          fullTitle: 'KFC – Flat LKR 100 OFF on First Purchase',
          type: 'dining'
        }
      ],
      platinum: [
        {
          id: 'plat-srilankan',
          partner: 'SriLankan Airlines',
          offer: '10% OFF Ta...',
          fullTitle: 'SriLankan Airlines – 10% OFF Tariff / FlySMILES Mile Conversions',
          type: 'travel'
        },
        {
          id: 'plat-device',
          partner: 'Dialog Device & Accessory',
          offer: 'Dialog Device & Accessory Upg...',
          fullTitle: 'Dialog Device & Accessory Upgrade Voucher (Worth LKR 2,000)',
          type: 'devices'
        },
        {
          id: 'plat-broadband',
          partner: 'Dialog Home Broadband',
          offer: 'Dialog Home Broadband 25% ...',
          fullTitle: 'Dialog Home Broadband 25% Discount on eligible connection',
          type: 'broadband'
        }
      ]
    }
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
    title: 'Free OTT Dialog Play Subscription (3 Months)',
    category: 'Entertainment',
    discountOrValue: '3 Months FREE Subscription',
    status: 'available',
    statusLabel: 'Available',
    validUntil: '30 Nov 2026',
    code: 'DIALOG-PLAY-3M',
    partnerName: 'Dialog Play',
    partnerLogoBg: '#ED1C24',
    imageUrl: dialogPlayVoucherImg,
    pointsCost: 1500,
    headline: 'ANNUAL RECHARGE. ENDLESS ENTERTAINMENT.',
    subHeadline: 'ANYTIME, ANYWHERE.',
    bannerTag: 'FREE FOR 3 MONTHS',
    highlights: [
      { icon: 'Tv', text: 'Live TV on the go' },
      { icon: 'Film', text: 'Catch up on favourite shows' },
      { icon: 'Video', text: 'High quality streaming' },
      { icon: 'Smartphone', text: 'Mobile + Tablet anywhere' }
    ],
    stubTitle: 'FREE OTT DIALOG PLAY SUBSCRIPTION',
    stubValue: '3 MONTHS FREE',
    stubSubtext: 'ON ANNUAL RECHARGE • ADD YOUR TELEVISION CONNECTION ON DIALOG PLAY APP & START WATCHING!',
    barcodeText: 'DIALOG PLAY OTT VOUCHER 3M',
    validityDaysText: 'Valid on Annual Recharge',
    websiteUrl: 'dialog.lk/play',
    howItWorks: [
      'Do an Annual Recharge on your Dialog connection',
      'Add your Dialog Television connection on Dialog Play App',
      'Enjoy 3 Months FREE OTT Subscription',
      'Sit back & enjoy your favourite entertainment!'
    ],
    terms: [
      'Valid on eligible Dialog Annual Mobile & TV Recharges.',
      'Must link active Dialog Television connection in Dialog Play app.',
      'Data charges applicable for mobile streaming outside free zones.',
      'Recharge today on MyDialog App | *678# | dialog.lk'
    ]
  },
  {
    id: 'VOUCH-02',
    title: 'Dialog Device & Accessory Voucher',
    category: 'Shopping',
    discountOrValue: 'LKR 2,000 Voucher',
    status: 'available',
    statusLabel: 'Available',
    validUntil: '30 Nov 2026',
    code: 'DIALOG-DEV-2000',
    partnerName: 'Dialog Devices & Accessories',
    partnerLogoBg: '#C9141B',
    imageUrl: dialogDeviceVoucherImg,
    pointsCost: 2000,
    headline: 'DIALOG DEVICE & ACCESSORY VOUCHER',
    subHeadline: 'Upgrade. Connect. Enjoy More.',
    bannerTag: 'EXCLUSIVELY FOR DIALOG MEMBERS',
    highlights: [
      { icon: 'Smartphone', text: 'Eligible smartphones & tablets' },
      { icon: 'Store', text: 'Dialog outlets & authorized retail partners' },
      { icon: 'Award', text: 'The best devices. The best you.' },
      { icon: 'ShieldCheck', text: 'Official 1-year warranty included' }
    ],
    stubTitle: 'VOUCHER VALUE: LKR 2,000',
    stubValue: 'LKR 2,000',
    stubSubtext: 'TWO THOUSAND RUPEES ONLY • VALIDITY 90 DAYS FROM DATE OF ISSUE',
    barcodeText: 'DIALOG-DEV-2000-BARCODE',
    validityDaysText: '90 Days from date of issue',
    websiteUrl: 'dialog.lk/devices',
    terms: [
      'Exclusively available for Dialog Star Points Gold & Platinum members.',
      'Redeemable on smartphones, earbuds, smartwatches and accessories.',
      'Valid at Dialog Iconic, Dialog Arcades, and authorized retail partner stores.',
      'Single transaction use only. Cannot be exchanged for cash.'
    ]
  },
  {
    id: 'VOUCH-03',
    title: 'Home Broadband Discount Voucher',
    category: 'Reload',
    discountOrValue: '25% Discount on Broadband',
    status: 'available',
    statusLabel: 'Available',
    validUntil: '30 Nov 2026',
    code: 'DIALOG-HB-25',
    partnerName: 'Dialog Home Broadband',
    partnerLogoBg: '#004F9E',
    imageUrl: dialogBroadbandVoucherImg,
    pointsCost: 1200,
    headline: 'HOME BROADBAND DISCOUNT VOUCHER',
    subHeadline: 'Faster Internet. A Smarter Home. Connect Your World.',
    bannerTag: '25% DISCOUNT',
    highlights: [
      { icon: 'Zap', text: 'High speed 4G/5G internet' },
      { icon: 'Laptop', text: 'Connect multiple devices for family' },
      { icon: 'ShieldCheck', text: 'Reliable & secure connection' },
      { icon: 'Wifi', text: 'Zero buffer ultra HD streaming' }
    ],
    stubTitle: 'HOME BROADBAND 25% DISCOUNT',
    stubValue: '25% OFF',
    stubSubtext: 'ON ELIGIBLE HOME BROADBAND CONNECTION • VALIDITY 90 DAYS',
    barcodeText: 'DIALOG-HB-25-BARCODE',
    validityDaysText: '90 Days from date of issue',
    websiteUrl: 'www.dialog.lk/broadband',
    terms: [
      '25% discount applicable on eligible Dialog Home Broadband new connections or router upgrades.',
      'Discount applies to the initial connection fee or selected rental plans.',
      'Visit www.dialog.lk/broadband or any Dialog Customer Care Centre.',
      'Valid for 90 days from date of issue.'
    ]
  },
  {
    id: 'VOUCH-04',
    title: 'KFC – Flat 100 Off on First Purchase',
    category: 'Dining',
    discountOrValue: 'Flat LKR 100 Off',
    status: 'available',
    statusLabel: 'Available',
    validUntil: '31 Oct 2026',
    code: 'KFC-FLAT-100',
    partnerName: 'KFC Sri Lanka',
    partnerLogoBg: '#E4002B',
    imageUrl: kfcVoucherImg,
    pointsCost: 500,
    headline: "KFC - IT'S FINGER LICKIN' GOOD",
    subHeadline: 'Flat 100 Off on First Purchase',
    bannerTag: 'FLAT LKR 100 OFF',
    highlights: [
      { icon: 'UserCheck', text: 'First purchase only' },
      { icon: 'ShoppingBag', text: 'Minimum order T&C apply' },
      { icon: 'Clock', text: 'Valid for limited time' },
      { icon: 'Sparkles', text: 'Redeem using Dialog StarPoints' }
    ],
    stubTitle: 'DIALOG STARPOINTS VOUCHER',
    stubValue: 'LKR 100 OFF',
    stubSubtext: 'ON FIRST PURCHASE • REDEEM USING DIALOG STARPOINTS AT KFC COUNTERS',
    barcodeText: 'KFC-FLAT-100-BARCODE',
    validityDaysText: 'Limited time offer',
    websiteUrl: 'kfc.lk',
    terms: [
      'Valid on first purchase at participating KFC Sri Lanka outlets.',
      'Minimum order terms and conditions apply.',
      'Present digital voucher QR or SMS code at checkout counter.',
      'Cannot be combined with other ongoing meal deals.'
    ]
  },
  {
    id: 'VOUCH-05',
    title: 'Cargills Online – LKR 500 Off (Min Spend LKR 2,500)',
    category: 'Shopping',
    discountOrValue: 'LKR 500 Off on Min Spend LKR 2,500',
    status: 'expiring_soon',
    statusLabel: 'Expiring Soon',
    validUntil: '15 Oct 2026',
    code: 'CARGILLS-500-OFF',
    partnerName: 'Cargills Online',
    partnerLogoBg: '#EE2737',
    imageUrl: cargillsVoucherImg,
    pointsCost: 750,
    headline: 'CARGILLS ONLINE - SAVE MORE. SHOP MORE.',
    subHeadline: 'LKR 500 Off on Minimum Spend of LKR 2,500',
    bannerTag: 'LKR 500 OFF',
    highlights: [
      { icon: 'ShoppingBag', text: 'Wide range of quality products' },
      { icon: 'Award', text: 'Best quality everyday groceries' },
      { icon: 'Truck', text: 'Islandwide delivery to your doorstep' },
      { icon: 'ShieldCheck', text: 'Secure online & contactless payments' }
    ],
    stubTitle: 'DIALOG STARPOINTS VOUCHER',
    stubValue: 'LKR 500 OFF',
    stubSubtext: 'ON MINIMUM SPEND OF LKR 2,500 • CARGILLSONLINE.COM',
    barcodeText: 'CARGILLS-500-BARCODE',
    validityDaysText: 'Valid for limited time',
    websiteUrl: 'cargillsonline.com',
    terms: [
      'Valid on minimum grocery cart spend of LKR 2,500.',
      'Applicable on cargillsonline.com web portal and mobile app.',
      'Enter promo code CARGILLS-500-OFF at checkout.',
      'Redeemable with Dialog StarPoints balance.'
    ]
  },
  {
    id: 'VOUCH-06',
    title: 'Fashion Bug – 10% Off (Min Spend LKR 3,000)',
    category: 'Shopping',
    discountOrValue: '10% Off on Min Spend LKR 3,000',
    status: 'available',
    statusLabel: 'Available',
    validUntil: '30 Nov 2026',
    code: 'FASHIONBUG-10-OFF',
    partnerName: 'Fashion Bug',
    partnerLogoBg: '#E11D48',
    imageUrl: fashionBugVoucherImg,
    pointsCost: 600,
    headline: 'FASHION BUG - STYLE THAT DEFINES YOU',
    subHeadline: '10% Off on Minimum Spend of LKR 3,000',
    bannerTag: '10% OFF VOUCHER',
    highlights: [
      { icon: 'Shirt', text: 'Wide range of fashion & apparel' },
      { icon: 'Award', text: 'Top quality products & trends' },
      { icon: 'ShoppingBag', text: 'Easy & secure in-store shopping' },
      { icon: 'Truck', text: 'Islandwide delivery on fashionbug.lk' }
    ],
    stubTitle: 'DIALOG STARPOINTS VOUCHER',
    stubValue: '10% OFF',
    stubSubtext: 'ON MINIMUM SPEND OF LKR 3,000 • REDEEM USING DIALOG STARPOINTS',
    barcodeText: 'FASHIONBUG-10-BARCODE',
    validityDaysText: 'Valid for limited time',
    websiteUrl: 'fashionbug.lk',
    terms: [
      '10% discount applicable on minimum invoice total of LKR 3,000.',
      'Redeemable at all Fashion Bug branches islandwide & online at fashionbug.lk.',
      'Present voucher code at billing counter before bill generation.',
      'Valid for limited time during promotional period.'
    ]
  }
];

export const PROMOTIONS: PromotionItem[] = [
  {
    id: 'PROMO-PAY-PHONE-BONUS',
    title: 'Star Points – Dialog Pay Phone Purchase Bonus',
    subtitle: 'Earn up to 5,000 Bonus Star Points on Smartphone Purchases via Dialog Pay',
    description: 'Purchase any 5G smartphone or device at Dialog Experience Centres, Dialog.lk online portal, or authorized Dialog Pay partners and earn up to 5,000 bonus Star Points with 0% installment plans.',
    startDate: '01/09/2026',
    endsDate: '31/12/2026',
    campaignName: 'Dialog Pay Smartphone Purchase Campaign 2026',
    ctaText: 'View Device Offers',
    tag: 'Device Bonus',
    tagColor: 'bg-emerald-700 text-white',
    multiplier: '+5,000 Bonus',
    category: 'Bonus',
    bonusReward: 'Up to 5,000 Bonus Star Points + LKR 1,000 Accessory Voucher',
    minSpend: 'LKR 50,000 on Smartphone Devices',
    channels: ['Dialog Experience Centres', 'Dialog.lk Online Store', 'Dialog Pay Partner Outlets'],
    terms: [
      'Valid on smartphone purchases settled via Dialog Pay between 01/09/2026 and 31/12/2026.',
      'Tier 1 (LKR 50,000 - 99,999): Earn 2,000 Bonus Star Points.',
      'Tier 2 (LKR 100,000+): Earn 5,000 Bonus Star Points + LKR 1,000 Original Accessories voucher.',
      'Bonus Star Points credited to your account within 48 hours of invoice settlement.',
      'Open to all verified Silver, Gold, and Platinum Dialog loyalty members.'
    ],
    imageIllustration: 'Smartphone'
  },
  {
    id: 'PROMO-ANNUAL-RECHARGE-OTT',
    title: 'Annual Recharge OTT Bonanza',
    subtitle: 'Get 3X Star Points + 12 Months Free Netflix / Dialog ViU Mini Subscription',
    description: 'Opt for an Annual Prepaid Mobile Recharge or 12-Month Advance Postpaid Settlement and receive 3X Star Points multiplier, 20GB monthly bonus streaming data, and complimentary OTT streaming passes for Dialog ViU and Netflix.',
    startDate: '01/09/2026',
    endsDate: '30/11/2026',
    campaignName: 'Annual Mobile & Home Broadband OTT Super Pack 2026',
    ctaText: 'Recharge Annual Plan',
    tag: 'Mega OTT Pack',
    tagColor: 'bg-purple-700 text-white',
    multiplier: '3X Points + OTT',
    category: 'Reloads',
    bonusReward: '3X Points Multiplier + Free 12-Month Netflix / ViU Pass',
    minSpend: 'LKR 12,000 Annual Mobile / Broadband Pack',
    channels: ['MyDialog App', 'Dialog Web Portal', 'Star Points Quick Recharge Portal'],
    terms: [
      'Valid on 12-month advance reloads or bill settlements completed between 01/09/2026 and 30/11/2026.',
      '3X Star Points multiplier credited automatically upon payment.',
      'OTT voucher redemption codes sent via SMS within 2 hours of payment.',
      'Includes 20GB monthly high-speed streaming data quota on Dialog 4G/5G network.',
      'Exclusive promotion for Star Points Gold & Platinum members.'
    ],
    imageIllustration: 'Tv'
  },
  {
    id: 'PROMO-01',
    title: 'Double Star Points',
    subtitle: 'Earn 2X Star Points on eligible Dialog reloads',
    description: 'Reload LKR 500 or more via MyDialog App or online web portal and receive double Star Points credited within 24 hours.',
    startDate: '01/08/2026',
    endsDate: '31/08/2026',
    campaignName: 'Digital Reload Accelerate 2026',
    ctaText: 'View Offer',
    tag: 'Limited Time',
    tagColor: 'bg-red-500 text-white',
    multiplier: '2X Points',
    category: 'Reloads',
    terms: [
      'Valid on all online reloads over LKR 500.',
      'Bonus points credited instantly.',
      'Available for all Gold and Platinum tier members.'
    ],
    imageIllustration: 'Zap'
  },
  {
    id: 'PROMO-02',
    title: 'Weekend Rewards',
    subtitle: 'Get additional rewards on selected transactions this weekend.',
    description: 'Earn 500 bonus Star Points when spending LKR 3,000 or more at participating partner supermarket and dining chains on Saturday and Sunday.',
    startDate: '01/08/2026',
    endsDate: '30/08/2026',
    campaignName: 'Weekend Partner Spends Promo',
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
    startDate: '15/08/2026',
    endsDate: '15/09/2026',
    campaignName: 'FlySMILES & Partner Miles Conversion 2026',
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
    title: 'Cargill Food City Offer',
    description: 'LKR 500 OFF on Minimum Spend of LKR 2,500 at Cargills Food City supermarkets and cargillsonline.com.',
    iconName: 'ShoppingBag',
    tierRequirement: 'Gold',
    highlightTag: 'LKR 500 OFF (Min. 25,000)'
  },
  {
    id: 'BEN-02',
    title: 'KFC Dining Privilege',
    description: 'Flat LKR 100 OFF on First Purchase at participating KFC Sri Lanka restaurants and online app orders.',
    iconName: 'Crown',
    tierRequirement: 'Gold',
    highlightTag: 'Flat LKR 100 OFF'
  },
  {
    id: 'BEN-03',
    title: '1.5x Earn Multiplier',
    description: 'Accelerated Star Points accrual across all Dialog mobile reloads, postpaid bills, and merchant spends.',
    iconName: 'TrendingUp',
    tierRequirement: 'Gold',
    highlightTag: '1.5x Accelerated'
  },
  {
    id: 'BEN-04',
    title: 'Priority Dialog Care & Flash Perks',
    description: 'Priority routing on 1777 customer helpline and early access to weekend double points campaigns.',
    iconName: 'Flame',
    tierRequirement: 'Gold',
    highlightTag: 'VIP Service'
  }
];

export const REDEMPTION_HISTORY: RedemptionRecord[] = [
  {
    id: 'RED-01',
    date: '18 Aug 2026',
    rewardTitle: 'LKR 500 Reload Voucher',
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
    title: 'LKR 500 Reload Voucher',
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
    description: 'Reload of LKR 1,000 on 077 123 4567 earned 500 Star Points.',
    iconName: 'Smartphone'
  },
  {
    id: 'JRN-02',
    date: '18 Aug 2026',
    title: 'LKR 500 Reload Voucher Redeemed',
    pointsChange: '-1,000 points',
    isPositive: false,
    description: 'Redeemed 1,000 points for a LKR 500 mobile reload voucher.',
    iconName: 'Gift'
  },
  {
    id: 'JRN-03',
    date: '15 Aug 2026',
    title: 'Dialog Mobile Recharge',
    pointsChange: '+750 points',
    isPositive: true,
    description: 'Reload of LKR 1,500 on 077 123 4567 earned 750 Star Points.',
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
  { id: '100', amount: 100, label: 'LKR 100', benefit: 'Basic reload', bonusPoints: 50 },
  { id: '250', amount: 250, label: 'LKR 250', benefit: 'Standard reload', bonusPoints: 125 },
  { id: '500', amount: 500, label: 'LKR 500', popular: true, benefit: 'Most Popular (250 pts)', bonusPoints: 250 },
  { id: '1000', amount: 1000, label: 'LKR 1,000', benefit: 'Heavy Usage (500 pts)', bonusPoints: 500 },
  { id: '1500', amount: 1500, label: 'LKR 1,500', popular: true, benefit: 'Max Value (750 pts)', bonusPoints: 750 },
  { id: '2000', amount: 2000, label: 'LKR 2,000', benefit: 'Monthly Pack (1,000 pts)', bonusPoints: 1000 },
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
    description: 'Use your points (1 Star Point = LKR 1.00)',
    iconName: 'Star',
    badge: '1 Pt = LKR 1'
  },
  {
    id: 'bank_transfer',
    title: 'Genie QR / Internet Banking',
    description: 'Sampath, Commercial, HNB, BOC & Genie QR',
    iconName: 'Building2'
  }
];
