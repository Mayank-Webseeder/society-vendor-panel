import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Card1 from '../components/cards/Card1';
import Card2 from '../components/cards/Card2';
import Card3 from '../components/cards/Card3';
import Card4 from '../components/cards/Card4';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { motion } from 'framer-motion';
import { useUser } from '../UserContext';


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
    <div id='parent-div' className="tracking-wide w-full h-full flex justify-between">
      
      <div id='child-1' className='flex flex-col w-[77%]'>
        {/* Heading */}
        <div className="flex flex-col gap-1 flex-shrink-0 px-4 mb-7">
          <div className='flex justify-start items-center gap-3'>
            <PermIdentityIcon fontSize='large' />
            <h2 className="text-2xl font-medium" style={{fontFamily:'Paris'}}>Hi {user?.name ? user.name.split(' ')[0] : ''}!</h2>    {/* Display only the first name */}
          </div>
          
          <p className="text-[#818181] text-lg">Welcome to your Dashboard!</p>
        </div>

        {/* Cards */}
        <motion.div 
          className="flex items-center w-full gap-5 flex-shrink-0 px-4 mb-14"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card1 />
          <Card2 />
          <Card3 />
          <Card4 />
        </motion.div>
      </div>


      <div className='flex justify-end w-[23%]'>
        <AvailabilityCalendar />
      </div>
      

      {/* Main Grid Area */}
      {/* <div className="flex-grow flex flex-col px-4 pb-2 mb-12">
        <div className="w-full flex">
          <div className="grid grid-rows-2 grid-cols-2 gap-4 w-full max-w-5xl h-full min-h-0 flex-grow">
            <div className="row-span-2 min-h-0 flex flex-col">
              <NewLeadsWindow />
            </div>
            <div className="min-h-0 flex flex-col">
              <AvailabilityCard />
            </div>
            <div className="min-h-0 flex flex-col">
              <QuickTipsCard />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};


export default Dashboard;