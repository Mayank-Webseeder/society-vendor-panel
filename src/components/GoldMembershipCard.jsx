import React from 'react';


const GoldMembershipCard = () => {

  return (
    <div className="max-w-[65%] bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl shadow-md p-6 relative overflow-hidden border border-blue-600">
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-600 rounded-full opacity-20"></div>
        <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-blue-600 rounded-full opacity-20"></div>
        
        <h3 className="text-xl font-semibold mb-2">Vendor Gold Membership</h3>
        
        <div className="flex items-center text-sm mb-4">
            <span className="text-lg font-bold mr-1">₹ 999</span>/year
            <span className="ml-auto bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-1"></span> Active
            </span>
        </div>
        
        <p className="text-sm opacity-90">One-time yearly payment</p>
        <p className="text-xs opacity-80 mt-1">Valid till 24th June, 26</p>
    </div>
  )
}


export default GoldMembershipCard;