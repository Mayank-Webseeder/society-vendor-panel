// This is used to store the onboarding data in global state, and merge with DefaultUser in case localStorage 
// does not have 'mysocietyneeds_user'(set by Onboarding-context during onboarding)
import { createContext, useContext, useState, useEffect } from "react";
import defaultUser from "./DefaultUser";


const UserContext = createContext();
export const useUser = () => useContext(UserContext);


// To ensure a deep object merging, not shallow (empty fields are not ignored)
function mergeWithDefaults(defaults, data) {
  const result = { ...defaults };
  for (const key in defaults) {
    if (
      data &&
      Object.prototype.hasOwnProperty.call(data, key) &&
      data[key] !== undefined &&
      data[key] !== null &&
      data[key] !== ''
    ) {
      result[key] = data[key];
    }
  }
  return result;
}


export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(() => {    // setUser can be used to update user details
        const stored = localStorage.getItem('mysocietyneeds_user');

        // Merge with defaultUser to ensure all fields are present
        return stored?  mergeWithDefaults(defaultUser, JSON.parse(stored)) : defaultUser;
    });


    // Hydrate(extract data) from localStorage on app load (in case localStorage changes after mount)
    useEffect(() => {
        const stored = localStorage.getItem('mysocietyneeds_user');
        if(stored) setUser(mergeWithDefaults(defaultUser, JSON.parse(stored)));
    }, []);


    // Optionally, when setting user, always merge with defaultUser
    const safeSetUser = (newUser) => {
        const merged = mergeWithDefaults(defaultUser, newUser);
        setUser(merged);
        localStorage.setItem('mysocietyneeds_user', JSON.stringify(merged));
    };


    // Function to reset user-context data on logout
    const resetUser = () => {
      setUser(defaultUser);
      localStorage.removeItem('mysocietyneeds_user');
    };


    return (
        <UserContext.Provider value={{ user, setUser: safeSetUser, resetUser }}>
            {children}
        </UserContext.Provider>
    );
};