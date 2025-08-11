import SubscriptionCard from '../components/SubscriptionCard';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useUser } from '../UserContext';


const SubscriptionPage = () => {

  const { user } = useUser();

  return (
    <div className='w-full h-full p-5 sm:p-8'>
      {/* Heading */}
       <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderBottom: '1px solid #E0E0E0',
                gap: 2,
                pb: 2,
                mb: 5
            }}
        >
            <Typography variant="h2" sx={{ fontSize: '2rem', fontWeight: 'semibold', color: '#4A5568' }}>
                Subscription Details
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.875rem',
                    color: '#718096',
                }}
            >
              Here's a comprehensive overview of your current subscription.
            </Typography>
        </Box >

        {/* Conditional Content based on subscription-active status */}
        {user.subscription_active? (
            <>
                {/* Subscription Overview Card */}
                <div className="w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 border-solid border border-gray-300">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-7">
                    Subscription Overview
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-gray-700">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">Member Name:</span>
                        <span>{user.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">Reference Number:</span>
                        <span className="font-bold text-amber-600">{user.subscription_referenceId}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">Subscription Start Date:</span>
                        <span>{user.subscription_validFrom}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">Subscription End Date:</span>
                        <span>{user.subscription_validTill}</span>
                    </div>
                    </div>
                </div>

                {/* Subscription Card Component */}
                <div className="w-full flex">
                    <SubscriptionCard />
                </div>
            </>
        ) : (
            // "No Active Subscription" message card
            <div className='flex justify-center'>
                <motion.div
                className="w-full max-w-2xl bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-lg p-8 text-center border border-red-100 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                >
                {/* Icon for "No Subscription" - Changed to an exclamation mark */}
                <div className="mb-6 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center shadow-md">
                    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                    No Active Subscription Found !
                </h2>
                <p className="text-base text-gray-400 mb-8 max-w-md">
                    It looks like you don't have an active subscription for any service.
                    Subscribe today to unlock exclusive features and elevate your experience!
                </p>
                <a
                    href="/payment" // Link to your payment page
                    className="inline-flex no-underline items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    Subscribe Now
                    <svg className="ml-2 -mr-0.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </a>
                </motion.div>
            </div>
        )}
    </div>
  );
};

export default SubscriptionPage;