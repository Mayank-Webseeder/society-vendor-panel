import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import Logo from '../assets/Logo.png';
import velraSymbolLight from '../assets/velraSymbolLight.png';
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



  
  return (
  <div
    className="flex items-center justify-between h-full w-full px-12"
    style={{
      background: 'linear-gradient(90deg, #F5F8FA 0%, #2B3347 100%)', // subtle blue-gray gradient
      boxShadow: '0 2px 8px 0 rgba(26,33,49,0.06)',
    }}
  >
    {/* Left Half --> Logo */}
    <div
      onClick={logoClickHandler}
      className="flex justify-center items-center gap-1 cursor-pointer"
      tabIndex={0}
      role="button"
      aria-label="Go to dashboard"
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && logoClickHandler()}
    >
      <img src={velraSymbolLight} className='h-11' alt="Velra Home" />
      <p className="text-[#56A9D9] text-2xl font-extrabold">Velra</p>
    </div>

    {/* Right Half --> Notifications & User */}
    <div className="flex items-center gap-4 sm:gap-8 justify-center">
      <div
        className="relative flex items-center justify-center cursor-pointer"
        tabIndex={0}
        role="button"
        aria-label={`Notifications: ${user.notificationsCount || 0}`}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && {/* handle notification click */}}
      >
        <FaBell size={26} color="#ABABAD" />
        {user.notifications && user.notificationsCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {user.notificationsCount}
          </div>
        )}
      </div>
      <div
        onClick={handleUserClick}
        className="bg-[#DBDBDB] flex justify-center items-center rounded-full p-3 cursor-pointer"
        tabIndex={0}
        role="button"
        aria-label="Go to profile"
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleUserClick()}
      >
        <FaUser color="#F6F6F6" />
      </div>
    </div>
  </div>
);
}


export default Navbar;