import React, {useState} from "react";

export const LoggerContext = React.createContext(true);

const Logger = ({children}) => {
    const [user, setUser] = useState(true);

    return (
        <LoggerContext.Provider value={user, setUser}>
            {children}
        </LoggerContext.Provider>
    );
}

export default Logger;