import { createContext,useState } from "react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [userCard, setUserCard] = useState(null);

    const setCardContext = (val) => {
        setUserCard(val);
    }
    return (
        <CardContext.Provider value={{ userCard, setCardContext }}>
            {children}
        </CardContext.Provider>
    );
};