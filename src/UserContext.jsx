// This is used to store the onboarding data in global state, and merge with DefaultUser in case localStorage 
// does not have 'velra_user'(set by Onboarding-context during onboarding)


import { createContext, useContext, useState, useEffect } from "react";
import defaultUser from "./DefaultUser";


const UserContext = createContext();
export const useUser = () => useContext(UserContext);


export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {    // setUser can be used to update user details
        const stored = localStorage.getItem('velra_user');

        // Merge with defaultUser to ensure all fields are present
        return stored?  {...defaultUser, ...JSON.parse(stored)} : defaultUser;
    });


    // Hydrate(extract data) from localStorage on app load (in case localStorage changes after mount)
    useEffect(() => {
        const stored = localStorage.getItem('velra_user');
        if(stored) setUser({ ...defaultUser, ...JSON.parse(stored) });
    }, []);


    // Optionally, when setting user, always merge with defaultUser
    const safeSetUser = (newUser) => {
        setUser({ ...defaultUser, ...newUser });
        localStorage.setItem('velra_user', JSON.stringify({ ...defaultUser, ...newUser }));
    };


    return (
        <UserContext.Provider value={{ user, setUser: safeSetUser }}>
            {children}
        </UserContext.Provider>
    );
};