import { Route, Routes, useLocation, Navigate, replace } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
// import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import NewLeads from './pages/NewLeads';
import MyJobs from './pages/MyJobs';
import MyStats from './pages/MyStats';
import Logout from './pages/Logout';
import UserProfile from "./pages/UserProfile";
import PersonalInformation from "./pages/PersonalInformation";
import SecurityOptions from "./pages/SecurityOptions";
import WorkDetails from './pages/WorkDetails';
import DocumentAndVerification from "./pages/DocumentAndVerification";
import MembershipPage from "./pages/MembershipPage";
import AccountAndSupport from './pages/AccountAndSupport';
import HelpAndSupport from './pages/HelpAndSupport';
import FAQ from './pages/FAQ';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Payment from './pages/payment/Payment';
import PaymentSuccess from './pages/payment/PaymentSuccess';
import PaymentFailure from './pages/payment/PaymentFailure';
import LandingPageSociety from './pages/LandingPageSociety';
import LandingPageVendor from './pages/LandingPageVendor';
import AuthPage from './pages/auth/AuthPage';
import ValidateEmail from "./pages/auth/ValidateEmail";
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyOtpForgotPassword from "./pages/auth/VerifyOtpForgotPassword";
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const location = useLocation();

  return (
    <>
      {/* ToastContainer for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes location={location}>

        {/* Landing Pages */}
        <Route path="/" element={<Navigate to="/society-landing" replace={true} />} />
        <Route path="/society-landing" element={<LandingPageSociety />} />
        <Route path="/vendor-landing" element={<LandingPageVendor />} />

        {/* Auth flow */}
        <Route path="/auth">
          <Route index element={<AuthPage />} /> {/* Default page for /auth */}
          <Route path="validate-email" element={<ValidateEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password/verify-otp" element={<VerifyOtpForgotPassword />} />
          <Route path="forgot-password/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Onboarding */}
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

        {/* Payment (not a protected route) */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failure" element={<PaymentFailure />} />


        {/* Main App */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <div className="relative h-screen w-screen">

                {/* SIDEBAR - hidden on mobile, visible on sm+ */}
                <aside className="hidden sm:fixed sm:top-0 sm:left-0 sm:h-screen sm:w-16 md:w-20 bg-[#1A2131] z-50 sm:flex sm:flex-col sm:items-center sm:py-2">
                  <Sidebar iconOnly />
                </aside>

                {/* MOBILE BOTTOM MENU BAR - visible only on mobile */}
                <div className="sm:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#1A2131] z-50 flex items-center justify-center">
                  <Sidebar mobileTopBar />
                </div>

                {/* PAGE CONTENT */}
                <main className="absolute top-0 left-0 sm:left-16 md:left-20 right-0 bottom-14 sm:bottom-0 overflow-y-auto bg-gradient-to-br from-blue-100 to-blue-50">
                  <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/new-leads" element={<NewLeads />} />
                      <Route path="/my-jobs" element={<MyJobs />} />
                      <Route path="/my-stats" element={<MyStats />} />
                      <Route path="/logout" element={<Logout />} />

                      <Route path="/my-profile/*" element={<UserProfile />}>
                        <Route index element={<PersonalInformation />} />
                        <Route path="security-options" element={<SecurityOptions />} />
                        <Route path="work-details" element={<WorkDetails />} />
                        <Route path="documents-verification" element={<DocumentAndVerification />} />
                        <Route path="membership" element={<MembershipPage />} />
                        <Route path="account-support" element={<AccountAndSupport />} />
                        <Route path="account-support/help-support" element={<HelpAndSupport />} />
                        <Route path="account-support/faq" element={<FAQ />} />
                        <Route path="account-support/terms-conditions" element={<TermsAndConditions />} />
                        <Route path="account-support/privacy-policy" element={<PrivacyPolicy />} />
                      </Route>

                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="*" element={<Dashboard />} />
                    </Routes>
                  </main>

                </div>

            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;