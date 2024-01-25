import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { useEffect, useState } from "react";
import { getClientes } from '../server/server';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { CircleRounded } from '@mui/icons-material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import '../styles/tablas.css'
import FiltroClientes from './filtroClientes';
import TablaClientesModal from './tablaClientesModal';

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

const TablaClientes = () => {

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

    function removeTime(date){
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const fecha = new Date(date)
        return fecha.toLocaleDateString("en-ES", options)
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
                        <TableCell sx={{ fontWeight: 'bold' }}> CLIENTE </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}> TIPO CONTRATO </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}> FECHA INICIO CONTRATO </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}> FECHA FIN CONTRATO </TableCell>
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
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell>{row.tipoContrato}</TableCell>
                        <TableCell> {`${removeTime(row.fechaInicioContrato)}`} </TableCell>
                        <TableCell> {`${removeTime(row.fechaFinContrato)}`}</TableCell>
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
            </Box>

            <TablaClientesModal 
                open={open} 
                handleClose={handleClose} 
                cliente={cliente} 
                setCliente={setCliente} 
                initialValues={initialValues} 
                setOpen={setOpen}> 
            </TablaClientesModal>
 
        </div>
    );
}

export default TablaClientes;
