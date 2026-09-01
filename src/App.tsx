import React, { useState } from 'react';
import {
  INITIAL_CUSTOMER_PROFILE,
  RECENT_TRANSACTIONS,
  RECHARGE_HISTORY,
  MY_VOUCHERS,
  PROMOTIONS,
  RECOMMENDED_REWARDS
} from './data/mockData';
import {
  CustomerProfile,
  LoyaltyTransaction,
  RechargeRecord,
  VoucherItem,
  PromotionItem,
  RecommendedReward
} from './types';

// Components
import { Header } from './components/Header';
import { CustomerWelcome } from './components/CustomerWelcome';
import { QuickActions } from './components/QuickActions';
import { PointsExpiryAlert } from './components/PointsExpiryAlert';
import { PersonalizedGamification } from './components/PersonalizedGamification';
import { LoyaltyMembershipOverview } from './components/LoyaltyMembershipOverview';
import { TierOverview } from './components/TierOverview';
import { PointsSummaryCards } from './components/PointsSummaryCards';
import { PointsActivityChart } from './components/PointsActivityChart';
import { RecentTransactionsAndRecharge } from './components/RecentTransactionsAndRecharge';
import { CustomerJourneyTimeline } from './components/CustomerJourneyTimeline';
import { MyVouchersSection } from './components/MyVouchersSection';
import { OffersAndPromotions } from './components/OffersAndPromotions';
import { GoldTierBenefits } from './components/GoldTierBenefits';
import { RedemptionHistory } from './components/RedemptionHistory';
import { RecommendedRewards } from './components/RecommendedRewards';
import { Footer } from './components/Footer';

// Modals
import { TransactionDetailModal } from './components/TransactionDetailModal';
import { RedeemPointsModal } from './components/RedeemPointsModal';
import { RechargeModal } from './components/RechargeModal';
import { VoucherDetailModal } from './components/VoucherDetailModal';
import { PromotionDetailModal } from './components/PromotionDetailModal';
import { TierModal } from './components/TierModal';
import { ProfileModal } from './components/ProfileModal';
import { HelpModal } from './components/HelpModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';

