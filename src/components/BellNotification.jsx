import { useState, useRef, useEffect } from 'react';
import { Bell, X, Clock, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { notifications, notificationCount } from '../static/dummyData_Notifications';
import { FaRegBell } from "react-icons/fa";
import { Button } from '@mui/material';
import { useUser } from '../UserContext';


const BellNotification = ({ mobile = false }) => {

    const { user } = useUser();
    const subscriptionActive = user.subscription_active;

    const [isOpen, setIsOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [clicked, setClicked] = useState(false);
    const popupRef = useRef(null);
    const bellRef = useRef(null);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) && 
                bellRef.current && !bellRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowAll(false);
                setClicked(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNotificationIcon = (type) => {
        const iconClass = "w-4 h-4 flex-shrink-0 mt-0.5";
        switch (type) {
            case 'success':
                return <CheckCircle className={`${iconClass} text-green-500`} />;
            case 'warning':
                return <AlertTriangle className={`${iconClass} text-yellow-500`} />;
            case 'error':
                return <XCircle className={`${iconClass} text-red-500`} />;
            default:
                return <Info className={`${iconClass} text-blue-500`} />;
        }
    };

    const getNotificationBorderColor = (type) => {
        switch (type) {
            case 'success':
                return 'border-l-green-500';
            case 'warning':
                return 'border-l-yellow-500';
            case 'error':
                return 'border-l-red-500';
            default:
                return 'border-l-blue-500';
        }
    };

    const displayedNotifications = showAll ? (notifications || []) : (notifications || []).slice(0, 4);

    // Early return if user context is not loaded
    if (!user) {
        return (
            <div className="relative">
                <button className={`border-none rounded-lg transition-colors duration-200 text-white cursor-pointer bg-transparent ${mobile ? 'p-1' : 'p-2'}`}>
                    <FaRegBell size={mobile ? 18 : 29} />
                </button>
            </div>
        );
    }

    if (!user.notificationsEnabled || !subscriptionActive) {
        return (
            <div className="relative">
                <button
                    className="p-2 rounded-full hover:bg-gray-500 transition-colors duration-200 opacity-50 cursor-not-allowed"
                    disabled={true}
                    title="Notifications are disabled"
                >
                    <Bell className="w-6 h-6 text-gray-400" />
                </button>
            </div>
        );
    }

    const handleBellClick = () => {
        setIsOpen(!isOpen);
        setClicked(prev => !prev);
        if (!isOpen) {
            setShowAll(false);
        }
    };

    return (
        <div className="relative">
            {/* Notification Bell Icon */}
            <button
                ref={bellRef}
                onClick={handleBellClick}
                aria-label="Notifications"
                className={`flex justify-center items-center rounded-lg border-none transition-all duration-200 text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${clicked ? 'bg-slate-900' : 'bg-transparent hover:bg-[#1E3A8A]/90'} ${mobile ? 'p-2' : 'p-2'} shadow-sm`}
                title="Notifications"
                type="button"
            >
                <FaRegBell size={mobile ? 18 : 30} />
                {notificationCount() > 0  &&  (
                    <span className={`absolute -top-1 -right-1 border-none rounded-full flex items-center justify-center font-semibold text-white shadow-sm ${mobile ? 'w-4 h-4 text-[10px]' : 'w-5 h-5 text-[10px]'} bg-red-500`}> 
                        <span className='block leading-none'>{notificationCount()}</span>
                    </span>
                )}
            </button>

            {/* Notification Popup */}
            {isOpen && (
                <>
                    {/* Backdrop overlay for mobile */}
                    {mobile && (
                        <div className="fixed inset-0 bg-black/50 z-40" />
                    )}
                    
                    <div
                        ref={popupRef}
                        className={`${mobile ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : 'absolute left-12 sm:left-14 md:left-16 bottom-0'} w-80 rounded-2xl border border-solid border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.08)] z-50 overflow-hidden`}
                    >
                    {/* Header */}
                    <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm border-b border-solid border-slate-200/70">
                        <div className="flex items-center gap-2.5 px-3 py-2.5">
                            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center shadow-inner">
                                <Bell className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm sm:text-base font-semibold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">Notifications</h3>
                                <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-blue-500/70 via-indigo-500/60 to-transparent rounded-full" />
                            </div>
                        </div>
                        <Button
                            sx={{ borderRadius:'10px' }}
                            onClick={() => { setIsOpen(false); setClicked(false) }}
                            className="text-slate-400 hover:text-slate-700 transition-colors"
                        >
                            <X size={20} />
                        </Button>
                    </div>

                    {/* Notifications List */}
                    <div className={`${showAll ? 'max-h-96 overflow-y-auto' : ''} scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent`}
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {displayedNotifications.length > 0 ? (
                            displayedNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 border-b border-solid border-slate-100/80 hover:bg-slate-50/70 transition-colors border-l-4 ${getNotificationBorderColor(notification.type)}`}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div className="mt-0.5">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        {/* Message */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-800 leading-relaxed">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center mt-2 text-xs text-slate-500">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {notification.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-slate-500">
                                <Bell className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                <p>No notifications yet</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 4 && (
                        <div className="p-3 bg-white/70 backdrop-blur-sm border-t border-solid border-slate-200/70">
                            {!showAll ? (
                                <Button
                                    variant='outlined'
                                    onClick={() => setShowAll(true)}
                                    sx={{ backgroundColor: 'white' }}
                                    className="w-full text-center text-sm hover:text-blue-800 font-medium py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
                                >
                                    View All Notifications
                                </Button>
                            ) : (
                                <Button
                                    variant='outlined'
                                    onClick={() => setShowAll(false)}
                                    sx={{ backgroundColor: 'white' }}
                                    className="w-full text-center text-sm hover:text-blue-800 font-medium py-2 px-4 rounded-md hover:bg-slate-100 transition-colors"
                                >
                                    Show Less
                                </Button>
                            )}
                        </div>
                    )}
                    </div>
                </>
            )}
        </div>
    );
};


export default BellNotification;