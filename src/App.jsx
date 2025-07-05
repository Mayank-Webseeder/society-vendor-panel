import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import NewLeads from './pages/NewLeads';
import MyJobs from './pages/MyJobs';
import Availability from './pages/Availability';
import MyStats from './pages/MyStats';
import Help from './pages/Help';
import Logout from './pages/Logout';
import UserProfile from "./pages/UserProfile";
import ProfileCards from './pages/ProfileCards';
import WorkDetails from './pages/WorkDetails';
import DocumentAndVerification from "./pages/DocumentAndVerification";
import AccountAndSupport from './pages/AccountAndSupport';
import HelpAndSupport from './pages/HelpAndSupport';
import FAQ from './pages/FAQ';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Payment from './pages/payment/Payment';
import PaymentSuccess from './pages/payment/PaymentSuccess';
import PaymentFailure from './pages/payment/PaymentFailure';
import AuthPage from './pages/auth/AuthPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import OnboardingLayout from './pages/onboarding/OnboardingLayout';
import Step1_Loading from './pages/onboarding/Step1_Loading';
import Step2_WhatYouOffer from './pages/onboarding/Step2_WhatYouOffer';
import Step3_WorkingDays from './pages/onboarding/Step3_WorkingDays';
import Step4_Profile1 from './pages/onboarding/Step4_Profile1';
import Step5_Profile2 from './pages/onboarding/Step5_Profile2';
import Step6_Location from './pages/onboarding/Step6_Location';
import Step7_VerifyNumber from './pages/onboarding/Step7_VerifyNumber';
import Step8_VerifyOtp from './pages/onboarding/Step8_VerifyOtp';



function App() {

  const location = useLocation();


  
  return (
    <Routes location={location}>
      {/* Payment flow - full page, no layout */}
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/failure" element={<PaymentFailure />} />


      {/* Auth flow - full page, no layout */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />


      {/* New User Onboarding */}
      <Route path="/auth/onboarding" element={<OnboardingLayout />}>
        <Route index element={<Step1_Loading />} />
        <Route path="what-you-offer" element={<Step2_WhatYouOffer />} />
        <Route path="working-days" element={<Step3_WorkingDays />} />
        <Route path="profile-1" element={<Step4_Profile1 />} />
        <Route path="profile-2" element={<Step5_Profile2 />} />
        <Route path="location" element={<Step6_Location />} />
        <Route path="verify-number" element={<Step7_VerifyNumber />} />
        <Route path="verify-otp" element={<Step8_VerifyOtp />} />
      </Route>



      {/* Main app layout */}
      <Route
        path="*"
        element={
          <div className="flex flex-col">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow z-50">
              <Navbar />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-row pt-16 h-full">
              {/* Sidebar */}
              <div className="fixed top-16 left-0 w-56 h-[calc(100vh-4rem)] bg-[#1A2131] shadow">
                <Sidebar />
              </div>

              {/* Page Content */}
              <div className="ml-56 mt-0 py-6 px-8 w-full overflow-y-auto relative" id="main-content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/new-leads" element={<NewLeads />} />
                  <Route path="/my-jobs" element={<MyJobs />} />
                  <Route path="/availability" element={<Availability />} />
                  <Route path="/my-stats" element={<MyStats />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/logout" element={<Logout />} />

                  {/* Nested Routes */}
                  <Route path="/my-profile/*" element={<UserProfile />}>
                    <Route index element={<ProfileCards />} />
                    <Route path="work-details" element={<WorkDetails />} />
                    <Route path="documents-verification" element={<DocumentAndVerification />} />
                    <Route path="account-support" element={<AccountAndSupport />} />
                    <Route path="account-support/help-support" element={<HelpAndSupport />} />
                    <Route path="account-support/faq" element={<FAQ />} />
                    <Route path="account-support/terms-conditions" element={<TermsAndConditions />} />
                    <Route path="account-support/privacy-policy" element={<PrivacyPolicy />} />
                  </Route>

                  {/* Redirect root to dashboard */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />

                  {/* Optional: 404 fallback */}
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;



{/*
  'replace' prop means the current entry in the browser's history is replaced with the new route (/dashboard), instead of adding a new entry.The user cannot click the browser "Back" button to return to the original (/) route after being redirected.
  In short, 'replace' ensures the redirect does not leave a "redirect step" in the browser's back/forward navigation history.  
*/}