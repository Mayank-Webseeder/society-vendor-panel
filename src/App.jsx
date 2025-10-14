import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
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
import SubscriptionPage from "./pages/SubscriptionPage";
import AccountAndSupport from './pages/AccountAndSupport';
import HelpAndSupport from './pages/HelpAndSupport';
import FAQ from './pages/FAQ';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Payment from './pages/payment/Payment';
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

// Layout component for the main app with sidebar
const MainLayout = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Desktop Sidebar */}
      <aside className="hidden sm:fixed sm:inset-y-0 sm:left-0 sm:z-50 sm:w-16 sm:flex">
        <Sidebar />
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50">
        <Sidebar mobileTopBar />
      </nav>

      {/* Main Content Area */}
      <main className="sm:pl-16 pb-16 sm:pb-0 h-full overflow-y-auto">
        <div className="min-h-full">
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
              <Route path="subscription-details" element={<SubscriptionPage />} />
              <Route path="account-support" element={<AccountAndSupport />} />
              <Route path="account-support/help-support" element={<HelpAndSupport />} />
              <Route path="account-support/faq" element={<FAQ />} />
              <Route path="account-support/terms-conditions" element={<TermsAndConditions />} />
              <Route path="account-support/privacy-policy" element={<PrivacyPolicy />} />
            </Route>

            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Auth routes component
const AuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<AuthPage />} />
      <Route path="validate-email" element={<ValidateEmail />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="forgot-password/verify-otp" element={<VerifyOtpForgotPassword />} />
      <Route path="forgot-password/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

function App() {
  return (
    <>
      {/* Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Auth Flow Routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Onboarding Routes */}
        <Route path="/auth/onboarding" element={<Step1_Loading />} />
        <Route path="/auth/onboarding/steps" element={<OnboardingLayout />}>
          <Route path="what-you-offer" element={<Step2_WhatYouOffer />} />
          <Route path="working-days" element={<Step3_WorkingDays />} />
          <Route path="profile-1" element={<Step4_Profile1 />} />
          <Route path="profile-2" element={<Step5_Profile2 />} />
          <Route path="location" element={<Step6_Location />} />
          <Route path="verify-number" element={<Step7_VerifyNumber />} />
          <Route path="verify-otp" element={<Step8_VerifyOtp />} />
        </Route>

        {/* Payment Routes */}
        <Route path="/payment" element={<Payment />} />

        {/* Protected Main App Routes */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
