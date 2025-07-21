import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { User as UserIcon, Lock as LockIcon, FileText } from 'lucide-react';
import { FaToolbox } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { motion } from 'framer-motion';


const sidebarOptions = [
  { label: 'My Profile', icon: <UserIcon size={20} />, route: '/my-profile' },
  { label: 'Security', icon: <LockIcon size={20} />, route: '/my-profile/security-options' },
  { label: 'Work Details', icon: <FaToolbox size={20} />, route: '/my-profile/work-details' },
  { label: 'Documents', icon: <FileText size={20} />, route: '/my-profile/documents-verification' },
  { label: 'Support', icon: <BiSupport size={20} />, route: '/my-profile/account-support' },
  // Add more options as needed
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

  const navigate = useNavigate();
  const location = useLocation();


  return (
    <motion.div
     className="relative flex flex-col gap-10 px-6 mt-4 w-full min-h-screen"
     variants={containerVariants}
     initial='hidden'
     animate='visible' 
    >
      {/* Header */}
      <motion.div
       className="flex gap-5 items-center border-solid border border-gray-400 bg-white rounded-2xl px-6 py-4 mb-2"
       variants={itemVariants}
      >
        <div className="flex justify-center items-center p-4 rounded-xl bg-blue-400 shadow-md">
          <UserIcon size={32} color="white" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 style={{fontFamily: 'Manrope'}} className="text-2xl font-normal text-black/75">User Profile</h2>
          <p style={{ fontFamily: 'Lato' }} className="text-sm text-gray-700/60 mt-1">
            View all user profile details
          </p>
        </div>
      </motion.div>

      {/* Main Content: Two Columns */}
      <motion.div 
        className="flex flex-row gap-6 w-full min-h-screen mb-10"
        variants={itemVariants}
      >
        {/* Left Sidebar --> Fixed */}
        <motion.div 
          className="w-[15%] bg-white border-solid border rounded-2xl border-gray-400 flex flex-col"
          variants={itemVariants}
        >
          <div className="px-3 py-6 mt-1">
            {sidebarOptions.map(opt => (
              <motion.div
                key={opt.label}
                className={`flex items-center mb-6 py-3 px-4 rounded-lg cursor-pointer transition-colors
                  ${
                    (opt.label === 'Support' && location.pathname.startsWith('/my-profile/account-support')) ||
                    location.pathname === opt.route
                      ? 'bg-blue-50 text-blue-700 border-solid border font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
                onClick={() => navigate(opt.route)}
                variants={itemVariants}
                whileHover={{ y: -2, scale: 1.03 }}
              >
                {opt.icon}
                <span className="ml-3">{opt.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* Right Dynamic Content */}
        <motion.div 
          className="w-[85%] bg-white rounded-2xl border-solid border border-gray-400"
          variants={itemVariants}
        >
          <div className="p-0 bg-white rounded-2xl h-full">
            {/* Nested route content */}
            <Outlet />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


export default UserProfile;