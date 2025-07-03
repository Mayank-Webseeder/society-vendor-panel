

const UpiConfirmModal = ({ onProceed, onClose }) => (

  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="bg-white rounded-xl shadow-lg w-[400px] h-[320px] flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>
      
      <p className="mb-6 text-gray-700 text-center">
        Please confirm your UPI payment to proceed with your subscription.
      </p>
      
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={onProceed}>Confirm & Pay</button>
        <button className="bg-gray-300 px-6 py-2 rounded" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
);


export default UpiConfirmModal;