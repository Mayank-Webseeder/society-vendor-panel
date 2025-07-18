import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useUser } from '../UserContext';

const HeadingCard = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-1 flex-shrink-0 px-4 mt-1 mb-7">
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <div className="relative border-none bg-white rounded-full p-2">
            <PermIdentityIcon fontSize='large' className="text-gray-600" />
            <div className="absolute -top-1 -right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="text-2xl font-medium" style={{fontFamily:'Paris'}}>
              Hi {user?.name ? user.name.split(' ')[0] : 'User'}!
            </h2>
            <p className="text-[#818181] text-sm">Online • Last active now</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="relative">
                <div className="w-8 h-8 bg-white rounded-full cursor-pointer hover:bg-blue-400 transition-colors flex items-center justify-center">
                  <span className="text-white text-sm font-medium">🔔</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </div> */}
          <div className="text-right mr-14">
            <div className="text-sm font-medium text-gray-900">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-xs text-gray-500">
              {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        {/* <p className="text-[#818181] text-lg">Welcome to your Dashboard!</p> */}
        {/* <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Ready for new jobs</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>📊</span>
            <span>Performance: Excellent</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>⭐</span>
            <span>4.8 Rating</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HeadingCard;