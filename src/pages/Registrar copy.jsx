import React, { useState } from 'react';
import Membrete from '../components/membrete'
import { useNavigate } from 'react-router-dom';
import { Backdrop, Box, Button, CircularProgress, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { registrar } from '../server/server';


const initialValues = {
    name: "",
    password: "",
    email: "",
    is_superadmin: "false"
};

const Registrar = () => {

    const [user, setUser] = useState(initialValues);
    // const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleInput = (e) =>{
        const nombre = e.target.name
        const valor = e.target.value
        setUser({
            ...user,
            [nombre]:valor,
        })
    } 
    
    const hanleSubmit = (e) =>{
        setOpen(true)
        fetch(registrar,{
            method:'POST',
            body: JSON.stringify({
                name : user.name,
                email : user.email,
                password : user.password, 
                is_superadmin : user.is_superadmin
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(function(response){
            if(response.status===200){
                console.log("Usuario Creado")
            }else{
                alert("error enviando la solicitud")
            }
        })
        .finally(function(){
            setOpen(false);
            setUser(initialValues);
            alert("Usuario creado exitosamente")
            navigate('/')
        })
    } 
    
    const handleClose = () => {
        setOpen(false);
    };
    let navigate = useNavigate();

    return (
        <div>
            <Membrete></Membrete>
            <Box component="section" sx={{
                width:'50%',
                m: '1%',
                p: 5,
                borderRadius: 2,
                border: '1px solid grey',
                marginTop:'1%',
                margin:'auto'
                }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Editar cliente
                </Typography>
   
                <Box component="form" noValidate autoComplete='off' sx={{ m: 1, p: 1}}>
                    <div>
                        <TextField fullWidth required label="Nombre" name='name'  onChange={handleInput} style={{display:'Block'}} sx={{pt:2}}/>
                        <TextField fullWidth required label="Email" name='email'  onChange={handleInput} style={{display:'Block'}} sx={{pt:2}}/>
                        <TextField fullWidth required label="Password" name='password' type="password" onChange={handleInput} style={{display:'Block'}} sx={{pt:2}}/>
                        <InputLabel id="tipoUsuario">Tipo de Usuario</InputLabel>

                        <Select fullWidth label="Rol de nuevo usuario" name='is_superadmin' onChange={handleInput} value={user.is_superadmin} labelId="tipoUsuario" sx={{pt:1, height:'55px'}}>
                            <MenuItem value="true">Administrador</MenuItem>
                            <MenuItem value="false">Usuario</MenuItem>
                        </Select>

                    </div>
                    <br></br>
                    <Button variant="contained" size ='large' style={{ width:'48%',height:'100%' ,justifyItems:'center', alignItems:'center', marginRight:'5%'}} onClick={hanleSubmit}> Guardar </Button>
                    <Button variant="contained" size= "large" color="error" style={{ width:'47%',height:'100%', justifyItems:'center', alignItems:'center'}} onClick={()=>{navigate('/')}}>Volver</Button>
                </Box>
            </Box>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}>

                    <CircularProgress color="inherit" />
                </Backdrop>
        </div>
    );
}

export default Registrar;