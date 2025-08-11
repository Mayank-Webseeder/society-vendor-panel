import { useNavigate } from "react-router-dom";
import Card3_Vector26 from "../../assets/Card3_Vector26.png";
import Card3_Vector27 from "../../assets/Card3_Vector27.png";
import { FaChevronRight } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { finalRating } from '../../static/dummyData_MyStats';
import { useUser } from "../../UserContext";


const Card3 = () => {

  const navigate = useNavigate();
  const { user } = useUser();
  const subscriptionActive = user.subscription_active;

  // Generate an array of stars based on user.rating
  const renderStars = () => {
    const count = Math.floor(Number(finalRating)) || 0;
    return (
      <div className="flex gap-1">
        {Array.from({ length: count }).map((_, idx) => (
          <IoIosStar key={idx} size={37} color="#A387F4" className="mt-2 z-20" />
        ))}
      </div>
    );
  };

  return (
    <div
      onClick={() => navigate('/my-stats')}
      className="relative hidden md:block bg-[#7366EC] w-60 rounded-2xl h-40 overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group"
    >
      <p className="relative font-medium text-xl pl-2 text-white/90 z-30 pt-4">
        Rating & Feedback
      </p>
      <div className="relative font-semibold text-white text-4xl z-30 pt-12 pl-3">
        {
          subscriptionActive ?
            <>
              {renderStars()}
            </>
            :
            <span className="pl-2">
              N/A
            </span>
        }
      </div>
      <img
        src={Card3_Vector26}
        className="absolute z-20 right-0 bottom-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"
        alt="card3-vector-26"
      />
      <img
        src={Card3_Vector27}
        className="absolute z-10 right-0 bottom-0 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"
        alt="card3-vector-27"
      />
      <FaChevronRight
        strokeWidth={3}
        size={25}
        color="rgba(255,255,255,0.84)"
        className="hidden lg:block absolute right-3 bottom-3 z-20 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110"
      />
    </div>
  );
};

export default Card3;