import { IoIosArrowBack } from "react-icons/io";
import LeadCard from '../components/LeadCard';
import dummyData from '../static/dummyData_Leads';


const NewLeads = () => {

  // Filter leads with status "New"
  const newLeads = dummyData.filter(lead => lead.status === "New");


  return (
    <div className='flex flex-col'>
      <div className="flex items-center gap-3 pb-8">
        <IoIosArrowBack size={24} color="#1C1B1F" />
        <h2>New Leads</h2>
      </div>

      {/* Actual Data */}
      <div className="grid grid-cols-2 gap-x-14 gap-y-5 mr-10">
        {
          newLeads.map((lead, idx) => (
            <LeadCard key={idx} lead={lead} />
          ))
        }
      </div>
    </div>
  )
}


export default NewLeads;