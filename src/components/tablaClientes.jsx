import React from 'react';
import { Box, Button, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Pagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { useEffect, useState } from "react";
import { getClientes } from '../server/server';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useEjecutivosContext } from './providers/useEjecutivos';
import { jwtDecode } from "jwt-decode";
import { CircleRounded } from '@mui/icons-material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import '../styles/tablas.css'
import FiltroClientes from './filtroClientes';

const initialValues = {
    nombre: "",
    numeroContacto: "",
    email: "",
    tipoContrato: "Subscripcion",
    fechaFinContrato: "Seleccionar" ,
    fechaInicioContrato: "Seleccionar",
    ejecutivoCierre: "Seleccionar",
    ejecutivoActual: "Seleccionar"
};

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

const TablaClientes = () => {

    const ejecutivos2 = useEjecutivosContext()
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cliente, setCliente] = useState(initialValues);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [open, setOpen] = useState(false);
    const [paginationClientes, SetPaginationClientes] = useState([]);
    const [openDocuments, setopenDocuments] = useState(false);
    const [verFiltros, setVerfiltros] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    let navigate = useNavigate();
    let superUser = ''

    if (localStorage.getItem('Token')){
        superUser = jwtDecode(localStorage.getItem('Token')).is_superuser;
    }

    useEffect(()=> {
        setLoading(true)
        fetch(getClientes)
            .then((response) => response.json())
            .then((clientes)=>{
                setClientes(clientes)
                setClientesFiltrados(clientes)
                })
            .catch((error) => setError('true'))
            .finally(() => setLoading(false)
            );
    }, []);

    

    const intPagination = 6
    const numberPagination = Math.ceil(clientesFiltrados.length/intPagination)

    const handlePagination = (e, value) =>{
        const inicial = (value * intPagination) - intPagination
        const final =   (value * intPagination)
        SetPaginationClientes(clientesFiltrados.slice(inicial, final))
    }



    useEffect(()=>{
        SetPaginationClientes(clientesFiltrados.slice(0,intPagination))
    }, [clientesFiltrados])

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

    function removeTime(date){
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const fecha = new Date(date)
        return fecha.toLocaleDateString("en-ES", options)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        fetch(getClientes, {
            method:'POST',
            body: JSON.stringify({nombre:cliente.nombre, numeroContacto:cliente.numeroContacto, email:cliente.email, tipoContrato:cliente.tipoContrato, 
                fechaFinContrato:cliente.fechaFinContrato, fechaInicioContrato:cliente.fechaInicioContrato, ejecutivoCierre:cliente.ejecutivoCierre, 
                ejecutivoActual:cliente.ejecutivoActual, servicio:cliente.servicios}),
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
    const handleEdit = (cliente) =>{
        navigate('/editcliente', { state : {cliente} });
    }

    const nivelAlerta = (fecha2) =>{
        const date = new Date();
        const fechaFinal = new Date(fecha2)
        let dias = (fechaFinal.getTime() - date.getTime()) / (1000*60*60*24)

        if (dias < 30){
            return <CircleRounded style={{color:'red'}} />
        } if (dias >30 && dias < 60){
            return <CircleRounded style={{color:'yellow'}} />
        } else{
            return <CircleRounded style={{color:'green'}} />
        }
    }

    return (
        <div className='tabla'>
            <h1> Tabla Clientes </h1>
            <FiltroClientes verFiltros={verFiltros} setVerfiltros={setVerfiltros} clientes={clientes} setClientesFiltrados={setClientesFiltrados}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Tabla Clientes">
                <TableHead>

                    <TableRow className='table-row'>
                        {/* <TableCell sx={{ fontWeight: 'bold' }}> ID </TableCell> */}
                        <TableCell sx={{ fontWeight: 'bold' }}> CLIENTE </TableCell>
                        {/* <TableCell sx={{ fontWeight: 'bold' }}> CONTACTO </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}> MAIL </TableCell> */}
                        <TableCell sx={{ fontWeight: 'bold' }}> TIPO CONTRATO </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}> FECHA INICIO CONTRATO </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}> FECHA FIN CONTRATO </TableCell>
                        {/* <TableCell sx={{ fontWeight: 'bold' }}> EJECUTIVO CIERRE </TableCell> */}
                        <TableCell sx={{ fontWeight: 'bold' }}> EJECUTIVO A CARGO </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}> ALERTA </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}> DOCUMENTOS </TableCell>
                        {superUser && <TableCell> EDIT </TableCell>} 
                    </TableRow>
                </TableHead>
                <TableBody>

                    {loading && <TableRow><TableCell  colSpan="12"> Loading... </TableCell></TableRow>}
                    {error && <TableRow><TableCell  colSpan="13"> Error conexion con el servidor </TableCell></TableRow>}

                    {paginationClientes.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {/* <TableCell> {row.id} </TableCell> */}
                        <TableCell>{row.nombre}</TableCell>
                        {/* <TableCell>{row.numeroContacto}</TableCell>
                        <TableCell>{row.email}</TableCell> */}
                        <TableCell>{row.tipoContrato}</TableCell>
                        <TableCell> {`${removeTime(row.fechaInicioContrato)}`} </TableCell>
                        <TableCell> {`${removeTime(row.fechaFinContrato)}`}</TableCell>
                        {/* <TableCell>{row.ejecutivoCierre}</TableCell> */}
                        <TableCell>{row.ejecutivoActual}</TableCell>
                        <TableCell>{nivelAlerta(row.fechaFinContrato)}</TableCell>
                        <TableCell style={{position:'relative', textAlign:'center'}}> <FolderOpenIcon onClick={()=>(setopenDocuments(true))}></FolderOpenIcon>  
                        
                            <Dialog
                                open={openDocuments}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Documentos en en el sistema:"}
                                </DialogTitle>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <WorkIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Work" secondary="Jan 7, 2014" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <BeachAccessIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                    </ListItem>
                                </List>

                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Hoja recepcion xyz fecha 20/12/2023 
                                        Priyecto xyz fecha 20/12/2023 

                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={()=>(setopenDocuments(false))}>Agregar Nuevo</Button>
                                    <Button onClick={()=>(setopenDocuments(false))} autoFocus> Cerrar </Button>
                                </DialogActions> 
                            </Dialog>
                        
                        </TableCell>
                        {superUser && <TableCell><EditIcon onClick={()=>handleEdit(row)}> </EditIcon></TableCell>}
                    </TableRow>   ))}
                </TableBody>
                </Table>
                <Box component='div' style={{colSpan:'3', margin:'1%'}}>
                    <Pagination count={numberPagination} onChange={handlePagination} />
                </Box>
            </TableContainer>
            <Box component='div' className='buttonContainer'>
                <Button variant="contained" onClick={handleOpen} className='buttonAdd' sx={{height:'48px'}}>Agregar Cliente</Button>
                <Button onClick={()=>navigate('/agregarServicio')} sx={{height:'48px'}}> Agregar Servicio </Button> 
            </Box>

            

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agregar Cliente Nuevo
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
                        <br></br>
                        <Button variant="contained" size ='large' style={{width:'100%',height:'100%' ,justifyItems:'center', alignItems:'center'}} onClick={handleSubmit}> Agregar </Button>
                    </Box>
                </Box>
            </Modal>

        </div>
    );
}

export default TablaClientes;
