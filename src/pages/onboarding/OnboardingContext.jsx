import { createContext, useContext, useState, useCallback } from "react";


const OnboardingContext = createContext();

export const useOnBoarding = () => useContext(OnboardingContext);    //context-hook



export const OnboardingProvider = ({ children }) => {

    const [onboardingData, setOnboardingData] = useState({
        name: '',
        businessName: '',
        experience: '',
        idProof: '',
        idProofFile: null,
        building: '',
        locality: '',
        landmark: '',
        state: '',
        city: '',
        pincode: '',
        currentLocation: '',
        whatYouOffer: [],
        workingDays: [],
        wokingHours: [],    //startTime, endTime
        phone: '',
        otp: '',
    });

    // Memoize this function!
    const updateOnboardingData = useCallback((updates) => {
        setOnboardingData((prev) => ({ ...prev, ...updates }));
    }, []);
    

    return (
        <OnboardingContext.Provider value={{onboardingData, updateOnboardingData}}>
            {children}
        </OnboardingContext.Provider>
    )
}