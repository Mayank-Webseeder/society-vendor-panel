import Card3_Vector26 from "../../assets/Card3_Vector26.png";
import Card3_Vector27 from "../../assets/Card3_Vector27.png";
import { FaChevronRight } from "react-icons/fa";
import { useOnBoarding } from "../../pages/onboarding/OnboardingContext";


const Card3 = () => {

  const { onboardingData } = useOnBoarding();


  return (
    <div className="relative bg-[#7366EC] w-56 rounded-xl h-36 overflow-hidden hover:scale-105 cursor-pointer transition-transform duration-300">
      <p className="relative font-medium text-lg pl-2 text-white/90 z-30 pt-3">Rating & Feedback</p>
      <p className="relative font-semibold text-white text-3xl z-30 pt-7 pl-3">{onboardingData.rating}</p>
      <img src={Card3_Vector26} className="absolute z-10 right-0 bottom-0" alt="card3-vector-26" />
      <img src={Card3_Vector27} className="absolute z-10 right-0 bottom-0" alt="card3-vector-27" />
      <FaChevronRight strokeWidth={3} size={22} color="rgba(255,255,255,0.84)" className="absolute right-3 bottom-3 z-20" />
    </div>
  )
}


export default Card3;