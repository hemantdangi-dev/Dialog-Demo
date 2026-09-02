export type ConnectionType = 'prepaid' | 'postpaid';

export type PaymentMethodId = 'card' | 'dialog_pay' | 'ez_cash' | 'star_points' | 'bank_transfer';

export type TierLevel = 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export type VoucherStatus = 'available' | 'used' | 'expiring_soon' | 'expired';

export type TransactionType = 'earned' | 'redeemed' | 'tier_upgrade' | 'voucher' | 'promotion';

export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export interface CustomerProfile {
  name: string;
  salutation: string;
  mobileNumber: string;
  rawMobile: string;
  email: string;
  customerSince: string;
  avatarUrl: string;
  tier: TierLevel;
  pointsBalance: number;
  pointsExpiringSoon: number;
  expiryDays: number;
  expiryDateFormatted: string;
  nextTier: TierLevel;
  pointsToNextTier: number;
  nextTierThreshold: number;
  currentTierMin: number;
  earnedThisMonth: number;
  redeemedTotal: number;
  growthRatePercent: number;
}

export interface TierDefinition {
  id: TierLevel;
  name: string;
  rangeLabel: string;
  minPoints: number;
  maxPoints: number | null;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentColor: string;
  gradient: string;
  multiplier: string;
  summary: string;
  benefits: string[];
}

export interface TierAssessmentBenefitItem {
  id: string;
  partner: string;
  offer: string;
  fullTitle: string;
  type: 'dining' | 'groceries' | 'travel' | 'devices' | 'broadband' | 'fashion';
}

export interface TierAssessmentCategory {
  categoryName: string;
  subCategoryTitle: string;
  unassignedBenefits: {
    title: string;
    description: string;
    details?: string;
  }[];
  tierBenefits: {
    silver: TierAssessmentBenefitItem[];
    gold: TierAssessmentBenefitItem[];
    platinum: TierAssessmentBenefitItem[];
  };
}

export interface PointsSummaryMetric {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  helperText: string;
  iconName: string;
  trendText?: string;
  trendPositive?: boolean;
  colorTheme: 'red' | 'gold' | 'purple' | 'amber';
}

export interface PointsChartPoint {
  period: string;
  earned: number;
  redeemed: number;
  netBalance: number;
}

export interface LoyaltyTransaction {
  id: string;
  date: string;
  time: string;
  activity: string;
  description: string;
  points: number;
  isPositive: boolean;
  status: TransactionStatus;
  category: 'Recharge' | 'Bill' | 'Voucher' | 'Partner' | 'Tier' | 'Promo';
  mobileNumber?: string;
  rechargeAmount?: number;
  referenceId: string;
  merchant?: string;
}

export interface RechargeRecord {
  id: string;
  date: string;
  mobileNumber: string;
  rechargeAmount: number;
  pointsEarned: number;
  paymentMethod: string;
  status: 'Completed' | 'Pending';
  referenceId: string;
}

export interface VoucherItem {
  id: string;
  title: string;
  category: 'Reload' | 'Dining' | 'Shopping' | 'Travel' | 'Entertainment' | 'Healthcare';
  discountOrValue: string;
  status: VoucherStatus;
  statusLabel: string;
  validUntil: string;
  redeemedDate?: string;
  code: string;
  partnerName: string;
  partnerLogoBg: string;
  terms: string[];
  pointsCost: number;
  imageUrl?: string;
  headline?: string;
  subHeadline?: string;
  bannerTag?: string;
  highlights?: { icon: string; text: string }[];
  stubTitle?: string;
  stubValue?: string;
  stubSubtext?: string;
  barcodeText?: string;
  validityDaysText?: string;
  websiteUrl?: string;
  howItWorks?: string[];
  themeColor?: string;
}

export interface PromotionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startDate?: string;
  endsDate: string;
  campaignName?: string;
  ctaText: string;
  tag: string;
  tagColor: string;
  multiplier?: string;
  category: 'Reloads' | 'Partners' | 'Weekend' | 'Bonus';
  terms: string[];
  imageIllustration: string;
  imageUrl?: string;
  bannerTagline?: string;
  headlineHighlight?: string;
  bonusReward?: string;
  channels?: string[];
  minSpend?: string;
  whyLoveIt?: { title: string; subtitle: string; iconName?: string }[];
  eligiblePacks?: string[];
  howItWorksSteps?: { step: number; title: string; desc: string; iconName?: string }[];
  footerSlogan?: string;
}

export interface TierBenefitCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tierRequirement: TierLevel;
  highlightTag?: string;
}

export interface RedemptionRecord {
  id: string;
  date: string;
  rewardTitle: string;
  pointsUsed: number;
  status: 'Redeemed' | 'Completed';
  category: 'Vouchers' | 'Reloads' | 'Partner Rewards';
  referenceId: string;
  partnerOrService: string;
}

export interface RecommendedReward {
  id: string;
  title: string;
  category: 'Reload' | 'Dining' | 'Shopping' | 'Travel';
  pointsRequired: number;
  originalLkrValue: number;
  ctaText: 'Redeem Now' | 'View Reward';
  partnerName: string;
  badge?: string;
  colorTheme: string;
  description: string;
}

export interface JourneyTimelineEvent {
  id: string;
  date: string;
  title: string;
  pointsChange: string;
  isPositive: boolean;
  isTierChange?: boolean;
  description: string;
  iconName: string;
}

export interface PaymentOption {
  id: PaymentMethodId;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  isRecommended?: boolean;
}

export interface RechargePreset {
  id: string;
  amount: number;
  label: string;
  popular?: boolean;
  bonusPoints?: number;
  benefit?: string;
}
