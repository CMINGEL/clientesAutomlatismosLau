import { Box, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import lau from '../images/lau.gif';
import cpass from '../images/logo-cpass.png'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, } from '@mui/material/';
import Typography from '@mui/material/Typography';

import SettingsIcon from '@mui/icons-material/Settings';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
  
const Membrete = () => {

    let navigate = useNavigate();
    const [bearerToken, setBearerToken] = useState('')

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const localToken = localStorage.getItem('Token')
    const tab = '\u00A0';
    let superUser = ''
    let name = ''

    
    const handleClickSettings = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleCloseSettings = () => {
        setAnchorEl(null);
      };

    const handleClickAgregarServicio = () => {
        setAnchorEl(null);
        navigate('/agregarServicio')
      };

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
                        </Typography>
                        
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                startIcon={<SettingsIcon sx={{color:'white'}}/>}
                                onClick={handleClickSettings}>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleCloseSettings}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}>

                                <MenuItem onClick={handleClickAgregarServicio}> Añadir Servicios {tab}  <ListIcon sx={{color:'blue'}} />         </MenuItem>
                                <MenuItem onClick={()=> navigate('/ejecutivos')}>Ver Ejecutivos {tab} {tab} {tab}<PeopleIcon sx={{color:'blue'}}/>   </MenuItem>
                                {superUser && <MenuItem onClick={()=> navigate('/registrar')}>Nuevo Usuario {tab} {tab}{tab}<PersonAddIcon sx={{color:'blue'}}/>    </MenuItem>}

                            </Menu>
                        </div>
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
