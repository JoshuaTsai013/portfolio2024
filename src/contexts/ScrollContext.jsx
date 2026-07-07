import { createContext, useContext } from 'react';

const ScrollContext = createContext(null);

export const ScrollProvider = ({ children, scrollY }) => {
    return (
        <ScrollContext.Provider value={scrollY}>
            {children}
        </ScrollContext.Provider>
    );
};

// Intentional co-export of provider + hook: they form one unit and the hook is
// the only sanctioned scroll accessor. HMR full-reload on this file is acceptable.
// eslint-disable-next-line react-refresh/only-export-components
export const useScrollValue = () => {
    const context = useContext(ScrollContext);
    if (context === null) {
        throw new Error("useScrollValue must be used within a ScrollProvider");
    }
    return context;
};
