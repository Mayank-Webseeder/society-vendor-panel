import Card2_Ellipse12 from "../../assets/Card2_Ellipse12.png";
import Card2_Vector24 from "../../assets/Card2_Vector24.png";
import Card2_Vector25 from "../../assets/Card2_Vector25.png";
import { FaChevronRight } from "react-icons/fa";
import { useUser } from '../../UserContext';


const Card2 = () => {

  const { user } = useUser();


  return (
    <div className="relative bg-[#668AEC] w-56 rounded-xl h-36 overflow-hidden hover:scale-105 cursor-pointer transition-transform duration-300">
      <p className="relative font-medium text-lg pl-2 text-white/90 z-30 pt-3">Jobs Completed</p>
      <p className="relative font-semibold text-white text-3xl z-30 pt-7 pl-3">{user.jobsCompleted}</p>
      <img src={Card2_Ellipse12} className="absolute z-20 right-0 bottom-5" alt="card2-ellipse-12" />
      <img src={Card2_Vector24} className="absolute z-10 right-0 bottom-0" alt="card2-vector-24" />
      <img src={Card2_Vector25} className="absolute z-10 right-0 bottom-0" alt="card2-vector-25" />
      <FaChevronRight strokeWidth={3} size={22} color="rgba(255,255,255,0.84)" className="absolute right-3 bottom-3 z-20" />
    </div>
  )
}


export default Card2;