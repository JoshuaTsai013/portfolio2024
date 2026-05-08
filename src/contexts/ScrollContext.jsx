import React, { createContext, useContext } from 'react';

const ScrollContext = createContext(null);

export const ScrollProvider = ({ children, scrollY }) => {
    return (
        <ScrollContext.Provider value={scrollY}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScrollValue = () => {
    const context = useContext(ScrollContext);
    if (context === null) {
        throw new Error("useScrollValue must be used within a ScrollProvider");
    }
    return context;
};
