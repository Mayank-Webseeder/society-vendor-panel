import { IconButton } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import CircularLinearRatings from "../components/CircularLinearRatings";
import Card1_Stats from "../components/cards/Card1_Stats";
import Card2_Stats from "../components/cards/Card2_Stats";
import { useNavigate } from 'react-router-dom';



const MyStats = () => {

  const navigate = useNavigate();
  

  return (
    <div className="flex flex-col">
      <div className="flex items-center -ml-3 gap-1 pb-8">
        <IconButton onClick={() => navigate('/new-leads')}>
          <ChevronLeft size={25} strokeWidth={3} color="black" />
        </IconButton>
        <h2>Your Rating</h2>
      </div>

      <div className="flex items-center gap-5">
        <Card1_Stats />
        <Card2_Stats />
      </div>

      <CircularLinearRatings />
    </div>
  )
}


export default MyStats;