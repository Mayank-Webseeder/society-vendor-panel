import Card2_Ellipse12 from "../../assets/Card2_Ellipse12.png";
import Card2_Vector24 from "../../assets/Card2_Vector24.png";
import Card2_Vector25 from "../../assets/Card2_Vector25.png";
import { FaChevronRight } from "react-icons/fa";
import dummyData from "../../static/dummyData_Leads";
import { useUser } from '../../UserContext';


const Card2 = () => {

  const { user } = useUser();
  const jobsCompleted = dummyData.filter(lead => lead.status === "Completed").length;

  return (
    <div className="relative bg-[#668AEC] w-60 rounded-xl h-40 overflow-hidden hover:scale-105 transition-transform duration-300">
      <p className="relative font-medium text-xl pl-2 text-white/90 z-30 pt-4">Jobs Completed</p>
      <p className="relative font-semibold text-white text-4xl z-30 pt-12 pl-5">{jobsCompleted}</p>
      <img src={Card2_Ellipse12} className="absolute z-20 right-0 bottom-5" alt="card2-ellipse-12" />
      <img src={Card2_Vector24} className="absolute z-10 right-0 bottom-0" alt="card2-vector-24" />
      <img src={Card2_Vector25} className="absolute z-10 right-0 bottom-0" alt="card2-vector-25" />
      <FaChevronRight strokeWidth={3} size={25} color="rgba(255,255,255,0.84)" className="absolute right-3 bottom-3 z-20" />
    </div>
  )
}


export default Card2;