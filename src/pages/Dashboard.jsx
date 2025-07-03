import dashboard_Resp_Frame from '../assets/dashboard_Resp_Frame.png';
import dashboard_Jobs_Frame from '../assets/dashboard_Jobs_Frame.png';
import dashboard_Rating_Frame from '../assets/dashboard_Rating_Frame.png';
import dashboard_ApplJobs_Frame from '../assets/dashboard_ApplJobs_Frame.png';
import chevron_right_arrow from '../assets/chevron_right_arrow.png';
import NewLeadsWindow from '../components/NewLeadsWindow';
import AvailabilityCard from '../components/AvailabilityCard';
import QuickTipsCard from '../components/QuickTipsCard';
import dummyData from '../static/dummyData_User';


const Dashboard = () => {
  return (
    <div className="tracking-wide w-full h-full flex flex-col">
      {/* Heading */}
      <div className="flex flex-col gap-1 flex-shrink-0 px-4 pb-1">
        <h2 className="text-2xl font-medium">Hi {dummyData.name}!</h2>
        <p className="text-[#818181] text-lg">Welcome to your Dashboard!</p>
      </div>

      {/* Cards */}
      <div className="flex gap-0 my-2 flex-shrink-0 px-4">
        <div className="relative -ml-4 cursor-pointer">
          <img src={dashboard_Resp_Frame} className="h-44 w-60 cursor-pointer" alt="dashboard-Resp-Frame-img" />
          <img src={chevron_right_arrow} className="absolute bottom-10 right-8 cursor-pointer" alt="chevron-right-arrow-img" />
        </div>
        <img src={dashboard_Jobs_Frame} className="h-44 w-60 cursor-pointer" alt="dashboard-Jobs-Frame-img" />
        <img src={dashboard_Rating_Frame} className="h-44 w-60 cursor-pointer" alt="dashboard-Rating-Frame-img" />
        <img src={dashboard_ApplJobs_Frame} className="h-44 w-60 cursor-pointer" alt="dashboard-ApplJobs-Frame-img" />
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