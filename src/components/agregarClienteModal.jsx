import { Box, Button, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';
import { getClientes } from '../server/server';
import { useEjecutivosContext } from './providers/useEjecutivos';
import TransferList from './transferList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import { green, pink,} from '@mui/material/colors';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width:400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const AgregarClienteModal = ({open, handleClose, cliente, setCliente, initialValues, setOpen }) => {
    const [serviciosCliente, setServiciosCliente] = useState([])
    
    const ejecutivos2 = useEjecutivosContext()

    function handleInput (e) {
        const nombre = e.target.name
        const valor = e.target.value
        setCliente({
            ...cliente,
            [nombre]:valor,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        fetch(getClientes, {
            method:'POST',
            body: JSON.stringify({nombre:cliente.nombre, numeroContacto:cliente.numeroContacto, email:cliente.email, tipoContrato:cliente.tipoContrato, 
                fechaFinContrato:cliente.fechaFinContrato, fechaInicioContrato:cliente.fechaInicioContrato, ejecutivoCierre:cliente.ejecutivoCierre, 
                ejecutivoActual:cliente.ejecutivoActual, servicios:serviciosCliente}),
            headers: {
                'Content-Type': 'application/json',
                },
        } )
        .then((response) =>{
            if (response.status===201){
                setCliente(initialValues)
                setOpen(false)
                window.location.reload()
            }else{
                setOpen(false)
                alert('error en el servidor')
            }
        })
    }

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Agregar Cliente Nuevos
            </Typography>
            <Box component="form" noValidate autoComplete='off' sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                <div>
                    <TextField required label="Nombre Cliente" name='nombre' value={cliente.nombre} onChange={handleInput} />
                    <TextField label="Numero Contacto" name='numeroContacto' value={cliente.numeroContacto} onChange={handleInput}/>
                    <TextField label="Email" name='email' onChange={handleInput} value={cliente.email}/>

                    <InputLabel id="tipoContrato">Tipo Contrato</InputLabel>
                    <Select fullWidth label="Tipo de Contrato" name='tipoContrato' onChange={handleInput} value={cliente.tipoContrato} labelId="tipoContrato">
                        <MenuItem value="Subscripcion">Subscripcion</MenuItem>
                        <MenuItem value="Licencia">Licencia</MenuItem>
                        <MenuItem value="Mantencion">Mantencion</MenuItem>
                    </Select>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha inicio contrato" 
                            name="fechaInicioContrato" 
                            onChange={(date)=>{handleInputDate((date), "fechaInicioContrato") }} />

                        <DatePicker 
                            label="Fecha de fin contrato" 
                            name="fechaFinContrato" 
                            onChange={(date)=>{handleInputDate((date), "fechaFinContrato") }} />
                    </LocalizationProvider>

                    <br></br>
                    <InputLabel id="ejecutivoCierre">Ejecutivo de Cierre</InputLabel>
                    <Select fullWidth label="Ejecutivodecierre" name='ejecutivoCierre' onChange={handleInput} value={cliente.ejecutivoCierre} labelId="ejecutivoCierre">
                        <MenuItem value="Seleccionar">Seleccionar</MenuItem>
                        {ejecutivos2.map((row) => (
                            <MenuItem key={row.id} value={row.nombre}> {row.nombre} </MenuItem>
                            ))}
                    </Select>
                    <br></br>
                    <br></br>
                    <InputLabel id="ejecutivoActual">Ejecutivo Actual</InputLabel>
                    <Select fullWidth label="Ejecutivo a Cargo" name="ejecutivoActual" onChange={handleInput} value={cliente.ejecutivoActual} labelId="ejecutivoActual">
                        <MenuItem value="Seleccionar">Seleccionar</MenuItem>
                        {ejecutivos2.filter(ejecutivo => ejecutivo.activo).map((row) => (
                                <MenuItem key={row.nombre} value={row.nombre}> {row.nombre} </MenuItem>
                                ))}
                    </Select>
                </div>
                <Box style={{margin:'10px'}}>
                    <Box component="div" >                                    
                        <h5 style={{textAlign:'center', fontSize:'18px'}}> 
                            Todos los Servicios 
                            <RemoveIcon sx={{fontSize:22, color: pink[500], verticalAlign:"middle"}} /> Servicios cliente 
                            <AddCircleOutlineIcon sx={{fontSize: 22, color: green[500], verticalAlign:"middle"}}/>
                        </h5> 
                    </Box>
                    
                    <TransferList servicios={serviciosCliente} setServicios = {setServiciosCliente}></TransferList> 
                </Box>
                <br></br>
                <Button variant="contained" size ='large' style={{width:'100%',height:'100%' ,justifyItems:'center', alignItems:'center'}} onClick={handleSubmit}> Agregar </Button>
            </Box>
        </Box>
    </Modal>
    );
}

export default AgregarClienteModal;
