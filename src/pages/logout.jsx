import React from 'react';
import Membrete from '../components/membrete'
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    let navigate = useNavigate();
    localStorage.removeItem("Token")
    
    return (
        <div>
            <Membrete></Membrete>
            <Box component="div" sx={{
                width:'30%',
                m: '1%',
                p: 5,
                borderRadius: 2,
                border: '1px solid grey',
                marginTop:'1%',
                margin:'auto',
                display:'flex',
                flexDirection:'column',
                justifyItems:'center',
                alignItems:'center'
                }}>
                <Typography variant="h6" style={{display:'block'}}>
                    Sesion Cerrada
                </Typography>
                <br></br>
                <br></br>
                <Button variant="contained" size ='large' 
                    style={{ width:'48%',height:'100%', }} 
                    onClick={()=>{navigate('/login')}}> Iniciar Sesion </Button>
            </Box>
        </div>
    );
}

export default Logout;
