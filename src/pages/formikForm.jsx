import React, { useState } from 'react';
// import { Form } from 'formik';
import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/userSlice';


const valoresIniciales={ 'name':'', 'email':'', 'username':''}

const FormikForm = () => {
    const user = useSelector((state)=> state.user) 
    const [datos, setDatos] = useState(valoresIniciales)

    const dispatch = useDispatch()

    const handleChange = (e)=>{ 
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const registrar = ()=>{
        dispatch(addUser(datos))
        console.log(datos)
    }
    return (
        <Box>

            <Box sx={{display:'flex', flexDirection:'column', width:'200px'}}>
                <label>Name</label>
                
                <TextField name="name" type="text" onChange={handleChange}/>
                <label>Email</label>
                <TextField name="email" type="email" onChange={handleChange}/>
                <label>Username</label>
                <TextField name="username" type="text" onChange={handleChange}/>
                <button onClick={registrar}> Registrar </button>
            </Box>


            <div> Name {user.name} </div>
            <div> Email {user.email} </div>
            <div> Username {user.username} </div>
        </Box>
    );
}

export default FormikForm;
