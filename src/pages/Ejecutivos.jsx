import React, { useEffect } from 'react';
import TablaEjecutivos from '../components/tablaEjecutivos';

import { useSetEjecutivosContext, useSetErrorEjecutivosContext, useSetLoadingEjecutivos } from '../components/providers/useEjecutivos';
import { getejecutivos } from '../server/server';
import Membrete from '../components/membrete';
import { Box } from '@mui/material';

const Ejecutivos = () => {

const setEjecutivos2 = useSetEjecutivosContext()
const setErrorEjecutivos = useSetErrorEjecutivosContext()
const setLoadingEjecutivos = useSetLoadingEjecutivos()


useEffect(()=> {

    setLoadingEjecutivos(true);
    fetch(getejecutivos)
    .then((response) => response.json())
    .then((ejecutivos)=>setEjecutivos2(ejecutivos))
    .catch((error) => {
        console.log(error)
        setErrorEjecutivos(true);
        setEjecutivos2([])
    })
    
    .finally(() => {
        setLoadingEjecutivos(false);
    });

}, [setEjecutivos2, setErrorEjecutivos,setLoadingEjecutivos]);

    return (
        <>
            <Membrete></Membrete>
            <Box
            component="section" sx={{
                    width:'80%',
                    m: '1%',
                    p: 5,
                    borderRadius: 2,
                    border: '1px solid grey',
                    marginTop:'1%',
                    marginBottom:'1%',
                    margin:'auto'
                    }}>
                    
                    <TablaEjecutivos />

            </Box>
        </>        
    );
}

export default Ejecutivos;
