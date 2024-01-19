import { Box } from '@mui/material';
import React, { useState } from 'react';
import lau from '../images/lau.gif';
import cpass from '../images/logo-cpass.png'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
  
const Membrete = () => {
    let navigate = useNavigate();
    const [bearerToken, setBearerToken] = useState('')
    const localToken = localStorage.getItem('Token')
    const tab = '\u00A0';
    let superUser = ''
    let name = ''
    
    useState(()=>{
        if (localToken != null){
            setBearerToken(localToken)
        }
    },[])

    if (bearerToken){
        superUser = jwtDecode(bearerToken).is_superuser;
        name = jwtDecode(bearerToken).name
    }
 
    return (
        <div>
            <Box sx={{ display:'flex' }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu"  onClick={()=>{navigate('/')}}>
                            <HomeOutlinedIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            Bienvenido: {name} {tab}
                        </Typography>
                        
                        <Typography variant="h6" color="inherit" component="div" style={{marginLeft: 'auto'}}>
                            {bearerToken.length > 0 ? 
                                <Link to="/logout/" color="inherit" style={{color:'white', textDecoration: 'none'}}>Logout</Link> : 
                                <Link to="/login/" color="inherit" style={{color:'white', textDecoration: 'none'}}>Login</Link> }                            
                            {superUser && <Link to="/registrar/" color="inherit" style={{color:'white', textDecoration: 'none'}}>/Registrar</Link>} 
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box style={{display:'flex', justifyContent:'space-around', marginTop:'1%'}}>
                <img src={lau} alt="Lau_IMG" style={{display:'in', height:'70px', width:'150px'}}/>
                <img src={cpass} alt="CPASS_IMG" style={{justifyContent: 'space-around', height:'70px', width:'150px'}}/>
            </Box>
        </div>
    );
}

export default Membrete;
