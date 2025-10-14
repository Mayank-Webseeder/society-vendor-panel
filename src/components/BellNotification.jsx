import { useState, useRef, useEffect } from 'react';
import { Bell, X, Clock, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { notifications, notificationCount } from '../static/dummyData_Notifications';
import { FaRegBell } from "react-icons/fa";
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { useUser } from '../UserContext';

const BellNotification = ({ mobile = false }) => {
    const { user } = useUser();
    const subscriptionActive = user?.subscription_active;

    const [isOpen, setIsOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const popupRef = useRef(null);
    const bellRef = useRef(null);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) &&
                bellRef.current && !bellRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowAll(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getNotificationIcon = (type) => {
        const iconClass = "w-4 h-4 flex-shrink-0 mt-0.5";
        switch (type) {
            case 'success':
                return <CheckCircle className={`${iconClass} text-green-600`} />;
            case 'warning':
                return <AlertTriangle className={`${iconClass} text-orange-500`} />;
            case 'error':
                return <XCircle className={`${iconClass} text-red-600`} />;
            default:
                return <Info className={`${iconClass} text-gray-600`} />;
        }
    };

    const getNotificationBorderColor = (type) => {
        switch (type) {
            case 'success':
                return 'border-l-green-600';
            case 'warning':
                return 'border-l-orange-500';
            case 'error':
                return 'border-l-red-600';
            default:
                return 'border-l-gray-400';
        }
    };

    const displayedNotifications = showAll ? (notifications || []) : (notifications || []).slice(0, 4);

    // Early return if user context is not loaded
    if (!user) {
        return (
            <div className="flex justify-center">
                <Tooltip
                    title="Loading..."
                    placement="right"
                    slotProps={{
                        tooltip: {
                            sx: {
                                fontSize: '0.75rem',
                                padding: '6px 10px',
                                backgroundColor: 'white',
                                color: '#1f2937',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }
                        }
                    }}
                >
                    <div className={`flex items-center justify-center rounded-lg transition-all duration-200 ${mobile ? 'w-9 h-9' : 'w-10 h-10'} text-gray-400`}>
                        <FaRegBell size={mobile ? 18 : 20} />
                    </div>
                </Tooltip>
            </div>
        );
    }

    if (!user.notificationsEnabled || !subscriptionActive) {
        return (
            <div className="flex justify-center">
                <Tooltip
                    title="Notifications are disabled"
                    placement="right"
                    slotProps={{
                        tooltip: {
                            sx: {
                                fontSize: '0.75rem',
                                padding: '6px 10px',
                                backgroundColor: 'white',
                                color: '#1f2937',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }
                        }
                    }}
                >
                    <div
                        className={`flex items-center justify-center rounded-lg transition-all duration-200 ${mobile ? 'w-9 h-9' : 'w-10 h-10'} text-gray-300 cursor-not-allowed opacity-50`}
                    >
                        <Bell size={mobile ? 18 : 20} />
                    </div>
                </Tooltip>
            </div>
        );
    }

    const handleBellClick = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setShowAll(false);
        }
    };

    // Check if this is the active notification "page"
    const isActive = isOpen;

    return (
        <div className="flex justify-center">
            {/* Notification Bell Icon - styled like sidebar icons */}
            <Tooltip
                title="Notifications"
                placement="right"
                slotProps={{
                    tooltip: {
                        sx: {
                            fontSize: '0.75rem',
                            padding: '6px 10px',
                            backgroundColor: 'white',
                            color: '#1f2937',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }
                    }
                }}
            >
                <button
                    ref={bellRef}
                    onClick={handleBellClick}
                    aria-label="Notifications"
                    className={`
                        relative flex items-center justify-center rounded-lg transition-all duration-200
                        focus:outline-none
                        ${mobile ? 'w-9 h-9' : 'w-10 h-10'}
                        ${isActive
                            ? 'bg-white text-gray-800 shadow-sm'
                            : 'text-gray-800 hover:text-white hover:bg-gray-700'
                        }
                    `}
                    type="button"
                >
                    <FaRegBell size={mobile ? 18 : 20} className="transition-colors duration-200" />

                    {/* Notification Count Badge */}
                    {notificationCount() > 0 && (
                        <span className={`
                            absolute -top-1 -right-1 rounded-full flex items-center justify-center 
                            font-semibold text-white shadow-sm bg-red-500
                            ${mobile ? 'w-4 h-4 text-[10px]' : 'w-5 h-5 text-[10px]'}
                        `}>
                            <span className={`leading-none ${mobile ? 'pr-[1px]' : 'pr-[0px]'}`}>
                                {notificationCount()}
                            </span>
                        </span>
                    )}

                    {/* Active State Indicator - same as sidebar */}
                    {isActive && !mobile && (
                        <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-gray-800 rounded-full" />
                    )}
                    {isActive && mobile && (
                        <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-gray-800 rounded-full" />
                    )}
                </button>
            </Tooltip>

            {/* Notification Popup */}
            {isOpen && (
                <>
                    {/* Backdrop overlay for mobile */}
                    {mobile && (
                        <div className="fixed inset-0 bg-black/20 z-40" />
                    )}

                    <div
                        ref={popupRef}
                        className={`
                            ${mobile
                                ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                                : 'absolute left-12 sm:left-14 md:left-16 bottom-0'
                            } 
                            w-80 rounded-lg bg-white shadow-lg border border-gray-200 z-50 overflow-hidden
                        `}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200">
                            <div className="flex items-center gap-3 px-4 py-3">
                                <div className="w-6 h-6 rounded-md bg-gray-800 text-white flex items-center justify-center">
                                    <Bell className="w-3.5 h-3.5" />
                                </div>
                                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                            </div>
                            <Button
                                onClick={() => setIsOpen(false)}
                                sx={{
                                    minWidth: 'auto',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    marginRight: '8px',
                                    color: '#6b7280',
                                    '&:hover': {
                                        backgroundColor: '#f3f4f6',
                                        color: '#374151'
                                    }
                                }}
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        {/* Notifications List */}
                        <div className={`${showAll ? 'max-h-96 overflow-y-auto' : ''} scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}>
                            {displayedNotifications.length > 0 ? (
                                displayedNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors border-l-4 ${getNotificationBorderColor(notification.type)}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Icon */}
                                            <div className="mt-0.5">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            {/* Message */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-800 leading-relaxed">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {notification.time}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-gray-500">
                                    <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                    <p>No notifications yet</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 4 && (
                            <div className="p-3 bg-gray-50 border-t border-gray-200">
                                {!showAll ? (
                                    <Button
                                        variant="outlined"
                                        onClick={() => setShowAll(true)}
                                        sx={{
                                            width: '100%',
                                            textTransform: 'none',
                                            color: '#374151',
                                            borderColor: '#d1d5db',
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                backgroundColor: '#f9fafb',
                                                borderColor: '#9ca3af'
                                            }
                                        }}
                                    >
                                        View All Notifications
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        onClick={() => setShowAll(false)}
                                        sx={{
                                            width: '100%',
                                            textTransform: 'none',
                                            color: '#374151',
                                            borderColor: '#d1d5db',
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                backgroundColor: '#f9fafb',
                                                borderColor: '#9ca3af'
                                            }
                                        }}
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
