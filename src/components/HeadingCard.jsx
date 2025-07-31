import { useState, useEffect } from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useUser } from '../UserContext';
import { Switch } from '@mui/material';

// // Mock icon component (replace with your actual Material-UI import)
// const PermIdentityIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//     <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//   </svg>
// );

// Mock user context (replace with your actual context)
// const useUser = () => ({
//   user: { name: 'John Doe', membershipActive: true }
// });

const HeadingCard = () => {
  const { user, setUser } = useUser();

  const membershipActive = user?.membershipActive;
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const handleToggleMembership = () => {
    setUser({
      ...user,
      membershipActive: !user.membershipActive,
    });
  };

  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-3xl shadow-lg border border-slate-200/60 backdrop-blur-sm hover:shadow-xl hover:border-slate-300/60 transition-all duration-500 ease-out group overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

        {/* Content container */}
        <div className="relative px-6 py-4 sm:px-7 sm:py-5">
          <div className="flex justify-between items-start">
            {/* Main content area */}
            <div className="flex items-center gap-5 sm:gap-6 flex-1">
              {/* Enhanced avatar section */}
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 rounded-2xl p-4 sm:p-4 shadow-md ring-1 ring-slate-200/50 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 ease-out">
                  <PermIdentityIcon
                    sx={{ fontSize: 34 }}
                    className="text-indigo-600 w-7 h-7 sm:w-10 sm:h-10"
                  />
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>

              {/* Greeting text */}
              <div className="flex-1">
                <div className="space-y-1">
                  <h1 className="text-xl sm:text-3xl font-semibold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent leading-tight">
                    {greeting}
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-600 font-medium">
                    {user?.name ? user.name.split(' ')[0] : 'User'} !
                  </p>
                </div>
                {/* Subtle underline accent */}
                <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60"></div>
              </div>
            </div>

            {/* Membership badge */}
            {membershipActive && (
              <div className="flex-shrink-0 ml-4">
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-2.5 text-sm font-semibold text-amber-800 ring-2 ring-amber-200/60 shadow-md hover:shadow-lg transition-all duration-300 group/badge">
                    {/* Premium icon */}
                    <svg
                      className="w-4 h-4 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="inline">Subscription Active</span>
                    {/* <span className="sm:hidden">Subscription </span> */}
                  </span>
                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/badge:opacity-100 group-hover/badge:animate-pulse transition-opacity duration-500"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Test Mode Badge */}
        {user?.testMode && (
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
            <div className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 ring-2 ring-red-200/60 shadow-md hover:shadow-lg transition-all duration-300">
              <svg
                className="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Test Mode Active
            </div>
            
            {/* Toggle Switch for Membership */}
            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 ring-2 ring-blue-200/60 shadow-md hover:shadow-lg transition-all duration-300">
              <span>Membership</span>
              <Switch
                checked={membershipActive}
                onChange={handleToggleMembership}
                color="primary"
                size="small"
              />
            </div>
          </div>
        )}

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};


export default HeadingCard;