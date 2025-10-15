import { LayoutDashboard } from 'lucide-react';
import { MdFiberNew } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineEventAvailable } from "react-icons/md";
import { BsBarChartLine } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";


const sidebarMenu = [
    {
        icon: LayoutDashboard,
        title: "Dashboard",
        redirect: "/dashboard"
    },

    {
        icon: MdFiberNew,
        title: "New Leads",
        redirect: "/new-leads"
    },

    {
        icon: IoBriefcaseOutline,
        title: "My Jobs",
        redirect: "/my-jobs"
    },

    // {
    //     icon: MdOutlineEventAvailable,
    //     title: "Availability",
    //     redirect: "/my-profile/work-details"
    // },

    {
        icon: BsBarChartLine,
        title: "My Stats",
        redirect: "/my-stats"
    },

    {
        icon: FaRegUser,
        title: "User Profile",
        redirect: "/my-profile"
    },

    {
        icon: FaRegBell,
        title: "Notifications",
        redirect: ''
    },

    {
        icon: MdOutlineSupportAgent,
        title: "Help",
        redirect: "/my-profile/account-support"
    },

    {
        icon: MdOutlineLogout,
        title: "Log out",
        redirect: "/logout"
    }
]


export default sidebarMenu;