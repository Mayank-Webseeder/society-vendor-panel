import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpiModal from '../../components/payment/UpiModal';
import UpiConfirmModal from '../../components/payment/UpiConfirmModal';
import UpiSuccessModal from '../../components/payment/UpiSuccessModal';
import MembershipBenefits from './MembershipBenefits';
import PaymentMethod from './PaymentMethod';
import { IoClose } from "react-icons/io5";
import Logo from '../../assets/Logo.png';

// Add this import for a spinner (you can use any spinner you like)
import { CircularProgress } from '@mui/material';

const Payment = () => {
  const [modalStep, setModalStep] = useState(null); // null | 'upi' | 'confirm' | 'success'
  const [loading, setLoading] = useState(false); // <-- Spinner state
  const navigate = useNavigate();

  // Handler for close button
  const handleClose = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      {/* Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70">
          <CircularProgress size={60} thickness={5} color="primary" />
          <span className="mt-6 text-lg font-semibold z-[60] text-[rgba(0,0,0,0.59)]">Please wait while we take you back to your dashboard...</span>
        </div>
      )}

      {/* Navbar */}
      <div className='w-full h-16 px-10 flex justify-between items-center'>
        <img src={Logo} alt="velra-logo" />
        <button
          className='h-fit bg-[#56A9D9] border-none p-1 flex justify-center items-center rounded-full transition-colors duration-200 hover:bg-[#3577a3]'
          onClick={handleClose}
          disabled={loading}
          style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          <IoClose color='white' size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex w-full flex-1">
        {/* Left Half */}
        <div className="flex flex-1 justify-center h-full p-2">
          <MembershipBenefits />
        </div>

        {/* Right Half */}
        <div className="flex flex-1 h-full p-2 relative">
          <PaymentMethod onUpiClick={() => setModalStep('upi')} />
        </div>
      </div>

      {/* Modals */}
      {modalStep === 'upi'  &&  <UpiModal onProceed={() => setModalStep('confirm')} onClose={() => setModalStep(null)} />}
      {modalStep === 'confirm'  &&  <UpiConfirmModal onProceed={() => setModalStep('success')} onClose={() => setModalStep(null)} />}
      {modalStep === 'success'  &&  <UpiSuccessModal onGoToDashboard={() => navigate('/dashboard')} onClose={() => setModalStep(null)} />}
    </div>
  );
};

export default Payment;