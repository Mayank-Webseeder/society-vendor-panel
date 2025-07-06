import { useState } from 'react';
import { X, Clock, ChevronDown } from 'lucide-react';
import Button from '@mui/material/Button';

const UpiConfirmModal = ({ onProceed, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const [approved, setApproved] = useState(false);
  const [proceeding, setProceeding] = useState(false);

  // Dummy data
  const startDate = 'Jun 18, 2025';
  const endDate = 'Jun 18, 2026';
  const expiresOn = "4:30 PM";

  // Handler for animated proceed
  const handleProceed = () => {
    setProceeding(true);
    setTimeout(() => {
      setProceeding(false);
      onProceed();
    }, 2000); // Animation duration (ms)
  };

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
          paddingTop: 60,
        }}
      >
        {/* Close Button */}
        <button
          className="rounded-full flex justify-center items-center border-none absolute top-4 right-4 text-blue-300 hover:text-black cursor-pointer transition-colors"
          onClick={onClose}
          disabled={proceeding}
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <h1 className="text-2xl self-start font-semibold mb-8 text-slate-800 mt-5">
          Confirm Your Payment
        </h1>

        {/* Glassmorphic effect inner div */}
        <div
          style={{
            background: 'rgba(86, 169, 217, 0.04)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            border: '1px solid rgba(86, 169, 217, 0.25)',
            width: '100%',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          {/* Approve/Decline Buttons */}
          <div className="flex justify-center gap-16 w-full mb-8 px-4">
            <Button
              variant={approved ? "outlined" : "contained"}
              color="primary"
              onClick={() => setApproved(true)}
              sx={{
                backgroundColor: approved ? 'white' : '#56A9D9',
                color: approved ? '#56A9D9' : 'white',
                border: approved ? '2px solid #56A9D9' : 'none',
                fontWeight: '700',
                minWidth: { xs: 120, sm: 170 },
                flex: 1,
                maxWidth: 240,
                textTransform: "none",
                boxShadow: approved ? 'none' : undefined,
                transition: 'all 0.2s',
              }}
              disabled={proceeding}
            >
              Approve Autopay
            </Button>

            <Button
              onClick={onClose}
              variant={approved ? "contained" : "outlined"}
              color="primary"
              sx={{
                color: approved ? 'white' : '#56A9D9',
                backgroundColor: approved ? '#56A9D9' : 'white',
                border: approved ? 'none' : '2px solid rgba(0,0,0,0.12)',
                fontWeight: '700',
                minWidth: { xs: 120, sm: 170 },
                flex: 1,
                maxWidth: 220,
                textTransform: "none",
                boxShadow: approved ? undefined : 'none',
                transition: 'all 0.2s',
              }}
              disabled={proceeding}
            >
              Decline
            </Button>
          </div>

          {/* Approve Payment Section */}
          <hr className='w-full border-t-1 border-gray-300' />

          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              cursor: 'pointer',
              maxHeight: expanded ? 100 : 56,
            }}
            onClick={() => setExpanded((prev) => !prev)}
          >
            <div className="flex items-center pt-2 pb-1 justify-between">
              <div className="flex items-center">
                <Clock size={22} strokeWidth={3} color='rgba(0,0,0,0.69)' className="mr-3" />
                <span className="text-lg font-semibold text-gray-800">Approve Payment</span>
              </div>
              <ChevronDown
                size={24}
                strokeWidth={3}
                color='rgba(0,0,0,0.59)'
                style={{
                  transition: 'transform 0.3s',
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </div>
            <div
              className="transition-all duration-300 px-4"
              style={{
                opacity: expanded ? 1 : 0,
                maxHeight: expanded ? 40 : 0,
                pointerEvents: expanded ? 'auto' : 'none',
              }}
              onClick={e => e.stopPropagation()}
            >
              <span className="block text-base font-medium text-[#4487AE] py-2">
                Expires On: {expiresOn}
              </span>
            </div>
          </div>

          <hr className='w-full border-t-1 border-gray-300 mt-2' />

          <div className="grid grid-cols-2 gap-4 my-4">
            <div>
              <p className="text-base text-black">Start date</p>
              <p className="text-base font-medium text-black">{startDate}</p>
            </div>
            <div>
              <p className="text-base text-black">End date</p>
              <p className="text-base font-medium text-black">{endDate}</p>
            </div>
          </div>
        </div>

        {/* Payment reflection message */}
        <p className="text-center text-sm text-gray-600 mb-8 px-4">
          Payment may take up to 3 working days to be reflected in your account
        </p>

        {/* Proceed Button with animation */}
        <button
          className={`w-[30%] bg-[#56A9D9] border-none text-lg text-white font-bold py-2 rounded-md shadow-md transition-colors cursor-pointer flex items-center justify-center
            ${!approved || proceeding ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-500'}
          `}
          onClick={handleProceed}
          disabled={!approved || proceeding}
        >
          {proceeding ? (
            <span className="flex items-center gap-2 animate-pulse">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              Processing...
            </span>
          ) : (
            "Proceed"
          )}
        </button>

        <style>{`
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </div>
    </div>
  );
};

export default UpiConfirmModal;