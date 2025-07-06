import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import dummyData from "../static/dummyData_Leads";
import LeadCard from "../components/LeadCard";


const statusOptions = [
  { label: "All", color: "bg-[rgba(72,118,161,0.8)]" },
  { label: "New", color: "bg-[#4A6E7A]" },
  { label: "Completed", color: "bg-[rgba(74,87,122,0.8)]" },
  { label: "Ongoing", color: "bg-[rgba(101,74,122,0.8)]" },
  { label: "Applied", color: "bg-[rgba(122,74,106,0.8)]" },
];


const MyJobs = () => {

  const [selectedStatus, setSelectedStatus] = useState("All");

  // Show all leads if "All" is selected, otherwise filter
  const filteredLeads = (selectedStatus === "All")?  dummyData : dummyData.filter((lead) => lead.status === selectedStatus);



  return (
    <div className="flex flex-col">
      <div className="fixed top-16 right-8 left-60 pl-4 z-20 pt-4 pb-5 bg-white">
        {/* Title */}
        <div className="flex items-center gap-3 pb-8">
          <IoIosArrowBack size={24} color="#1C1B1F" />
          <h2>My Jobs</h2>
        </div>
      
        {/* Status Cards */}
        <div className="flex gap-4">
          {
            statusOptions.map(option => (
              <button
                key={option.label}
                onClick={() => setSelectedStatus(option.label)}
                className={`flex justify-center items-center px-4 py-1 text-base w-28 rounded-full text-white font-semibold border-none cursor-pointer transition
                  ${option.color}
                  ${selectedStatus === option.label ?  'ring-2 ring-blue-400 scale-105' : ''}`}
              >
                {option.label}
              </button>
            ))
          }
        </div>
      </div>


      {/* Lead Cards */}
      <div className="grid grid-cols-2 gap-x-14 gap-y-5 mt-28 mr-10">
        {
          filteredLeads.length > 0 ? (
            filteredLeads.map((lead, idx) => (
              <LeadCard key={idx} lead={lead} />
            ))
          ) : (
            <div className="col-span-2 text-gray-400 text-center mt-10">No leads found for "{selectedStatus}"</div>
          )
        }
      </div>
    </div>
  )
}


export default MyJobs;