import { CircleRounded } from '@mui/icons-material';
import { Box, MenuItem, Paper, Select, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';



const FiltroClientes = ({verFiltros, setVerfiltros, clientes, setClientesFiltrados}) => {
    const [filtroTipoAlerta, setFiltroTipoAlerta] = useState('todos');
    const [filtroTipoContrato, setFiltroTipoContrato] = useState('Tipo de Contrato');

    function handleFilterEstate(){
        setVerfiltros(!verFiltros)
    }

    const handleModFilter = (event) => {
        const filtered = clientes.filter(cliente => cliente.tipoContrato.includes(event.target.value));
        if(event.target.value==='Tipo de Contrato'){
            setClientesFiltrados(clientes);
            setFiltroTipoContrato(event.target.value)
        }else{
            setClientesFiltrados(filtered);
            setFiltroTipoContrato(event.target.value)
        }
    }

    const handleFilterName = (event) =>{
        // console.log(event.target.value)
        // console.log(event.target.name)
        const filtered = clientes.filter(cliente => substring(cliente.nombre,event.target.value) !== -1);
        setClientesFiltrados(filtered)
    }

    function substring(clienteName, substring){
        clienteName=clienteName.toLowerCase()
        substring=substring.toLowerCase()
        return clienteName.indexOf(substring)
    }

    const handleFilterAlerta = (event) =>{

        setFiltroTipoAlerta(event.target.value)

        if(event.target.value === 'desistido'){
            const filtered = clientes.filter(cliente => ( cliente.desistido === true ));
            setClientesFiltrados(filtered)
        }

        else if(event.target.value==='rojo'){
            let filtered = clientes.filter(cliente => ( nivelAlerta(cliente.fechaFinContrato) ==='rojo' ));
            filtered = filtered.filter(cliente => cliente.desistido === false)
            setClientesFiltrados(filtered)
        }
        else if(event.target.value==='amarillo'){
            let filtered = clientes.filter(cliente => ( nivelAlerta(cliente.fechaFinContrato) ==='amarillo' ));
            filtered = filtered.filter(cliente => cliente.desistido === false)
            setClientesFiltrados(filtered)
        }
        else if(event.target.value==='verde'){
            let filtered = clientes.filter(cliente => ( nivelAlerta(cliente.fechaFinContrato) ==='verde' ));
            filtered = filtered.filter(cliente => cliente.desistido === false)
            setClientesFiltrados(filtered)
        }


        else if(event.target.value==='todos'){
            setClientesFiltrados(clientes)
        }
        
    }

    const nivelAlerta = (fecha2) =>{
        const date = new Date();
        const fechaFinal = new Date(fecha2)
        let dias = (fechaFinal.getTime() - date.getTime()) / (1000*60*60*24)

        if (dias <= 0){
            return 'rojo' 
        } if (dias >1 && dias < 60){
            return 'amarillo'
        } else{
            return 'verde'
        }
    }


    return (
        <>
            {verFiltros ?
                <>
                    <TableContainer component={Paper} sx={{width:'600px', margin:'auto', float:'right', mb:'20px'}}>
                        <Table>
                            <TableHead>
                                <TableRow className='table-row'>
                                    <TableCell> <TextField label="Nombre" name="nombre" right={<SearchIcon></SearchIcon>} left={<SearchIcon/>} inputProps={{style:{height:'15px'}}} onChange={handleFilterName}> </TextField> </TableCell>
                                    <TableCell> 
                                        <Select label="Tipo Contrato" labelId="Tipo Contrato" id="tipoContrato" value={filtroTipoContrato} sx={{height:'48px'}} onChange={handleModFilter}>
                                            <MenuItem value="Tipo de Contrato">Tipo de Contrato</MenuItem>
                                            <MenuItem value="Subscripcion">Subscripcion</MenuItem>
                                            <MenuItem value="Mantencion">Mantencion</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Select label="Alerta" labelId="Alerta" id="Alerta" value={filtroTipoAlerta} sx={{height:'48px'}} onChange={handleFilterAlerta}>
                                            <MenuItem value="todos">Tipo de Alerta</MenuItem>
                                            <MenuItem value="rojo"> <CircleRounded style={{color:'red'}} /> </MenuItem>
                                            <MenuItem value="amarillo"> <CircleRounded style={{color:'yellow'}} /> </MenuItem>
                                            <MenuItem value="verde"><CircleRounded style={{color:'green'}} /> </MenuItem>
                                            <MenuItem value = "desistido"> <CloseIcon style={{color:'red'}}/> </MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell >
                                        <FilterListIcon onClick={handleFilterEstate} style={{float:'right', marginRight:'4px', cursor: "pointer" }}/>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </> :
                    <Box component={"div"} >   
                        <FilterListIcon onClick={handleFilterEstate} style={{float:'right', padding:'20px', marginTop:'8px'}}/>
                    </Box>
                }
        </>
    );
}

export default FiltroClientes;

