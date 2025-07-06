import Card1_Ellipse10 from "../../assets/Card1_Ellipse10.png";
import Card1_Ellipse11 from "../../assets/Card1_Ellipse11.png";
import Card1_Vector20 from "../../assets/Card1_Vector20.png";
import { FaChevronRight } from "react-icons/fa";
import { useOnBoarding } from "../../pages/onboarding/OnboardingContext";


const Card1 = () => {

  const { onboardingData } = useOnBoarding();    // Get context data


  return (
    <div className="relative bg-[#5CA7D3] w-56 rounded-xl h-36 overflow-hidden hover:scale-105 cursor-pointer transition-transform duration-300">
        <p className="relative font-medium text-lg pl-2 text-white/90 z-30 pt-3">Avg. Response Time</p>
        <p className="relative font-semibold text-white text-3xl z-30 pt-7 pl-3">{onboardingData.avgResponseTime} min</p>
        <img src={Card1_Ellipse10} className="absolute z-10 right-0 bottom-0" alt="card1-ellipse-10" />
        <img src={Card1_Ellipse11} className="absolute z-10 right-0 bottom-0" alt="card1-ellipse-11" />
        <img src={Card1_Vector20} className="absolute z-10 right-0 bottom-0" alt="card1-vector-20" />
        <FaChevronRight strokeWidth={3} size={22} color="rgba(255,255,255,0.84)" className="absolute right-3 bottom-3 z-20" />
    </div>
  )
}


export default Card1;