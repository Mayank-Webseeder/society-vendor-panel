

const UpiModal = ({ onProceed, onClose }) => (

  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="bg-white rounded-xl shadow-lg w-[400px] h-[320px] flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mb-4">Enter UPI Details</h2>
  
      <input className="border rounded px-4 py-2 mb-4 w-3/4" placeholder="UPI App" />
  
      <input className="border rounded px-4 py-2 mb-6 w-3/4" placeholder="UPI ID" />
  
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={onProceed}>Proceed</button>
        <button className="bg-gray-300 px-6 py-2 rounded" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
);


export default UpiModal;