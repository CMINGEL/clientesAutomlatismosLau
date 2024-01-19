import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { login } from '../server/server';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../Validations/loginValidations';
import lau from '../images/lau.gif';
import cpass from '../images/logo-cpass.png'

const initialValues = {
    password: "",
    email: "", 
};

const Login = () => {
    const [user, setUser] = useState(initialValues);
    const [formValidMessage, setFormValidMesssage] = useState(true);
    const [errorForm, setErrorForm] = useState(false);

    
    let navigate = useNavigate();

    const handleInput = (e) =>{
        const nombre = e.target.name
        const valor = e.target.value
        setUser({
            ...user,
            [nombre]:valor,
        })
    } 
    
    const hanleSubmit = async (e) =>{
        setErrorForm(false)
        let formData = {
            email: user.email,
            password: user.password,
        }
        loginSchema.validate(formData)
        .then((responseData)=>{
            fetch(login,{
                method:'POST',
                body: JSON.stringify({
                    email : user.email,
                    password : user.password, 
                }),
                headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    if(response.status===200){
                        return response.json()
                    }else{
                        setFormValidMesssage('Credenciales invalidas')
                        setErrorForm(true)
                    }
                    
                }).then(data => {
                    if(errorForm===false){
                        localStorage.setItem("Token", data.access);
                        navigate('/')
                    } 
                    })              
                .catch((error)=>console.log(error))

        }).catch((err)=> {
            setFormValidMesssage(err.errors)
            setErrorForm(true)
        })
    } 

    return (
        <div>
             <Box style={{display:'flex', justifyContent:'space-around', marginTop:'1%'}}>
                <img src={lau} alt="Lau_IMG" style={{display:'in'}}/>
                <img src={cpass} alt="CPASS_IMG" style={{justifyContent: 'space-around'}}/>
            </Box>
            <Box component="section" sx={{
                width:'30%',
                m: '1%',
                p: 5,
                borderRadius: 2,
                border: '1px solid grey',
                marginTop:'1%',
                margin:'auto'
                }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Iniciar Sesión
                </Typography>
                {/* <Box component="form" noValidate autoComplete='off' sx={{'& .MuiTextField-root': { m: 1, width: '34ch' },}}> */}
                <Box component="form" noValidate autoComplete='off' sx={{ m: 1, p: 1}}>
                    <div>
                        <TextField fullWidth label="Email" name='email'  onChange={handleInput} style={{display:'Block'}} sx={{mt:2}}/>
                        <TextField fullWidth label="Password" name='password' type="password" onChange={handleInput} style={{display:'Block'}} sx={{mt:2}}/>
                    </div>
                    <br></br>
                    <Button fullWidth variant="contained" size ='large' style={{height:'100%', justifyItems:'center', alignItems:'center', marginRight:'5%'}} onClick={hanleSubmit}> Iniciar Sesion </Button>
                    <br></br>
                    {errorForm && <Typography id="form-is-valid" variant="h6" component="h6" style={{color:'red'}}>{formValidMessage}</Typography>}
                </Box>
            </Box>
        </div>
    );
}

export default Login;