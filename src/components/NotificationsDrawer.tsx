import React from 'react';
import { X, Bell, Sparkles, Clock, CheckCircle2, Award, ArrowRight } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isUnread: boolean;
  type: 'points' | 'expiry' | 'tier' | 'offer';
}

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToOffers?: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToOffers,
}) => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: '1,200 Star Points Expiring Soon',
      message: 'Your points will expire on 10 October 2026. Redeem now for reload vouchers.',
      time: '2 hours ago',
      isUnread: true,
      type: 'expiry',
    },
    {
      id: 'notif-2',
      title: 'Double Star Points Weekend Active!',
      message: 'Earn 2X bonus Star Points on all reloads over LKR 500 until 31 August.',
      time: '1 day ago',
      isUnread: true,
      type: 'offer',
    },
    {
      id: 'notif-3',
      title: '+500 Star Points Credited',
      message: 'Successfully earned points from mobile reload of LKR 1,000.',
      time: '2 days ago',
      isUnread: false,
      type: 'points',
    },
    {
      id: 'notif-4',
      title: 'Welcome to Gold Tier!',
      message: 'You have unlocked 1.5x accelerated earn rate and exclusive dining vouchers.',
      time: '01 Aug 2026',
      isUnread: false,
      type: 'tier',
    },
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black text-white">Notifications</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markAllRead}
              className="text-xs text-amber-300 hover:text-amber-200 underline cursor-pointer"
            >
              Mark all read
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1 divide-y divide-gray-100">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`pt-3 first:pt-0 p-3 rounded-2xl transition-colors ${
                n.isUnread ? 'bg-amber-50/50 border border-amber-200/60' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {n.isUnread && <span className="w-2 h-2 rounded-full bg-[#ED1C24]" />}
                  <h4 className="text-xs font-bold text-gray-900">{n.title}</h4>
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.time}</span>
              </div>

              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            type="button"
            onClick={() => {
              if (onNavigateToOffers) onNavigateToOffers();
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#ED1C24] hover:bg-[#C9141B] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Explore Active Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
