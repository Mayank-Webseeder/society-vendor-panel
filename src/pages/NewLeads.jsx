import { IconButton } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import LeadCard from '../components/LeadCard';
import dummyData from '../static/dummyData_Leads';


const NewLeads = () => {

  // Filter leads with status "New"
  const newLeads = dummyData.filter(lead => lead.status === "New");


  return (
    <div className='flex flex-col'>
      <div className="flex items-center -ml-3 gap-1 pb-8">
        <IconButton onClick={() => navigate('/new-leads')}>
          <ChevronLeft size={25} strokeWidth={3} color="black" />
        </IconButton>
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