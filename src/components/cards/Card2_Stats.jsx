import { useOnBoarding } from "../../pages/onboarding/OnboardingContext";


const Card2_Stats = () => {

  const { onboardingData } = useOnBoarding();    // Get context data


  return (
    <div className="bg-[#709BB8] h-24 w-72 rounded-xl">
        <p className="text-white/90 font-semibold pl-3 pt-2 text-2xl">{onboardingData.jobsCompleted}</p>
        <p className="text-white font-medium text-lg pt-3 pl-2">Total Jobs Done</p>
    </div>
  )
}


export default Card2_Stats;