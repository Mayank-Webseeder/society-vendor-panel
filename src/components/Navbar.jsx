import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import Logo from '../assets/Logo.png';
import { useUser } from "../UserContext";


const Navbar = () => {

  const { user } = useUser();
  const navigate = useNavigate();

  const logoClickHandler = () => {
    navigate('/dashboard');
  } 

  const handleUserClick = () => {
    navigate('/my-profile');
  }

// console.log('count--> ',user.notificationsCount);
  
  return (
    <div className='flex items-center justify-between h-full px-12'>
      {/* Left Half */}
      <div onClick={logoClickHandler} className="flex justify-center ml-8 items-center cursor-pointer">
        <img src={Logo} className='h-12' alt="Velra-logo" />
      </div>

      {/* Right Half */}
      <div className="flex items-center gap-8 justify-center">
        <div className="relative flex items-center justify-center cursor-pointer">
          <FaBell size={26} color="#ABABAD" />
          {
            user.notifications  &&  (user.notificationsCount > 0)  &&  <div className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-600 rounded-full"></div>
          }
        </div>
        
        <div onClick={handleUserClick} className="bg-[#DBDBDB] flex justify-center items-center rounded-full p-3 cursor-pointer">
          <FaUser color="#F6F6F6" />
        </div>
      </div>

    </div>
  )
}


export default Navbar;