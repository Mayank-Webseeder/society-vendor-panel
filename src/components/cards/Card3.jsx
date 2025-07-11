import Card3_Vector26 from "../../assets/Card3_Vector26.png";
import Card3_Vector27 from "../../assets/Card3_Vector27.png";
import { FaChevronRight } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
// import { useUser } from '../../UserContext';
import { finalRating } from '../../static/dummyData_MyStats';

const Card3 = () => {

  // const { user } = useUser();


  // Generate an array of stars based on user.rating
  const renderStars = () => {
    const count = Math.floor(Number(finalRating)) || 0;
    return (
      <div className="flex gap-1">
        {
          Array.from({ length: count }).map((_, idx) => (
            <IoIosStar key={idx} size={37} color="#A387F4" className="mt-2 z-20" />
          ))
        }
      </div>
    );
  };



  return (
    <div className="relative bg-[#7366EC] w-60 rounded-xl h-40 overflow-hidden hover:scale-105 cursor-pointer transition-transform duration-300">
      <p className="relative font-medium text-xl pl-2 text-white/90 z-30 pt-4">Rating & Feedback</p>
      <div className="relative font-semibold text-white text-4xl z-30 pt-10 pl-3">
        {renderStars()}
      </div>
      <img src={Card3_Vector26} className="absolute z-20 right-0 bottom-0" alt="card3-vector-26" />
      <img src={Card3_Vector27} className="absolute z-10 right-0 bottom-0" alt="card3-vector-27" />
      <FaChevronRight strokeWidth={3} size={25} color="rgba(255,255,255,0.84)" className="absolute right-3 bottom-3 z-20" />
    </div>
  )
}


export default Card3;