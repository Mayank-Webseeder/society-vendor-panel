import { Outlet } from "react-router-dom";
import { OnboardingProvider } from "./OnboardingContext";
import logoWhite from '../../assets/logoWhite.png';

const OnboardingLayout = () => (

  <OnboardingProvider>

    <div className="relative h-screen w-screen flex justify-center items-center bg-[#56A9D9]">
      
      {/* Velra logo */}
      <div className="absolute top-3 left-40 flex items-center justify-center gap-2">
        <img src={logoWhite} alt="velra-logo" />
        <h3 className="font-semibold text-5xl text-white">VELRA</h3>
      </div>
      
      
      <Outlet />
    
    </div>

  </OnboardingProvider>
)


export default OnboardingLayout;