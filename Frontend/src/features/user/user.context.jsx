import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [pendingrequest, setPendingrequest] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);


    return (
        <UserContext.Provider value={{ loading, setLoading, followers, setFollowers, following, setFollowing, pendingrequest, setPendingrequest, suggestedUsers, setSuggestedUsers }}>
            {children}
        </UserContext.Provider>
    )
}