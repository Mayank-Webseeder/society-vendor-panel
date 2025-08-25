import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { User as UserIcon, Lock as LockIcon, FileText, User } from 'lucide-react';
import { MdCardMembership } from "react-icons/md";
import { FaToolbox } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { motion } from 'framer-motion';
import LockIconMui from '@mui/icons-material/Lock';
import { useUser } from '../UserContext';


const sidebarOptions = [
  { label: 'My Profile', icon: <UserIcon size={20} />, route: '/my-profile' },
  { label: 'Security', icon: <LockIcon size={20} />, route: '/my-profile/security-options' },
  { label: 'Work Details', icon: <FaToolbox size={20} />, route: '/my-profile/work-details', isPremium: true },
  { label: 'Documents', icon: <FileText size={20} />, route: '/my-profile/documents-verification' },
  { label: "Subscription", icon: <MdCardMembership size={20} />, route: '/my-profile/subscription-details' },
  { label: 'Support', icon: <BiSupport size={20} />, route: '/my-profile/account-support' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};



const UserProfile = () => {

  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <motion.div
     className="relative flex flex-col gap-6 px-4 pt-4 pb-8 w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100"
     variants={containerVariants}
     initial='hidden'
     animate='visible' 
    >
      {/* Decorative Background Accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-72 h-72 bg-indigo-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] bg-gradient-to-tr from-blue-50 via-transparent to-indigo-50 rounded-full blur-3xl opacity-60" />
      </div>
      {/* Header Section */}
      <motion.div
       className="relative border-solid flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/80 backdrop-blur-xl rounded-2xl px-5 sm:px-7 py-5 border border-slate-200 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)] mb-1 overflow-hidden"
       variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/60 via-transparent to-indigo-50/60" />
        <div className="absolute top-0 left-0 h-1 w-40 bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent rounded-br-full" />
        <div className="relative w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-4">
          <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-inner shadow-blue-800/10 ring-1 ring-white/30">
            <UserIcon size={26} className="text-white" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 style={{fontFamily: 'Manrope'}} className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 tracking-tight">User Profile</h1>
            <p style={{ fontFamily: 'Lato' }} className="text-xs sm:text-sm text-slate-500 mt-0.5">View all user profile details</p>
          </div>
        </div>
        {/* <div className="flex items-center gap-4 self-stretch sm:self-auto"> */}
          {/* Reserved space for future actions / status */}
        {/* </div> */}
        </div>

        {/* <div className="mt-3 sm:mt-0 flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-gray-500">Last updated</div>
            <div className="text-sm text-gray-700 font-medium">{new Date().toLocaleString()}</div>
          </div>

          <button
            <motion.div 
              className="md:hidden w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-white/60 border border-blue-200/60 rounded-2xl p-2.5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] backdrop-blur-sm"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8FAFC] border border-gray-200 text-sm text-[#0f172a] hover:shadow-sm"
          >
              <div className="flex justify-between items-stretch gap-1.5 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          </button>
        </div> */}
      </motion.div>
      {/* Mobile Navigation (Horizontal) */}
      <motion.div
        className="md:hidden w-full bg-white/80 backdrop-blur-xl rounded-2xl px-3 pt-3 pb-2 border border-slate-200 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.05)]"
        variants={itemVariants}
      >
        <div className="flex items-stretch gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200/40 scrollbar-track-transparent no-scrollbar pb-1">
          {sidebarOptions.map(opt => {
            const active = (opt.label === 'Support' && location.pathname.startsWith('/my-profile/account-support')) || location.pathname === opt.route;
            return (
              <button
                key={opt.label}
                onClick={() => navigate(opt.route)}
                className={`relative flex flex-col items-center min-w-[60px] gap-1 py-2 px-2 rounded-xl transition-all duration-300 border text-[11px] font-medium tracking-tight
                  ${active
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-600/30 border-solid border border-blue-500/50'
                    : 'bg-white/70 text-slate-600 hover:text-blue-700 border-solid hover:border-blue-200 border-transparent'}
                `}
              >
                <span className={`flex items-center justify-center w-9 h-9 rounded-lg ring-1 ring-inset text-sm
                  ${active ? 'bg-white/15 ring-white/30 text-white' : 'bg-blue-50 ring-blue-100 text-blue-600'}
                `}>
                  {opt.icon}
                </span>
                <span className="text-[10px] leading-tight whitespace-nowrap">
                  {opt.label === 'Work Details' ? 'Work' : opt.label === 'Documents' ? 'Docs' : opt.label === 'My Profile' ? 'Profile' : opt.label}
                  {opt.isPremium && !user.subscription_active && (
                    <LockIconMui sx={{ fontSize: 12, color: '#F59E0B', ml: 0.3, position: 'relative', top: '1px' }} />
                  )}
                </span>
                {/* {active && (
                  <span className="absolute z-20 -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full border border-white" />
                )} */}
              </button>
            );
          })}
        </div>
      </motion.div>


      {/* Main Content: Two Columns */}
      <motion.div 
        className="flex flex-row gap-6 w-full sm:min-h-screen"
        variants={itemVariants}
      >
        {/* Left Sidebar --> Fixed - Hidden on mobile */}
        <motion.div 
          className="hidden md:flex md:w-[20%] lg:w-[16%] xl:w-[15%] bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl flex-col shadow-[0_4px_14px_-4px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)]"
          variants={itemVariants}
        >
          <div className="flex flex-col gap-1.5 px-3 py-6">
            {sidebarOptions.map(opt => (
              <motion.div
                key={opt.label}
                className={`group relative flex md:flex-col md:justify-center xl:flex-row xl:justify-start items-center gap-2 py-3 px-4 rounded-xl cursor-pointer transition-all duration-300 border border-transparent
                ${
                  (opt.label === 'Support' && location.pathname.startsWith('/my-profile/account-support')) ||
                  location.pathname === opt.route
                    ? 'bg-gradient-to-r from-blue-600/90 via-indigo-500/90 to-blue-600/90 text-white font-medium shadow-md shadow-blue-600/20 border-blue-600/40'
                    : 'text-slate-600 hover:bg-white/70 hover:border-slate-200'
                }
              `}
                onClick={() => navigate(opt.route)}
                variants={itemVariants}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <span className='hidden md:block text-base group-hover:scale-[1.08] transition-transform duration-300'>
                  {opt.icon}
                </span>
                <span className="flex flex-col items-center text-center xl:flex-row xl:ml-1.5 gap-1 tracking-tight leading-tight text-sm xl:text-[0.95rem]">
                  <span style={{ fontFamily: 'Manrope' }} className="flex items-center gap-1">
                    {opt.label}
                    {opt.isPremium  &&  !user.subscription_active  &&  <LockIconMui sx={{ fontSize: 16, color: '#F59E0B' }} />}
                  </span>
                </span>
                {/* Active accent bar */}
                {((opt.label === 'Support' && location.pathname.startsWith('/my-profile/account-support')) || location.pathname === opt.route) && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow shadow-amber-400/40" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* Right Dynamic Content */}
        <motion.div 
          className="w-full md:w-[80%] lg:w-[84%] bg-white/85 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)]"
          variants={itemVariants}
        >
          <div className="p-0 rounded-2xl">
            {/* Nested route content */}
            <Outlet />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


export default UserProfile;