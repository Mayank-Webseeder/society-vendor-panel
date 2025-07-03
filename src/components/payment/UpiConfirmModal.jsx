import { useState } from 'react';
import { X, Clock, ChevronDown } from 'lucide-react'; // Using Lucide icons for close, clock, and dropdown arrow



const UpiConfirmModal = ({ onProceed, onClose }) => {
  // State for the "Approve Autopay" dropdown (if it were interactive)
  const [autopayOption, setAutopayOption] = useState('Expire on 11:30 AM');

  // Dummy data for the dates
  const startDate = 'Jun 18, 2025';
  const endDate = 'Jun 18, 2026';




  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(134,198,234,0.27)] bg-opacity-30 z-50 font-inter">
      {/* Inner glassmorphic card */}
      <div
        className="relative rounded-xl shadow-lg flex flex-col items-center border border-white/30 px-6 py-4"
        style={{
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          width: '45vw',
          height: '80vh',
          maxWidth: '900px',
          maxHeight: '700px',
          paddingLeft: 120,
          paddingRight: 120,
          justifyContent: 'flex-start',
          paddingTop: 60, // Keep original padding top
        }}
      >
        {/* Close Button */}
        <button
          className="rounded-full flex justify-center items-center border-none absolute top-4 right-4 text-blue-300 hover:text-black cursor-pointer transition-colors"
          onClick={onClose}
        >
          <X size={22} /> {/* Replaced IoClose with Lucide X icon */}
        </button>

        {/* Heading */}
        <h1 className="text-2xl self-start font-semibold mb-8 text-slate-800 mt-5">
          Confirm Your Payment
        </h1>

        {/* Inner div with a greater glassmorphism effect */}
        <div
          style={{
            background: 'rgba(86, 169, 217, 0.04)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            border: '1px solid rgba(86, 169, 217, 0.25)',
            width: '100%',
            padding: '1.5rem', // optional: for spacing inside
            marginBottom: '2rem', // optional: for spacing below
          }}
        >
          {/* Approve/Decline Buttons */}
          <div className="flex justify-between w-full mb-8 px-4"> {/* Added horizontal padding */}
            <button className="flex-1 bg-white text-[#56A9D9] border-solid border-[#56A9D9] px-4 py-2 rounded-md font-bold text-base shadow-md hover:bg-blue-300 hover:text-white transition-colors mr-2 cursor-pointer">
              Approve Autopay
            </button>
            <button onClick={onClose} className="flex-1 bg-[#56A9D9] border-none text-white px-4 py-2 rounded-md font-semibold text-lg shadow-md hover:bg-gray-400 transition-colors ml-2 cursor-pointer">
              Decline
            </button>
          </div>
          

          {/* Approve Autopay Section */}
          <hr className='w-full border-t-1 border-gray-300' />

          <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <Clock size={20} className="text-gray-500 mr-3" /> {/* Replaced fas fa-clock with Lucide Clock icon */}
                <span className="text-lg font-medium text-gray-800">Approve Autopay</span>
              </div>
              <ChevronDown size={20} className="text-gray-500" /> {/* Replaced fas fa-chevron-down with Lucide ChevronDown icon */}
            </div>

            <hr className='w-full border-t-1 border-gray-300' />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-base font-medium text-gray-600">Start date</p>
                <p className="text-base text-gray-500">{startDate}</p>
              </div>
              <div>
                <p className="text-base font-medium text-gray-600">End date</p>
                <p className="text-base text-gray-500">{endDate}</p>
              </div>
            </div>
        </div>
        

        {/* Payment reflection message */}
        <p className="text-center text-sm text-gray-600 mb-8 px-4">
          Payment may take up to 3 working days to be reflected in your account
        </p>

        {/* Proceed Button */}
        <button
          className="w-[30%] bg-[#56A9D9] border-none text-lg text-white font-bold py-2 rounded-md shadow-md hover:bg-blue-500 transition-colors cursor-pointer"
          onClick={onProceed}
        >
          Proceed
        </button>

        {/* Custom styles for font and select arrow (if needed for future use) */}
        <style>{`
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
          /* Removed custom-select styles as Select component is not directly used */
        `}</style>
      </div>
    </div>
  );
};

export default UpiConfirmModal;
