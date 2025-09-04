import Card1 from '../components/cards/Card1';
import Card2 from '../components/cards/Card2';
import Card3 from '../components/cards/Card3';
import Card4 from '../components/cards/Card4';
import Calendar from '../components/Calendar';
import { motion } from 'framer-motion';
import Notifications from '../components/Notifications';
import AppliedJobs from '../components/AppliedJobs';
import QuickActions from '../components/QuickActions';
import PerformanceSummary from '../components/PerformanceSummary';
import HeadingCard from '../components/HeadingCard';
import NewJobs from '../components/NewJobs';
import { useUser } from '../UserContext';
import OngoingJobs from '../components/OngoingJobs';
// import StatusCards from '../components/StatusCards';
import SubscribeStrip from '../components/SubscribeStrip';


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
  const subscriptionActive = user.subscription_active;

  return (
    <div id='parent-div' className="relative w-full min-h-full">
      {/* Ambient background layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.28),rgba(59,130,246,0)_70%)] blur-3xl" />
        <div className="absolute -bottom-40 -right-24 w-[480px] h-[480px] bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.3),rgba(99,102,241,0)_70%)] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.18),rgba(14,165,233,0)_70%)] blur-3xl opacity-70" />
      </div>
 
      {/* Subscription strip */}
      { !subscriptionActive && <SubscribeStrip /> }


      <div className="relative w-full h-full flex pt-4 pb-8 gap-4 lg:gap-6">
        {/* Left Side */}
        <div id='child-1' className='flex flex-col gap-6 px-4 w-full lg:w-[70%] xl:w-[77%]'>
          {/* Heading */}
          <HeadingCard />

          {/* Metric Cards Row */}
          <motion.div
            className="hidden sm:flex justify-start xl:justify-between items-stretch gap-4 w-full flex-shrink-0"
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
          <NewJobs />
          <AppliedJobs />
          <OngoingJobs />
          <QuickActions />
        </div>


        {/* Right Side */}
        <div className='hidden lg:flex lg:w-[30%] flex-col xl:w-[23%] px-2 gap-6'>
          <Calendar />
          <Notifications />
          <PerformanceSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;