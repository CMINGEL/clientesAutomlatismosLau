import React, { useEffect, useState } from 'react';
import Membrete from '../components/membrete';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { serviciosURL } from '../server/server';
import TablaServicios from '../components/tablaServicios';

const Servicios = () => {

    const [servicio, setServicio] = useState("");
    const [servicios, setServicios] = useState([]);
    let navigate = useNavigate();

    const handlePost = (e) => {
        e.preventDefault();
        if (servicio.length<3){
            alert("Servicio debe contener informacion")
        }
        else{
            fetch(serviciosURL, {
                method:'POST',
                body: JSON.stringify({"tipoServicio":servicio}),
                headers: { "Content-Type": "application/json"}})
                    .then((response) =>{
                    if (response.status===201){
                        window.location.reload()
                    }
                    else if (response.status===400){
                        alert('No se permiten item repetidos')
                    }else{
                        alert('Error de conexión servidor')
                    }
                })
                .then((data) => {console.log('actualizado')})
                .catch((error) => console.log(error));
        }
    }

    useEffect(()=> {
        fetch(serviciosURL)
        .then((response) => response.json())
        .then((servicios)=>{
            setServicios(servicios)
            
        })
        .catch((error) => console.log(error));
    }, []);

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
                    Agregar o Editar Servicios
                </Typography>
   
                <Box component="form" noValidate autoComplete='off' sx={{ m: 1, p: 1}}>
                    <div>
                        <TextField fullWidth required label="Servicio" name='email' style={{display:'Block'}} sx={{mt:2}} onChange={e => setServicio(e.target.value)}/>
                        <InputLabel id="TipodeServicio" >Tipo de Servicio</InputLabel>
                    </div>
                    
                    <br></br>

                    <Button variant="contained" size ='large' style={{ width:'48%',height:'100%' ,justifyItems:'center', alignItems:'center', marginRight:'5%', marginTop:'3%'}} onClick={handlePost}> Guardar </Button>
                    <Button variant="contained" size= "large" color="error" style={{ width:'47%',height:'100%', justifyItems:'center', alignItems:'center', marginTop:'3%'}} onClick={()=>{navigate('/')}}>Volver</Button>
                </Box>
                    <TablaServicios servicios = {servicios} />
            </Box>
        </div>
    );
}

export default Servicios;
