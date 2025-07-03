import { X, Check } from 'lucide-react'; // Using Lucide X for close, and Check for the success icon


const UpiSuccessModal = ({ onGoToDashboard, onClose }) => {


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
          justifyContent: 'center', // Centering content vertically
          paddingTop: 0, // Reset padding top as content is centered
        }}
      >
        {/* Close Button */}
        <button
          className="rounded-full flex justify-center items-center border-none absolute top-4 right-4 text-blue-300 hover:text-black cursor-pointer transition-colors"
          onClick={onClose}
        >
          <X size={22} /> {/* Used Lucide X icon */}
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-14 text-slate-800 text-center">
          Payment Successful!
        </h1>

        {/* Large Checkmark Icon - Custom design to match image */}
        <div
          className="flex items-center justify-center rounded-full mb-10" // Added rounded-full for circular shape
          style={{
            backgroundColor: '#34A853', // Background color of the circle
            width: '80px', // Size of the circle
            height: '80px', // Size of the circle
          }}
        >
          <Check size={50} style={{ color: '#D9D9D9' }} strokeWidth={2.5} /> {/* Changed checkmark color to #D9D9D9 */}
        </div>

        {/* Descriptive Text */}
        <p className="text-center text-lg mb-8 max-w-xl leading-relaxed" style={{ color: 'rgba(0,0,0,0.59)' }}>
          Welcome to Velra! You're now ready to start pitching to verified society requirements.
        </p>

        {/* Go to Dashboard Button */}
        <button
          className="w-[40%] bg-[#56A9D9] border-none text-lg text-white font-bold py-3 rounded-md shadow-md hover:bg-blue-500 transition-colors cursor-pointer"
          onClick={onGoToDashboard} // Reusing onProceed prop for "Go to Dashboard"
        >
          Go to Dashboard
        </button>

        {/* Custom styles for font (kept for consistency) */}
        <style>{`
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </div>
    </div>
  );
};

export default UpiSuccessModal;