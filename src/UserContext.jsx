// This is used to store the onboarding data in global state.

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    //Hydrate(extract data) from localStorage on app load
    useEffect(() => {
        const stored = localStorage.getItem('velra_user');

        if(stored) setUser(JSON.parse(stored));
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};