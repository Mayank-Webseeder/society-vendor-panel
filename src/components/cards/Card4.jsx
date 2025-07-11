import Card4_Vector28 from "../../assets/Card4_Vector28.png";
import Card4_Vector29 from "../../assets/Card4_Vector29.png";
import { FaChevronRight } from "react-icons/fa";
import { useUser } from "../../UserContext";


const Card4 = () => {

  const { user } = useUser();


  return (
    <div className="relative bg-[#A966EC] w-60 rounded-xl h-40 overflow-hidden hover:scale-105 cursor-pointer transition-transform duration-300">
      <p className="relative font-medium text-xl pl-2 text-white/90 z-30 pt-4">Applied Jobs</p>
      <p className="relative font-semibold text-white text-4xl z-30 pt-12 pl-5">{user.appliedJobs}</p>
      <img src={Card4_Vector28}  className="absolute z-10 right-0 bottom-0" alt="card4-vector-28" />
      <img src={Card4_Vector29} className="absolute z-10 right-0 bottom-0" alt="card4-vector-29" />
      <FaChevronRight strokeWidth={3} size={25} color="rgba(255,255,255,0.84)" className="absolute right-3 bottom-3 z-20" />
    </div>
  )
}


export default Card4;