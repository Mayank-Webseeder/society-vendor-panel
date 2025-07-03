import { useState } from 'react';
import UpiModal from '../../components/payment/UpiModal';
import UpiConfirmModal from '../../components/payment/UpiConfirmModal';
import UpiSuccessModal from '../../components/payment/UpiSuccessModal';
import { useNavigate } from 'react-router-dom';


const Payment = () => {

  const [modalStep, setModalStep] = useState(null); // null | 'upi' | 'confirm' | 'success'

  const navigate = useNavigate();


  return (
    <div className="flex h-screen w-screen bg-white">

      {/* Left Half */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#f5f8fa]">
        {/* Company Logo */}
        <img src="/assets/Logo.png" alt="Logo" className="h-20 mb-8" />
        
        {/* Membership Benefits */}
        <h2 className="text-2xl font-bold mb-4">Gold Membership</h2>
        <ul className="mb-6 text-lg">
          <li>✔️ Priority Support</li>
          <li>✔️ Exclusive Perks</li>
          <li>✔️ More Leads</li>
        </ul>
        
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md">
          Subscribe Now
        </button>
      </div>



      {/* Right Half */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <h3 className="text-xl font-semibold mb-6">Choose how to pay</h3>
        
        <div className="flex flex-col gap-6 w-[350px]">
          {/* Credit/Debit Card Option */}
          <div className="border rounded-lg p-5 flex items-center cursor-pointer hover:shadow"
               onClick={() => setModalStep('card')}>
            <img src="/assets/card_logo.png" alt="Card" className="h-8 mr-4" />
            <span className="text-lg font-medium">Credit or Debit Card</span>
          </div>
          
          {/* UPI Autopay Option */}
          <div className="border rounded-lg p-5 flex items-center cursor-pointer hover:shadow"
               onClick={() => setModalStep('upi')}>
            <img src="/assets/upi_logo.png" alt="UPI" className="h-8 mr-4" />
            <span className="text-lg font-medium">UPI Autopay</span>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      {modalStep === 'upi' && <UpiModal onProceed={() => setModalStep('confirm')} onClose={() => setModalStep(null)} />}
      {modalStep === 'confirm' && <UpiConfirmModal onProceed={() => setModalStep('success')} onClose={() => setModalStep(null)} />}
      {modalStep === 'success' && <UpiSuccessModal onGoToDashboard={() => navigate('/dashboard')} />}
    </div>
  );
};


export default Payment;