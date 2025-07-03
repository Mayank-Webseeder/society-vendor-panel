import CircularLinearRatings from "../components/CircularLinearRatings";
import { IoIosArrowBack } from "react-icons/io";
import MyStatsCard1 from "../assets/MyStats_Card1.png";
import MyStatsCard2 from "../assets/MyStats_Card2.png";


const MyStats = () => {

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 pb-8">
        <IoIosArrowBack size={24} color="#1C1B1F" />
        <h2>Your Rating</h2>
      </div>

      <div>
        <img src={MyStatsCard1} alt="MyStats-Card1" />
        <img src={MyStatsCard2} alt="MyStats-Card2" />
      </div>

      <CircularLinearRatings />
    </div>
  )
}


export default MyStats;