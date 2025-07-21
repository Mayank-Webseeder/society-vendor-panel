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
import GoldMembershipCard from '../components/GoldMembershipCard';


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
    <div id='parent-div' className="tracking-wide w-full pb-8 flex justify-between">
      
      <div id='child-1' className='flex flex-col w-[77%] pt-2'>
        {/* Heading */}
        <HeadingCard />

        {/* Cards */}
        <motion.div 
          className="flex items-center w-full gap-5 flex-shrink-0 px-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card1 />
          <Card2 />
          <Card3 />
          <Card4 />
        </motion.div>


        {/* Main Content Grid (Left side) */}
        <div className="flex-1 pl-4 pr-16 w-full space-y-6">          
          <UpcomingJobs />

          <NewJobs />

          <QuickActions />

          <GoldMembershipCard />
        </div>
      </div>

      {/* Right Side */}
      <div className='flex flex-col w-[23%] space-y-5'>
        <AvailabilityCalendar />
        
        <Notifications />

        <PerformanceSummary />
      </div>
      
    </div>
  );
};

export default Dashboard;