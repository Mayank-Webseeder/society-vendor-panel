import Card1 from '../components/cards/Card1';
import Card2 from '../components/cards/Card2';
import Card3 from '../components/cards/Card3';
import Card4 from '../components/cards/Card4';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { motion } from 'framer-motion';
import Notifications from '../components/Notifications';
import UpcomingJobs from '../components/UpcomingJobs';
import QuickActions from '../components/QuickActions';
import PerformanceSummary from '../components/PerformanceSummary';
import HeadingCard from '../components/HeadingCard';
import NewJobs from '../components/NewJobs';


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


  return (
    <div id='parent-div' className="tracking-wide w-full pt-3 pb-5 gap-3 flex">
      
      {/* Left Side */}
      <div id='child-1' className='flex flex-col gap-6 px-4 w-full lg:w-[70%] xl:w-[77%]'>
        {/* Heading */}
        <HeadingCard />

        {/* Cards */}
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
        <UpcomingJobs />

        <NewJobs />

        <QuickActions />

        {/* <GoldMembershipCard /> */}
      </div>



      {/* Right Side */}
      <div className='hidden lg:flex lg:w-[30%] flex-col xl:w-[23%] px-2 gap-6'>
        <AvailabilityCalendar />
        
        <Notifications />

        <PerformanceSummary />
      </div>
      
    </div>
  );
};

export default Dashboard;