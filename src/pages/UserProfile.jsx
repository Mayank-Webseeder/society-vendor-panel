import { IoIosArrowBack } from "react-icons/io";
import { Outlet } from 'react-router-dom';



const UserProfile = () => {


  return (
    <div className='relative -my-6 -mx-8 flex justify-between bg-[#F5F8FA] min-h-screen'>
        {/* Main Content */}
        <div className='w-[90%] z-20'>

            {/* Page title */}
            <div className="flex items-center pl-4 pt-6 gap-3 pb-8">
                <IoIosArrowBack size={24} color="#1C1B1F" />
                <h2>Your Profile</h2>
            </div>

            {/* Nested route content --> 'Outlet' tag is allowing further nested routes from this parent route */}
            <Outlet />
        </div>

        {/* Blue Vertical Strip */}
        <div className='absolute top-0 bottom-0 right-0 bg-[#387091] w-80'></div>
    </div>
  )
}


export default UserProfile;