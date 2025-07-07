import NewLeadsWindow from '../components/NewLeadsWindow';
import AvailabilityCard from '../components/AvailabilityCard';
import QuickTipsCard from '../components/QuickTipsCard';
import Card1 from '../components/cards/Card1';
import Card2 from '../components/cards/Card2';
import Card3 from '../components/cards/Card3';
import Card4 from '../components/cards/Card4';
import { useUser } from '../UserContext';


const Dashboard = () => {

  const { user } = useUser();


  return (
    <div className="tracking-wide w-full h-full flex flex-col">
      
      {/* Heading */}
      <div className="flex flex-col gap-1 flex-shrink-0 px-4 mb-7">
        <h2 className="text-2xl font-medium">Hi {user?.name ? user.name.split(' ')[0] : ''}!</h2>    {/* Display only the first name */}
        <p className="text-[#818181] text-lg">Welcome to your Dashboard!</p>
      </div>

      {/* Cards */}
      <div className="flex items-center w-[80%] gap-5 flex-shrink-0 px-4 mb-14">
        <Card1 />
        <Card2 />
        <Card3 />
        <Card4 />
      </div>

      {/* Main Grid Area */}
      <div className="flex-grow min-h-0 flex flex-col px-4 pb-2">
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
      </div>
    </div>
  );
};


export default Dashboard;