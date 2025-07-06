import { Outlet } from "react-router-dom";
import { OnboardingProvider } from "./OnboardingContext";


const OnboardingLayout = () => (

  <OnboardingProvider>

    <div className="relative h-screen w-screen flex justify-center items-center bg-[#56A9D9]">
      <Outlet />
    </div>

  </OnboardingProvider>
)


export default OnboardingLayout;