import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpiModal from '../../components/payment/UpiModal';
import UpiConfirmModal from '../../components/payment/UpiConfirmModal';
import UpiSuccessModal from '../../components/payment/UpiSuccessModal';
import MembershipBenefits from './MembershipBenefits';
import PaymentMethod from './PaymentMethod';
import { IoClose } from "react-icons/io5";
import Logo from '../../assets/Logo.png';



const Payment = () => {

  const [modalStep, setModalStep] = useState(null); // null | 'upi' | 'confirm' | 'success'

  const navigate = useNavigate();


  return (
    <div className="flex flex-col h-screen w-full bg-white">

      {/* Navbar */}
      <div className='w-full h-16 px-10 flex justify-between items-center'>
        <img src={Logo} alt="velra-logo" />
        
        <div className='h-fit bg-[#56A9D9] p-1 flex justify-center items-center rounded-full'>
          <IoClose color='white' size={24} />
        </div>
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