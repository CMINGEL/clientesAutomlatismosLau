import React, { useEffect } from 'react';
import TablaClientes from '../components/tablaClientes';
import Membrete from '../components/membrete';
import { useSetEjecutivosContext, useSetErrorEjecutivosContext, useSetLoadingEjecutivos } from '../components/providers/useEjecutivos';
import { getejecutivos } from '../server/server';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
const setEjecutivos2 = useSetEjecutivosContext()
const setErrorEjecutivos = useSetErrorEjecutivosContext()
const setLoadingEjecutivos = useSetLoadingEjecutivos()
const localToken = localStorage.getItem('Token')  
let navigate = useNavigate();

    useEffect(()=>{
        if (localToken === null){
            navigate('/login');
        }
    },[localToken, navigate])

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
        <div >
            <Membrete/>
            <Box  component="section" sx={{
                width:'80%',
                m: '1%',
                p: 5,
                borderRadius: 2,
                border: '1px solid grey',
                marginTop:'1%',
                marginBottom:'1%',
                margin:'auto'
                }}>
                <TablaClientes/>
                {/* <TablaEjecutivos/> */}
            </Box>
        </div>
    );
}

export default Home;
