

const UpiSuccessModal = ({ onGoToDashboard }) => (

  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="bg-white rounded-xl shadow-lg w-[400px] h-[320px] flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mb-4 text-green-600">Payment Successful!</h2>
      
      <p className="mb-6 text-gray-700 text-center">
        Your subscription is now active.<br />Thank you for choosing us!
      </p>
      
      <button className="bg-blue-600 text-white px-8 py-2 rounded" onClick={onGoToDashboard}>
        Go to Dashboard
      </button>
    </div>
  </div>
);


export default UpiSuccessModal;