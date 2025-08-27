import SubscriptionCard from '../components/SubscriptionCard';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useUser } from '../UserContext';
import { BadgeCheck, CalendarRange, CreditCard, AlertTriangle } from 'lucide-react';


const SubscriptionPage = () => {

  const { user } = useUser();

    return (
        <div className='relative w-full h-full px-4 sm:px-8 pt-4 sm:pt-6 pb-12'>
            {/* Heading */}
            <div className="flex flex-col gap-1 mb-10">
                <h2 style={{ fontFamily: 'Manrope' }} className="text-2xl sm:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">Subscription Details</h2>
                <p style={{ fontFamily: 'Lato' }} className="text-xs sm:text-sm text-slate-500">Overview of your current subscription & status</p>
            </div>

            {user.subscription_active ? (
                <div className='flex flex-col gap-10 max-w-5xl'>
                    {/* Overview Card */}
                    <div className="relative bg-white/75 backdrop-blur-lg rounded-2xl border border-slate-200 px-5 sm:px-8 pt-6 pb-7 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)] overflow-hidden">
                        <div className="absolute -top-16 -right-10 w-72 h-72 bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
                        <div className="absolute top-0 left-0 h-1.5 w-44 bg-gradient-to-r from-indigo-600 via-blue-600 to-transparent rounded-br-full" />
                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-inner ring-1 ring-white/30">
                                <BadgeCheck size={24} />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='text-lg sm:text-xl font-semibold tracking-tight text-slate-800'>Active Subscription</h3>
                                <p className='text-xs sm:text-sm text-slate-500 mt-1'>You have full access to premium features</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='flex items-start gap-3'>
                                <div className='w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-inner text-xs font-semibold'>{user.initials}</div>
                                <div className='flex flex-col'>
                                    <span className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>Member Name</span>
                                    <span className='text-sm font-medium text-slate-800'>{user.name}</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-inner'>
                                    <CreditCard size={16} />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>Reference Number</span>
                                    <span className='text-sm font-semibold tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent'>{user.subscription_referenceId}</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-inner'>
                                    <CalendarRange size={16} />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>Start Date</span>
                                    <span className='text-sm font-medium text-slate-800'>{user.subscription_validFrom}</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-inner'>
                                    <CalendarRange size={16} />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>End Date</span>
                                    <span className='text-sm font-medium text-slate-800'>{user.subscription_validTill}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-3 mt-7'>
                            <span className='px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border-solid border border-emerald-200 text-[11px] font-semibold tracking-wide'>Active</span>
                            <span className='px-3 py-1.5 rounded-full bg-red-50 text-red-400 border-solid border border-red-200 text-[11px] font-medium'>Auto-Renew Unavailable</span>
                        </div>
                    </div>

                    {/* Subscription Card Component */}
                    <div className='w-full flex'>
                        <SubscriptionCard />
                    </div>
                </div>
            ) : (
                <div className='flex justify-center'>
                    <motion.div
                        className='relative w-full max-w-2xl bg-white/75 backdrop-blur-lg rounded-2xl border border-slate-200 px-6 sm:px-10 pt-10 pb-12 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)] overflow-hidden text-center'
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <div className='absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 rounded-full blur-3xl opacity-70 pointer-events-none' />
                        <div className='absolute top-0 left-0 h-1.5 w-40 bg-gradient-to-r from-rose-500 via-amber-400 to-transparent rounded-br-full' />
                        <div className='mx-auto mb-8 w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-inner ring-1 ring-white/40'>
                            <AlertTriangle size={40} />
                        </div>
                        <h3 className='text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800 mb-4'>No Active Subscription</h3>
                        <p className='text-sm sm:text-base text-slate-500 max-w-md mx-auto mb-8'>You currently don't have an active subscription. Upgrade now to unlock premium tools and grow faster.</p>
                        <Button
                            href='/payment'
                            sx={{
                                px: 5,
                                py: 1.4,
                                background: 'linear-gradient(90deg,#4F46E5,#2563EB)',
                                color: 'white',
                                fontWeight: 600,
                                letterSpacing: 0.4,
                                textTransform: 'none',
                                fontSize: '0.85rem',
                                borderRadius: '14px',
                                boxShadow: '0 8px 22px -8px rgba(79,70,229,0.5),0 2px 6px rgba(0,0,0,0.06)',
                                '&:hover': { filter: 'brightness(1.07)', boxShadow: '0 12px 30px -10px rgba(79,70,229,0.55),0 3px 8px rgba(0,0,0,0.10)' }
                            }}
                        >
                            Subscribe Now
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionPage;