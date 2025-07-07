import { useUser } from "../../UserContext";


const Card2_Stats = () => {

  const { user } = useUser();


  return (
    <div className="bg-[#709BB8] h-24 w-72 rounded-xl">
        <p className="text-white font-semibold pl-3 pt-2 text-2xl">{user.jobsCompleted} min</p>
        <p className="text-white/90 font-medium text-lg pt-3 pl-2">Total Jobs Done</p>
    </div>
  )
}


export default Card2_Stats;