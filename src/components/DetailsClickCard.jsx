import { IoIosArrowForward } from "react-icons/io";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";


const DetailsClickCard = ({ title, route }) => {
    
    const navigate = useNavigate();

    const handleClick = () => {
        if (route) {
            navigate(route);
        }
    };

    return (
        <Paper
            elevation={3}
            className="rounded-xl p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all duration-300"
            sx={{ 
                backgroundColor: "white", 
                boxShadow: 3,
                border: '1px solid #E0E0E0',
                width: '100%',
            }}
            onClick={handleClick}
        >
            <span className="text-gray-800 font-medium text-lg">{title}</span>
            <IoIosArrowForward size={20} className="text-gray-500" />
        </Paper>
    );
};

export default DetailsClickCard;



// New task. I want to create this component now.
// Below is the template like before. Ensure responsiveness.

// const PrivacyPolicy = () => {
    
//     return (
//         <Paper
//             elevation={3}
//             className="rounded-xl p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all duration-300"
//             sx={{ 
//                 backgroundColor: "white", 
//                 boxShadow: 3,
//                 border: '1px solid #E0E0E0',
//                 width: '100%',
//                 ml: 4,
//                 mb: 5
//             }}
//         >

//         </Paper>
//     );
// };

// export default PrivacyPolicy;