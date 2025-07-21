// Primary task is just to collect onboarding data, which is saved to local storage 
// at final onboarding step(Step8_VerifyOtp.jsx) by name of 'velra_user'


import { createContext, useContext, useState, useCallback } from "react";


const OnboardingContext = createContext();


export const useOnBoarding = () => useContext(OnboardingContext);    // context-hook --> Imported in components & used for context


export const OnboardingProvider = ({ children }) => {

    const [onboardingData, setOnboardingData] = useState({
        name: '',
        initials: '',
        // id: '',
        bio: '',
        dateOfBirth: '',
        gender: '',
        jobTitle: '',
        email: '',
        businessName: '',
        workExperience: '',
        idProof: '',
        idProofFile: null,
        building: '',
        locality: '',
        landmark: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        currentLocation: '',
        whatYouOffer: [],
        workingDays: [],
        workingHours: '',    //ex.'10:00 AM - 7:30 PM'
        phone: '',
        otp: '',
        avgResponseTime: 12,
        // jobsCompleted: 0,
        // rating: 2,
        // appliedJobs: 0,
        notificationsEnabled: true,
        agreedTermsAndConditions: false,
        agreedPrivacyPolicy: false,
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