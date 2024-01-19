import React, { useEffect, useState } from 'react';
import { getClientes} from '../server/server';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Membrete from '../components/membrete'
import { useEjecutivosContext } from '../components/providers/useEjecutivos';
import TransferList from '../components/transferList';

const EditCliente = () => {
    let navigate = useNavigate();
    const ejecutivos = useEjecutivosContext() 
    const location = useLocation();

    const initialValues = {
        id: location.state.cliente.id,
        nombre: location.state.cliente.nombre,
        numeroContacto: location.state.cliente.numeroContacto,
        email: location.state.cliente.email,
        tipoContrato: location.state.cliente.tipoContrato,
        servicios: location.state.cliente.servicios,
        fechaFinContrato: location.state.cliente.fechaFinContrato ,
        fechaInicioContrato: location.state.cliente.fechaInicioContrato,
        ejecutivoCierre: location.state.cliente.ejecutivoCierre,
        ejecutivoActual: location.state.cliente.ejecutivoActual
    };
    
    const fechaFinContrato = (initialValues.fechaFinContrato.slice(0,10))
    const [cliente, setCliente] = useState(initialValues);
    const [recarga, setRecarga] = useState(false);
    

    useEffect(()=>{
        if(ejecutivos.length<1){
            setRecarga(false)
            navigate('/')
        }else{
            setRecarga(true)
        }
    }, [ejecutivos, navigate, location.state.cliente]);

    function handleInput (e) {
        const nombre = e.target.name
        const valor = e.target.value
        setCliente({
            ...cliente,
            
            [nombre]: [valor]
        })
    }

    function handleInputDate (e, nombre) {
        let mes = (parseInt(e['$M']) + 1).toString().padStart(2, '0')
        let dia = e['$D'].toString().padStart(2, '0')
        let formated = e['$y'] + '-' + mes + '-' + dia
        
        setCliente({
            ...cliente,
            [nombre] : formated,
         })
    }
    const hanleSubmit = () =>{
        const BearerToken = localStorage.getItem('Token')
       
        fetch(getClientes+`${cliente.id}/`, {
            method:'PATCH',
            body: JSON.stringify(
                {numeroContacto:cliente.numeroContacto, email:cliente.email, tipoContrato:cliente.tipoContrato, 
                    fechaFinContrato:cliente.fechaFinContrato, ejecutivoCierre:cliente.ejecutivoCierre, 
                    ejecutivoActual:cliente.ejecutivoActual, servicio:cliente.servicio
                }),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + BearerToken  
            },
        } )
        .then((response) =>{
            console.log(response.status)
            if (response.status===202){
                navigate('/');
            }
            if(response.status===401){
            navigate('/logout')
            alert('Token expirado')
            }
        })
        // .then((data) => {console.log(data)});
      }

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
                <Box component="form" noValidate autoComplete='off' sx={{m: 1, p: 1}}>
                    <div>
                        <TextField fullWidth disabled label="Nombre Cliente" name='nombre' value={cliente.nombre} onChange={handleInput} style={{ display :'Block'}} sx={{pt:2}}/>
                        <TextField fullWidth label="Numero Contacto" name='numeroContacto' value={cliente.numeroContacto} onChange={handleInput} style={{ display :'Block'}} sx={{pt:2}}/>
                        <TextField fullWidth label="Email" name='email' onChange={handleInput} value={cliente.email} style={{ display :'Block'}} sx={{pt:2}}/>
                        <InputLabel  id="tipoContrato">Tipo Contrato</InputLabel>
                        <Select fullWidth label="Tipo de Contrato" name='tipoContrato' onChange={handleInput} value={cliente.tipoContrato} labelId="tipoContrato">
                            <MenuItem value="Subscripcion">Subscripcion</MenuItem>
                            <MenuItem value="Licencia">Licencia</MenuItem>
                            <MenuItem value="Mantencion">Mantencion</MenuItem>
                        </Select> 
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <InputLabel  id="FinContrato" style={{marginTop:'2px'}}>Fecha Fin Contrato</InputLabel>
                            <DatePicker  
                                defaultValue={dayjs(fechaFinContrato)}
                                name="fechaFinContrato" 
                                labelId="FinContrato"
                                slotProps={{ textField: { fullWidth: true } }}
                                onChange={(date)=>{handleInputDate((date), "fechaFinContrato") }} />
                        </LocalizationProvider> 

                        <InputLabel id="ejecutivoActual" value={cliente.ejecutivoActual}>Ejecutivo Actual</InputLabel>
                        {recarga ? <Select fullWidth label="Ejecutivo a Cargo" name="ejecutivoActual" onChange={handleInput} value={cliente.ejecutivoActual} labelId="ejecutivoActual">
                            <MenuItem value="Seleccionar">Seleccionar</MenuItem>
                            {ejecutivos.filter(ejecutivo => ejecutivo.activo).map((row) => (
                                    <MenuItem key={row.nombre} value={row.nombre}> {row.nombre} </MenuItem>
                                    ))}
                            </Select> : <Select fullWidth label="Ejecutivo a Cargo" name="ejecutivoActual" value={'Seleccionar'} labelId="ejecutivoActual">
                                <MenuItem value="Seleccionar">Seleccionar</MenuItem> 
                            </Select>}
                            <Box style={{margin:'10px'}}>
                                <TransferList servicios={cliente.servicios}></TransferList>
                            </Box>
                            
                    </div>

                    <br></br>
                    <Button variant="contained" size ='large' style={{ width:'47%',height:'100%', justifyItems:'center', alignItems:'center', marginRight:'6%'}} onClick={hanleSubmit}> Guardar </Button>
                    <Button variant="contained" size= "large" color="error" style={{ width:'47%', height:'100%', justifyItems:'center', alignItems:'center'}} onClick={()=>{navigate('/')}}>Volver</Button>
                    
                </Box>
            </Box>
            
        </div>
    );
}

export default EditCliente;
