import dashboardIcon from '../assets/dashboardIcon.png';
import newLeadsIcon from '../assets/newLeadsIcon.png';
import myJobsIcon from '../assets/myJobsIcon.png';
import availabilityIcon from '../assets/availabilityIcon.png';
import myStatsIcon from '../assets/myStatsIcon.png';
import helpIcon from '../assets/helpIcon.png';
import logoutIcon from '../assets/logoutIcon.png';


const sidebarMenu = [
    {
        icon: dashboardIcon,
        title: "Dashboard",
        redirect: "/dashboard"
    },

    {
        icon: newLeadsIcon,
        title: "New Leads",
        redirect: "/new-leads"
    },

    {
        icon: myJobsIcon,
        title: "My Jobs",
        redirect: "/my-jobs"
    },

    {
        icon: availabilityIcon,
        title: "Availability",
        redirect: "/my-profile/work-details"
    },

    {
        icon: myStatsIcon,
        title: "My Stats",
        redirect: "/my-stats"
    },

    {
        icon: helpIcon,
        title: "Help",
        redirect: "/my-profile/account-support/help-support"
    },

    {
        icon: logoutIcon,
        title: "Log out",
        redirect: "/logout"
    }
]


export default sidebarMenu;