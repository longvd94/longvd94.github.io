import React, { createContext, useCallback, useContext, useState } from 'react';
import fakeResponse from '../../helpers/fakeResponse';

const PegaxyContext = createContext(null);

const PegaxyProvider = ({ children }) => {

    const [isLockedRequest, setIsLockedRequest] = useState(false);
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);

    const signin = useCallback(async () => {
        if (isLockedRequest) {
            return false;
        }
        setIsLockedRequest(true);
        try {
            const response = await fakeResponse({ message: 'Pegaxy' });
            setAccount(response);
            return response;
        } catch(err) {
            setError(err);            
        }  
        setIsLockedRequest(false); 
        
    }, [isLockedRequest]);

    return (
        <PegaxyContext.Provider value={{ account, error, signin }}>
            {children}
        </PegaxyContext.Provider>
    );
}

const usePegaxyContext = () => {
    const context = useContext(PegaxyContext);
    return context;
}

export {
    usePegaxyContext
};

export default PegaxyProvider;