import { useOnBoarding } from "../../pages/onboarding/OnboardingContext";


const Card1_Stats = () => {

  const { onboardingData } = useOnBoarding();    // Get context data

 
  return (
    <div className="bg-[#70A6B8] h-24 w-72 rounded-xl">
        <p className="text-white/90 font-semibold pl-3 pt-2 text-2xl">{onboardingData.avgResponseTime} min</p>
        <p className="text-white font-medium text-lg pt-3 pl-2">Avg. Response Time</p>
    </div>
  )
}


export default Card1_Stats;