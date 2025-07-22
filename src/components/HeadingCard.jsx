import { useState, useEffect } from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useUser } from '../UserContext';

const HeadingCard = () => {
  const { user } = useUser();

  // State for current time
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update every minute
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 flex-shrink-0 rounded-2xl">
      <div className="bg-white rounded-2xl shadow-sm border-solid border border-gray-400 px-3 py-2 sm:px-5 sm:py-0 hover:shadow-md transition-shadow duration-200">
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2 sm:gap-4'>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-sm">
                <PermIdentityIcon className="text-indigo-600 text-xl sm:text-3xl" />
              </div>
              {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div> */}
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-normal text-gray-900 mb-0.5 sm:mb-1" style={{fontFamily:'Manrope'}}>
                Hi {user?.name ? user.name.split(' ')[0] : 'User'}!
              </h2>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                {/* <p style={{fontFamily:'Manrope'}} className="text-gray-600 text-sm font-medium">Online • Active now</p> */}
                <p style={{fontFamily:'Manrope'}} className="text-gray-600 text-xs sm:text-sm font-medium">Online</p>
              </div>
            </div>
          </div>
          {/* OPTIMIZE BELOW DIV */}
          <div className="block text-right rounded-lg px-2 sm:px-4 space-y-1 sm:space-y-1.5 py-1 sm:py-2.5">
            <div style={{fontFamily:'Manrope'}} className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1">
              <span className="block sm:hidden">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
                <br />
                {new Date().toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="hidden sm:block">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
                <br />
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </span>
            </div>
            <div style={{fontFamily:'Manrope'}} className="hidden sm:block text-xs text-gray-500 font-medium">
              {now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HeadingCard;