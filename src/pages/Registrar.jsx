import React, { useState } from 'react';
import Membrete from '../components/membrete'
import { useNavigate } from 'react-router-dom';
import { Backdrop, Box, Button, CircularProgress, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { registrar } from '../server/server';
import { registerSchema } from '../Validations/registerValidations';



const initialValues = {
    name: "",
    password: "",
    email: "",
    is_superuser: "false"
};

const Registrar = () => {

    const [user, setUser] = useState(initialValues);
    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState('');
    const [open, setOpen] = React.useState(false);
    // const [serviciosCliente, setServiciosCliente] = useState([])  

    const handleInput = (e) =>{
        const nombre = e.target.name
        const valor = e.target.value
        setUser({
            ...user,
            [nombre]:valor,
        })
    } 

    const hanleSubmit = (e) =>{
        
        let formData = {
            name: user.name,
            email: user.email,
            password: user.password,
            is_superuser: user.is_superuser
        }
    
        registerSchema.validate(formData)
        .then((responseData) => {
            fetch(registrar,{
                method:'POST',
                body: JSON.stringify({
                    name : user.name,
                    email : user.email,
                    password : user.password, 
                    is_superuser : user.is_superuser
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
            })})
        .catch((err)=>{
            setMsgError(err.errors);
            setError(true)
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
                    Nuevo usuario al sistema
                </Typography>
   
                <Box component="form" noValidate autoComplete='off' sx={{ m: 1, p: 1}}>
                    <div>
                        <TextField fullWidth required label="Nombre" name='name'  onChange={handleInput} style={{display:'Block'}} sx={{mt:2}}/>
                        <TextField fullWidth required label="Email" name='email'  onChange={handleInput} style={{display:'Block'}} sx={{mt:2}}/>
                        <TextField fullWidth required label="Password" name='password' type="password" onChange={handleInput} style={{display:'Block'}} sx={{mt:2}}/>
                        <InputLabel id="tipoUsuario">Tipo de Usuario</InputLabel>

                        <Select fullWidth label="Rol de nuevo usuario" name='is_superuser' onChange={handleInput} value={user.is_superuser} labelId="tipoUsuario" sx={{mt:1, height:'55px'}}>
                            <MenuItem value="true">Administrador</MenuItem>
                            <MenuItem value="false">Usuario</MenuItem>
                        </Select>

                    </div>
                    <br></br>
                    <Button variant="contained" size ='large' style={{ width:'48%',height:'100%' ,justifyItems:'center', alignItems:'center', marginRight:'5%', marginTop:'3%'}} onClick={hanleSubmit}> Guardar </Button>
                    <Button variant="contained" size= "large" color="error" style={{ width:'47%',height:'100%', justifyItems:'center', alignItems:'center', marginTop:'3%'}} onClick={()=>{navigate('/')}}>Volver</Button>
                    {error && <Typography id="form-is-valid" variant="h6" component="h6" style={{color:'red', marginTop:'3%'}}>{msgError}</Typography>}
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