import React from 'react';
import sidebarMenu from '../static/sidebarMenu';
import { Link, useLocation } from 'react-router-dom';


const Sidebar = () => {

  const location = useLocation();


  return (
    <div className='mt-5 flex flex-col ml-20 gap-3'>
      {
        sidebarMenu.map((item, idx) => (
          <Link to={item.redirect} key={idx} className='no-underline'>
            <div
             className={`flex justify-start items-center py-1 gap-3 pl-1 hover:bg-[#273147]
             ${location.pathname === item.redirect? 'bg-[#213560]' : '' }`}
            >
              <img src={item.icon} />
              <p className='text-white font-medium'>{item.title}</p>
            </div>
          </Link>
        ))
      }      
    </div>
  )
}


export default Sidebar;