export function App() {
  // Customer State
  const [profile, setProfile] = useState<CustomerProfile>(INITIAL_CUSTOMER_PROFILE);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>(RECENT_TRANSACTIONS);
  const [recharges, setRecharges] = useState<RechargeRecord[]>(RECHARGE_HISTORY);
  const [vouchers, setVouchers] = useState<VoucherItem[]>(MY_VOUCHERS);

  // Active Navigation Tab
  const [activeNavTab, setActiveNavTab] = useState<string>('overview');

  // Modal State Controls
  const [selectedTransaction, setSelectedTransaction] = useState<LoyaltyTransaction | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherItem | null>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionItem | null>(null);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Smooth scroll or filter by navigation tab
  const handleNavTabClick = (tabId: string) => {
    setActiveNavTab(tabId);
    const elementMap: Record<string, string> = {
      overview: 'customer-welcome-section',
      points: 'points-overview-section',
      vouchers: 'vouchers-section',
      promotions: 'promotions-section',
      benefits: 'tier-benefits-section',
      transactions: 'transactions-recharge-section',
    };

    const targetId = elementMap[tabId];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // 1. Recharge simulation: Adds points & logs transaction
  const handleConfirmRecharge = (amount: number, pointsEarned: number, paymentMethod: string) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedTime = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const refCode = `SP-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Update Customer Profile
    setProfile((prev) => {
      const newPoints = prev.pointsBalance + pointsEarned;
      const newEarnedMonth = prev.earnedThisMonth + pointsEarned;
      const newPointsToNext = Math.max(0, prev.nextTierThreshold - newPoints);
      return {
        ...prev,
        pointsBalance: newPoints,
        earnedThisMonth: newEarnedMonth,
        pointsToNextTier: newPointsToNext,
      };
    });

    // Add to Transactions
    const newTxn: LoyaltyTransaction = {
      id: `TXN-${Date.now()}`,
      date: formattedDate,
      time: formattedTime,
      activity: 'Points Earned',
      description: `Dialog Mobile Recharge (LKR ${amount.toLocaleString()})`,
      points: pointsEarned,
      isPositive: true,
      status: 'Completed',
      category: 'Recharge',
      mobileNumber: profile.mobileNumber,
      rechargeAmount: amount,
      referenceId: refCode,
      merchant: 'Dialog Axiata PLC',
    };
    setTransactions((prev) => [newTxn, ...prev]);

    // Add to Recharge History
    const newRecharge: RechargeRecord = {
      id: `REC-${Date.now()}`,
      date: formattedDate,
      mobileNumber: profile.mobileNumber,
      rechargeAmount: amount,
      pointsEarned,
      paymentMethod,
      status: 'Completed',
      referenceId: refCode,
    };
    setRecharges((prev) => [newRecharge, ...prev]);
  };

  // 2. Redemption simulation: Deducts points & creates voucher / transaction
  const handleConfirmRedemption = (points: number, title: string, category: string) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedTime = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const refCode = `RED-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    setProfile((prev) => ({
      ...prev,
      pointsBalance: Math.max(0, prev.pointsBalance - points),
      redeemedTotal: prev.redeemedTotal + points,
    }));

    const newTxn: LoyaltyTransaction = {
      id: `TXN-${Date.now()}`,
      date: formattedDate,
      time: formattedTime,
      activity: 'Points Redeemed',
      description: `Redemption: ${title}`,
      points: points,
      isPositive: false,
      status: 'Completed',
      category: 'Voucher',
      referenceId: refCode,
      merchant: 'Star Points Rewards',
    };
    setTransactions((prev) => [newTxn, ...prev]);
  };

  // 3. Use Voucher
  const handleUseVoucher = (voucher: VoucherItem) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === voucher.id ? { ...v, status: 'used', statusLabel: 'Used', redeemedDate: 'Today' } : v))
    );
  };

  // 4. Save Profile
  const handleSaveProfile = (updated: Partial<CustomerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  // 5. Recommended reward redeem trigger
  const handleRedeemReward = (reward: RecommendedReward) => {
    handleConfirmRedemption(reward.pointsRequired, reward.title, reward.category);
    alert(`Reward Claimed: ${reward.title} for ${reward.pointsRequired.toLocaleString()} points.`);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-gray-900 flex flex-col selection:bg-red-500 selection:text-white">
      {/* 1. Header */}
      <Header
        profile={profile}
        activeNavTab={activeNavTab}
        onNavTabClick={handleNavTabClick}
        onProfileClick={() => setIsProfileModalOpen(true)}
        onHelpClick={() => setIsHelpModalOpen(true)}
        onNotificationsClick={() => setIsNotificationsOpen(true)}
      />

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* 2. Customer Welcome / Profile Summary */}
        <div id="customer-welcome-section">
          <CustomerWelcome
            profile={profile}
            onViewProfile={() => setIsProfileModalOpen(true)}
            onEditProfile={() => setIsProfileModalOpen(true)}
          />
        </div>

        {/* 3. Quick Action Buttons */}
        <QuickActions
          onRechargeClick={() => setIsRechargeOpen(true)}
          onRedeemClick={() => setIsRedeemOpen(true)}
          onVouchersClick={() => handleNavTabClick('vouchers')}
          onOffersClick={() => handleNavTabClick('promotions')}
        />

        {/* 4. Points Expiry Alert */}
        <PointsExpiryAlert
          expiringPoints={profile.pointsExpiringSoon}
          expiryDate={profile.expiryDateFormatted}
          expiryDays={profile.expiryDays}
          onExploreRewards={() => setIsRedeemOpen(true)}
        />

        {/* 4.1 Personalized Gamification Element (Streak Challenge & Milestone Reward) */}
        <PersonalizedGamification
          profile={profile}
          onOpenRecharge={() => setIsRechargeOpen(true)}
          onOpenRedeem={() => setIsRedeemOpen(true)}
          onNavigateVouchers={() => handleNavTabClick('vouchers')}
        />

        {/* 5. Loyalty Membership Overview (Main Hero Card) */}
        <LoyaltyMembershipOverview
          profile={profile}
          onViewTierBenefits={() => setIsTierModalOpen(true)}
          onRedeemPoints={() => setIsRedeemOpen(true)}
        />

        {/* 6. Tier Progression Track */}
        <TierOverview
          currentTier={profile.tier}
          pointsToNextTier={profile.pointsToNextTier}
          onViewAllTierBenefits={() => setIsTierModalOpen(true)}
        />

        {/* 7. Points Summary Metrics */}
        <PointsSummaryCards
          profile={profile}
          onViewPointsHistory={() => handleNavTabClick('transactions')}
        />

        {/* 8. Points Activity Chart */}
        <PointsActivityChart />

        {/* 9. Recent Transactions & Recharge History */}
        <div id="transactions-recharge-section">
          <RecentTransactionsAndRecharge
            transactions={transactions}
            recharges={recharges}
            onSelectTransaction={(txn) => setSelectedTransaction(txn)}
            onViewAllTransactions={() => handleNavTabClick('transactions')}
            onViewAllRecharges={() => handleNavTabClick('transactions')}
            onRechargeNow={() => setIsRechargeOpen(true)}
          />
        </div>

        {/* 10. Priya's Star Points Journey Timeline */}
        <CustomerJourneyTimeline />

        {/* 11. My Vouchers Section */}
        <div id="vouchers-section">
          <MyVouchersSection
            vouchers={vouchers}
            onSelectVoucher={(voucher) => setSelectedVoucher(voucher)}
            onUseVoucher={handleUseVoucher}
            onViewAllVouchers={() => handleNavTabClick('vouchers')}
          />
        </div>

        {/* 12. Offers & Promotions */}
        <div id="promotions-section">
          <OffersAndPromotions
            onSelectPromotion={(promo) => setSelectedPromotion(promo)}
          />
        </div>

        {/* 13. Your Gold Tier Benefits */}
        <div id="tier-benefits-section">
          <GoldTierBenefits
            onExploreAllBenefits={() => setIsTierModalOpen(true)}
          />
        </div>

        {/* 14. Recommended For You (Personalized Rewards) */}
        <RecommendedRewards
          userPoints={profile.pointsBalance}
          onRedeemReward={handleRedeemReward}
          onViewReward={(reward) => {
            alert(`Reward Details: ${reward.title} (${reward.pointsRequired} Star Points) - Redeemable at ${reward.partnerName}`);
          }}
        />

        {/* 15. Points Redemption History */}
        <RedemptionHistory
          onViewFullHistory={() => handleNavTabClick('transactions')}
          onSelectRedemption={(record) => {
            setSelectedTransaction({
              id: record.id,
              date: record.date,
              time: '12:00 PM',
              activity: 'Points Redeemed',
              description: record.rewardTitle,
              points: record.pointsUsed,
              isPositive: false,
              status: 'Completed',
              category: 'Voucher',
              referenceId: record.referenceId,
              merchant: record.partnerOrService,
            });
          }}
        />
      </main>

      {/* Footer with Demo Disclaimer */}
      <Footer
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onOpenTiers={() => setIsTierModalOpen(true)}
      />

      {/* Interactive Modals */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />

      <RedeemPointsModal
        isOpen={isRedeemOpen}
        onClose={() => setIsRedeemOpen(false)}
        profile={profile}
        onConfirmRedemption={handleConfirmRedemption}
      />

      <RechargeModal
        isOpen={isRechargeOpen}
        onClose={() => setIsRechargeOpen(false)}
        profile={profile}
        onConfirmRecharge={handleConfirmRecharge}
      />

      <VoucherDetailModal
        voucher={selectedVoucher}
        onClose={() => setSelectedVoucher(null)}
        onUseNow={handleUseVoucher}
      />

      <PromotionDetailModal
        promotion={selectedPromotion}
        onClose={() => setSelectedPromotion(null)}
        onParticipate={() => {
          setIsRechargeOpen(true);
        }}
      />

      <TierModal
        isOpen={isTierModalOpen}
        onClose={() => setIsTierModalOpen(false)}
        profile={profile}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToOffers={() => handleNavTabClick('promotions')}
      />
    </div>
  );
}
export default App;
