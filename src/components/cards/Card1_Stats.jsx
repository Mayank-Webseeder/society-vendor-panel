import { useUser } from "../../UserContext";


const Card1_Stats = () => {

  const { user } = useUser();    // Get context data

 
  return (
    <div className="bg-[#70A6B8] h-24 w-72 rounded-xl">
        <p className="text-white font-semibold pl-3 pt-2 text-2xl">{user.avgResponseTime} min</p>
        <p className="text-white/90 font-medium text-lg pt-3 pl-2">Avg. Response Time</p>
    </div>
  )
}


export default Card1_Stats;