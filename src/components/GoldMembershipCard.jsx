import React from 'react';


const GoldMembershipCard = () => {

  return (
    <div className="max-w-[65%] border-solid border-[#56A9D9] pb-2 rounded-xl shadow-md relative overflow-hidden border">
        {/* <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-600 rounded-full opacity-20"></div> */}
        {/* <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-blue-600 rounded-full opacity-20"></div> */}
        
        <h3 style={{ borderBottom:'1px solid #56A9D9' }} className="bg-gradient-to-r from-[#56A9D9] to-[#697DE0] text-white text-xl w-full font-semibold py-3 px-2">Vendor Gold Membership</h3>
        
        <div className="bg-white h-full pt-2">
          <div className="flex items-center text-sm px-3 mb-4">
              <span className="text-lg font-bold mr-1">₹ 999</span>/year
              <span className="ml-auto bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1"></span> Active
              </span>
          </div>
        
          <p className="text-sm text-[rgba(0,0,0,0.59)] px-4 pb-1">One-time yearly payment</p>
          <p className="text-xs opacity-80 mt-1 px-2 italic text-blue-700">Valid till 24th June, 26</p>
        </div>
    </div>
  )
}


export default GoldMembershipCard;