import { Link } from 'react-router-dom';
import Card1 from '../components/cards/Card1';
import Card2 from '../components/cards/Card2';
import Card3 from '../components/cards/Card3';
import Card4 from '../components/cards/Card4';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Notifications from '../components/Notifications';
import AppliedJobs from '../components/AppliedJobs';
import QuickActions from '../components/QuickActions';
import PerformanceSummary from '../components/PerformanceSummary';
import HeadingCard from '../components/HeadingCard';
import NewJobs from '../components/NewJobs';
import { useUser } from '../UserContext';
import OngoingJobs from '../components/OngoingJobs';
import StatusCards from '../components/StatusCards';


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


const Dashboard = () => {

  const { user } = useUser();


  return (
    <div id='parent-div' className="w-full">
      {
        !user.membershipActive  &&  (
          // Subscription Strip
          <div className="relative w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-200 text-blue-700 text-sm sm:text-base font-medium px-4 py-2 flex justify-center items-center gap-2 shadow-md overflow-hidden group">

            {/* This is the shine overlay. It should be behind interactive elements. */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine z-0"></div>

            {/* Content and button should have a higher z-index to be clickable and visible */}
            <div className="relative flex justify-center items-center gap-2 z-10">
              <SparklesIcon className="h-5 w-5 text-blue-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-center">Subscribe to unlock all premium features!</span>
              <Link
                to="/payment"
                className="no-underline ml-2 px-4 py-1.5 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out text-sm flex-shrink-0
                hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                aria-label="Subscribe Now to unlock features"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        )
      }
      


      <div className='w-full h-full flex pt-3 pb-5 gap-3'>
        {/* Left Side */}
        <div id='child-1' className='flex flex-col gap-6 px-4 w-full lg:w-[70%] xl:w-[77%]'>
          {/* Heading */}
          <HeadingCard />

          {/* Cards */}
          {/* <StatusCards /> */}
          <motion.div 
            className="hidden sm:flex justify-start xl:justify-between items-center rounded-2xl gap-4 w-full flex-shrink-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card1 />
            <Card2 />
            <Card3 />
            <Card4 />
          </motion.div>

          {/* Utility Cards */}
          <OngoingJobs />

          <AppliedJobs />

          <NewJobs />

          <QuickActions />
        </div>

        {/* Right Side */}
        <div className='hidden lg:flex lg:w-[30%] flex-col xl:w-[23%] px-2 gap-6'>
          <AvailabilityCalendar />
          
          <Notifications />

          <PerformanceSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;