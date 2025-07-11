import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import { Outlet } from 'react-router-dom';



const UserProfile = () => {

  const navigate = useNavigate();


  return (
    <div className='relative w-full flex justify-between bg-[#F5F8FA] min-h-screen'>
        {/* Main Content */}
        <div className='w-[90%] z-20'>

            {/* Page title */}
            <div className="flex items-center ml-3 gap-1 pb-8">
              <IconButton onClick={() => navigate('/my-profile')}>
                <ChevronLeft size={25} strokeWidth={3} color="black" />
              </IconButton>
              <h2>Your Profile</h2>
            </div>

            {/* Nested route content --> 'Outlet' tag is allowing further nested routes from this parent route */}
            <Outlet />
        </div>

        {/* Blue Vertical Strip */}
        {/* <div className='absolute top-0 bottom-0 right-0 bg-[#387091] w-80'></div> */}
    </div>
  )
}


export default UserProfile;