import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card2_Ellipse12 from "../../assets/Card2_Ellipse12.png";
import Card2_Vector24 from "../../assets/Card2_Vector24.png";
import Card2_Vector25 from "../../assets/Card2_Vector25.png";
import { FaChevronRight } from "react-icons/fa";
import dummyData from "../../static/dummyData_Leads";
import AccessLockedModal from "../modals/AccessLockedModal";
import { useUser } from '../../UserContext';


const Card2 = () => {

  const { user } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobsCompleted = dummyData.filter(lead => lead.status === "Completed").length;

  const handleCardClick = () => {
    if (user.membershipActive) {
      // Redirect to MyJobs.jsx with filter set to "Completed"
      navigate("/my-jobs", { state: { filter: "Completed" } });
    } else {
      // Open the AccessLockedModal
      setIsModalOpen(true);
    }
  };


  return (
    <>
      <div onClick={handleCardClick} className="relative hidden sm:block bg-[#668AEC] w-60 rounded-2xl h-40 overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
        <p className="relative font-medium text-xl pl-2 text-white/90 z-30 pt-4">Jobs Completed</p>
        <p className="relative font-semibold text-white text-4xl z-30 pt-12 pl-5">{jobsCompleted}</p>
        <img src={Card2_Ellipse12} className="absolute z-20 right-0 bottom-5" alt="card2-ellipse-12" />
        <img src={Card2_Vector24} className="absolute z-10 right-0 bottom-0" alt="card2-vector-24" />
        <img src={Card2_Vector25} className="absolute z-10 right-0 bottom-0" alt="card2-vector-25" />
        <FaChevronRight strokeWidth={3} size={25} color="rgba(255,255,255,0.84)" className="hidden lg:block absolute right-3 bottom-3 z-20" />
      </div>


      {/* Access Locked Modal */}
      <AccessLockedModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        heading="Jobs Access Locked"
        subheading="Subscribe to view completed and applied jobs."
      />
    </>
  )
}


export default Card2;