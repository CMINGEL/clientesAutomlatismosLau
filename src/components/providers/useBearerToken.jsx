import React, {useState, useContext, createContext } from 'react';

const tokenContext = createContext();
const setTokenContext = createContext();

export function useTokenContext(props){
    return useContext(tokenContext)
}

export function useSetTokenContext(){
    return useContext(setTokenContext)
}

const UseBearerToken = ({ children }) => {

    const [bearerToken, setBearerToken] = useState('')
    return (
        <tokenContext.Provider value = { bearerToken }>
            <setTokenContext.Provider value={ setBearerToken }>
                { children }
            </setTokenContext.Provider>
        </tokenContext.Provider>           
    );
}

export default UseBearerToken;
