import React, {useState, useContext, createContext } from 'react';

const ejecutivosContext = createContext();
const setEjecutivos = createContext();
const ErrorEjecutivosContext = createContext();
const setErrorEjecutivosContext = createContext();
const setLoadingEjecutivos = createContext();
const LoadingEjecutivos = createContext();


export function useEjecutivosContext(){
    return useContext(ejecutivosContext)
}

export function useSetEjecutivosContext(){
    return useContext(setEjecutivos)
}

export function useErrorEjecutivosContext(){
    return useContext(ErrorEjecutivosContext)
}

export function useSetErrorEjecutivosContext(){
    return useContext(setErrorEjecutivosContext)
}

export function useSetLoadingEjecutivos(){
    return useContext(setLoadingEjecutivos)
}

export function useLoadingEjecutivos(){
    return useContext(LoadingEjecutivos)
}

const UseEjecutivos = ({ children }) => {
    const [ejecutivos2, setEjecutivos2] = useState([])
    const [errorEjecutivos, setErrorEjecutivos]=useState(false)
    const [cargandoEjecutivos, setCargandoEjecutivos]= useState(false)

    return (
        <LoadingEjecutivos.Provider value = {cargandoEjecutivos}>
            <setLoadingEjecutivos.Provider value = {setCargandoEjecutivos}>
                <setErrorEjecutivosContext.Provider value={setErrorEjecutivos}>
                    <ErrorEjecutivosContext.Provider value={errorEjecutivos}>
                        <ejecutivosContext.Provider value = {ejecutivos2}>
                            <setEjecutivos.Provider value={ setEjecutivos2 }>
                                { children }
                            </setEjecutivos.Provider>
                        </ejecutivosContext.Provider>   
                    </ErrorEjecutivosContext.Provider>
                </setErrorEjecutivosContext.Provider>
            </setLoadingEjecutivos.Provider>
        </LoadingEjecutivos.Provider>
    );
}

export default UseEjecutivos;

