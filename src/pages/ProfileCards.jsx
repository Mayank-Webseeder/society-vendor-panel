import BasicDetailsCard from '../components/BasicDetailsCard';
import DetailsClickCard from '../components/DetailsClickCard';
import NotificationCard from '../components/NotificationCard';
import GoldMembershipCard from '../components/GoldMembershipCard';
import AddressFormCard from '../components/AddressFormCard';



const ProfileCards = () => {
    

  return (
    <div className='flex gap-16 mb-4 w-full'>
                
        {/* Left Column */}
        <div className='flex flex-col basis-[40%] gap-5'>
          <BasicDetailsCard />
          <DetailsClickCard title="Work Details" route="work-details" />
          <NotificationCard />
        </div>


        {/* Right Column */}
        <div className='flex basis-[60%] flex-col gap-5'>
          <GoldMembershipCard />
          <AddressFormCard />
          <DetailsClickCard title="Documents and Verification" route="documents-verification" />
          <DetailsClickCard title="Account and Support" route="account-support" />
        </div>

    </div>
  )
}


export default ProfileCards;