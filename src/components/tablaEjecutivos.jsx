import React, { useEffect } from 'react';
import { Box, Button, Modal, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { useState } from "react";
import { getejecutivos } from '../server/server';
import { useEjecutivosContext, useErrorEjecutivosContext, useLoadingEjecutivos } from './providers/useEjecutivos';

import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const TablaEjecutivos = () => {

    const loadingEjecutivos = useLoadingEjecutivos();
    const errorEjecutivos = useErrorEjecutivosContext();
    const ejecutivos2 = useEjecutivosContext();

    const [nombre, setNombre] = useState('');
    const [open, setOpen] = React.useState(false);
    const [paginationEjecutivos, SetPaginationEjecutivos] = React.useState([]);

    const intPagination = 6
    const numberPagination = Math.ceil(ejecutivos2.length/intPagination)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let navigate = useNavigate();
    let superUser = ''


    useEffect(()=>{
        SetPaginationEjecutivos(ejecutivos2.slice(0,intPagination))
    },[ejecutivos2]) 

    if (localStorage.getItem('Token')){
        superUser = jwtDecode(localStorage.getItem('Token')).is_superuser;
    }

    const handlePagination = (e, value) =>{
        const inicial = (value * intPagination) - intPagination
        const final =   (value * intPagination)
        SetPaginationEjecutivos(ejecutivos2.slice(inicial, final))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(getejecutivos, {
            method:'POST',
            body: JSON.stringify({nombre:nombre, activo:true}),
            headers: { "Content-Type": "application/json"}})
            .then((response) =>{
                if (response.status===201){
                    setNombre('')
                    setOpen(false)
                    window.location.reload()
                }else{
                    setOpen(false)
                    alert('Error de conexión servidor')
                }
            })
            .then((data) => {console.log(data)})
            .catch((error) => console.log(error));
      }

    const hanleEdit = (ejecutivo) =>{
        const BearerToken = localStorage.getItem('Token')

        if(superUser){
            fetch(getejecutivos+`${ejecutivo.id}/`, {
                method:'PATCH',
                body: JSON.stringify({activo:!ejecutivo.activo}),
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + BearerToken
                },
            } )
            .then((response) =>{
                console.log(response.status)
                if (response.status===202){
                    setNombre('')
                    setOpen(false)
                    window.location.reload()
                }if(response.status===401){
                    navigate('/logout')
                    setOpen(false)
                    alert('Token expirado')
                }
            })
            .then((data) => {console.log(data)});
        }        
      }

    return (
        // <div style={{position:'relative', marginTop:'2%', marginLeft:'7%', marginRight:'7%'}}>
        <div className='tabla'>
            <h1> Tabla Ejecutivos </h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Tabla Ejecutivos">
                <TableHead>
                    <TableRow>
                        <TableCell> ID </TableCell>
                        <TableCell> Nombre </TableCell>
                        <TableCell> Estado </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loadingEjecutivos && <TableRow><TableCell  colSpan="13"> Loading Ejecutivos </TableCell></TableRow>}
                    {errorEjecutivos && <TableRow><TableCell  colSpan="13"> Error conexion con el servidor </TableCell></TableRow>}
                    {paginationEjecutivos.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell> {row.id} </TableCell>
                        <TableCell> {row.nombre}</TableCell>
                        <TableCell style={{cursor: "pointer",}} onClick={()=>hanleEdit(row)}> {row.activo? <CircleRoundedIcon style={{color:'green'}}/>: <CircleRoundedIcon style={{color:'red'}}/> }</TableCell>
                    </TableRow>))}
                </TableBody>
                </Table>
                <Box component='div' style={{colSpan:'3', margin:'1%'}}>
                    <Pagination count={numberPagination} onChange={handlePagination}/>
                </Box>
            </TableContainer>
            <Box component='div' className='buttonContainer' style={{ display:'inline'}}>
                    {superUser && 
                        <Button  
                            variant="contained" onClick={handleOpen} 
                            style={{ width:'33%',justifyItems:'center', alignItems:'center', marginRight:'5%', marginTop:'3%'}}
                            sx={{height:'40px'}}
                            >
                            
                            Agregar Ejecutivo
                        </Button>}   
                    
                    {superUser && 
                        <Button 
                            variant="contained" color="error" onClick={()=>{navigate('/')}}
                            style={{ width:'33%', justifyItems:'center', alignItems:'center', marginRight:'5%', marginTop:'3%'}}
                            sx={{height:'40px'}}
                            > Volver
                    </Button>}
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agregar Ejecutivo
                    </Typography>
                    <Box style={{display:'grid'}}>
                        <TextField  size="small" style={{width:'100%'}} onChange={e => setNombre(e.target.value)} ></TextField>
                        <br></br>
                        
                    <Button variant="contained" size= "large" color="error" style={{ width:'47%',height:'100%', justifyItems:'center', alignItems:'center', marginTop:'3%'}} onClick={()=>{navigate('/')}}>
                        Volver
                    </Button>
                    
                    <Button variant="contained" size = 'large' className='ejecutivoTablaModalButton' onClick={handleSubmit}> Agregar </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default TablaEjecutivos;
