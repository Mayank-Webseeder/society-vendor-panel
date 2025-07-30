import Card1_Ellipse10 from "../../assets/Card1_Ellipse10.png";
import Card1_Ellipse11 from "../../assets/Card1_Ellipse11.png";
import Card1_Vector20 from "../../assets/Card1_Vector20.png";
import { useUser } from '../../UserContext';


const Card1 = () => {

  const { user } = useUser();    // Get context data

  
  return (
    <div className="relative bg-[#5CA7D3] w-60 rounded-2xl h-40 overflow-hidden hover:scale-105 transition-transform duration-300">
      <p className="relative font-medium text-xl pl-2 text-white/90 z-30 pt-4">Avg. Response Time</p>
      <p className="relative font-semibold text-white text-4xl z-30 pt-12 pl-5">
        {
          user.membershipActive ?
            <>
              {user.avgResponseTime} min
            </>
            :
            <>
              N/A
            </>
        }
      </p>
      <img src={Card1_Ellipse10} className="absolute z-10 right-0 bottom-0" alt="card1-ellipse-10" />
      <img src={Card1_Ellipse11} className="absolute z-10 right-0 bottom-0" alt="card1-ellipse-11" />
      <img src={Card1_Vector20} className="absolute z-10 right-0 bottom-0" alt="card1-vector-20" />
    </div>
  )
}


export default Card1;