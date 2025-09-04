import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { Bell, BellRing, CheckCircle, AlertTriangle, Info, DollarSign, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { notifications as notificationsData, notificationCount } from '../static/dummyData_Notifications';
import { useUser } from '../UserContext';


const typeConfig = {
  info: {
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    icon: Info
  },
  success: {
    bgColor: 'bg-green-50',
    borderColor: 'border-green-400',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    icon: CheckCircle
  },
  warning: {
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-400',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    icon: AlertTriangle
  },
  error: {
    bgColor: 'bg-red-50',
    borderColor: 'border-red-400',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    icon: AlertTriangle
  }
};

const getNotificationIcon = (message) => {
  if (message.toLowerCase().includes('payment') || message.toLowerCase().includes('received')) {
    return DollarSign;
  }
  if (message.toLowerCase().includes('feedback') || message.toLowerCase().includes('client')) {
    return MessageSquare;
  }
  if (message.toLowerCase().includes('job') || message.toLowerCase().includes('opportunity')) {
    return BellRing;
  }
  return Info;
};

const NotificationItem = ({ notification, index, onNotificationClick }) => {
  const config = typeConfig[notification.type] || typeConfig.info;
  const IconComponent = getNotificationIcon(notification.message);
  return (
    <motion.div
      className={`group relative rounded-2xl border border-solid ${config.bgColor} ${config.borderColor} pl-1.5 pr-1.5 border-solid border overflow-hidden cursor-pointer transition-all duration-300 bg-white/70 backdrop-blur hover:shadow-[0_4px_14px_-4px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.08)]`}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={onNotificationClick}
    >
      {/* Ambient hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-8 -left-6 w-32 h-32 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),rgba(59,130,246,0)_70%)] blur-2xl" />
        <div className="absolute -bottom-8 -right-4 w-36 h-36 bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.18),rgba(99,102,241,0)_70%)] blur-2xl" />
      </div>
      <div className="relative px-4 py-3 flex items-start gap-3">
        <div className={`w-9 h-9 rounded-xl ${config.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5 border border-solid border-white/40 shadow-sm`}> 
          <IconComponent className={`w-4.5 h-4.5 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] sm:text-sm font-medium text-slate-800 leading-relaxed mb-1 line-clamp-2">
            {notification.message}
          </p>
          <p className="text-[11px] text-slate-500 font-medium tracking-wide">
            {notification.time}
          </p>
        </div>
        <div className="relative flex items-center justify-center mt-1">
          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 shadow ring-2 ring-white/60" />
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
    </motion.div>
  );
};



const Notifications = () => {

  const { user } = useUser();
  const subscriptionActive = user.subscription_active;

  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null); // outer wrapper for outside click detection
  const scrollAreaRef = useRef(null); // scrollable glass container

  // Use imported notifications and notificationCount
  const allNotifications = notificationsData;
  const count = notificationCount();

  const displayedNotifications = showAll ? allNotifications : allNotifications.slice(0, 3);

  // Close on outside click when showAll is true
  useEffect(() => {
    if (!showAll) return;
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowAll(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAll]);

  const handleNotificationClick = (notification) => {
    if (notification.locked) {
      setOpenModal(true);
    } else {
      // Handle the notification click for unlocked notifications
      console.log('Notification clicked:', notification);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Reset scroll position when collapsing back to compact view
  useEffect(() => {
    if (!showAll && scrollAreaRef.current) {
      // Use rAF to ensure DOM has applied the new overflow style before resetting
      requestAnimationFrame(() => {
        scrollAreaRef.current.scrollTop = 0;
      });
    }
  }, [showAll]);



  return (
    <div ref={containerRef} className="w-full h-fit rounded-3xl flex flex-col">
      <motion.div
        className="relative group/container rounded-3xl bg-white/80 backdrop-blur-xl border border-solid border-slate-200/70 shadow-[0_6px_22px_-6px_rgba(0,0,0,0.20),0_3px_10px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden"
        ref={scrollAreaRef}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        style={ showAll ? { maxHeight: 545, overflowY: 'auto' } : { maxHeight: 545, overflowY: 'hidden' } }
      >
        {/* Ambient gradients */}
        {/* <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/container:opacity-100 transition-opacity duration-700">
          <div className="absolute -top-28 -left-20 w-80 h-80 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.22),rgba(59,130,246,0)_70%)] blur-2xl" />
          <div className="absolute -bottom-36 -right-16 w-96 h-96 bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.26),rgba(99,102,241,0)_70%)] blur-2xl" />
        </div> */}

        {/* Header */}
        <div style={{ borderBottom: '1px solid rgba(226,232,240,0.6)' }} className="relative px-5 sm:px-7 pt-2 sm:pt-4 pb-4 sm:pb-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">Notifications</h2>
              <div className="mt-2 h-1 w-32 bg-gradient-to-r from-blue-500/70 via-indigo-500/70 to-transparent rounded-full" />
              <p className="text-[11px] sm:text-xs text-slate-500 mt-2 ml-0.5">Stay updated with your activities</p>
            </div>
            <motion.div className="relative" whileHover={{ scale: 1.06 }}>
              {subscriptionActive && user.notificationsEnabled && (
                <>
                  <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/60">
                    <span className="text-xs text-white font-bold">{count}</span>
                  </div>
                  {count > 0 && (
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-400 rounded-full animate-pulse" />
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-4 sm:p-5">
          <div className="space-y-3">
            {!subscriptionActive ? (
              <div className="text-center py-10 sm:py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center border border-solid border-slate-200/70">
                  <Bell className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 text-sm sm:text-base font-semibold mb-1">Notifications are locked</p>
                <p className="text-slate-400 text-xs sm:text-sm">Subscribe to unlock notifications and stay updated.</p>
              </div>
            ) : count === 0 || !user.notificationsEnabled ? (
              <div className="text-center py-10 sm:py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center border border-solid border-slate-200/70">
                  <Bell className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 text-sm sm:text-base font-semibold mb-1">No notifications</p>
                <p className="text-slate-400 text-xs sm:text-sm">We'll notify you when something happens</p>
              </div>
            ) : (
              displayedNotifications.map((notification, index) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  index={index}
                  onNotificationClick={() => handleNotificationClick(notification)}
                />
              ))
            )}
          </div>

          {/* Action Buttons */}
          {(!showAll && count > 3 && user.notificationsEnabled && subscriptionActive) && (
            <motion.div className='mt-3' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Button
                variant="outlined"
                sx={{ borderRadius: '14px', textTransform: 'none', padding: '10px 14px', fontWeight: 500 }}
                className="w-full bg-white/70 backdrop-blur border border-solid border-slate-200/70 hover:border-blue-300 hover:bg-blue-50/60 text-slate-700 hover:text-blue-700 shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => setShowAll(true)}
              >
                <span className="flex items-center justify-center gap-2 text-[12px] sm:text-sm font-medium tracking-wide">
                  View All Notifications
                  <ChevronDown size={16} />
                </span>
              </Button>
            </motion.div>
          )}
          {(showAll && count > 3 && user.notificationsEnabled && subscriptionActive) && (
            <motion.div className='mt-3' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Button
                variant="outlined"
                sx={{ borderRadius: '14px', textTransform: 'none', padding: '10px 14px', fontWeight: 500 }}
                className="w-full bg-white/70 backdrop-blur border border-solid border-slate-200/70 hover:border-blue-300 hover:bg-blue-50/60 text-slate-700 hover:text-blue-700 shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => setShowAll(false)}
              >
                <span className="flex items-center justify-center gap-2 text-[12px] sm:text-sm font-medium tracking-wide">
                  Show Less
                  <ChevronUp size={16} />
                </span>
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;