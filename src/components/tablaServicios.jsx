import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { serviciosURL } from '../server/server';

const TablaServicios = ( {servicios, setServicios} ) => {

    const handleServiceDelete = (id, name) => {
        if (window.confirm(`Desea eliminar: ${name}?`)){

            fetch(serviciosURL+id+'/', {method: 'DELETE'})
                .then(response => {
                    if (response.status === 202){
                        console.log(`Borrado exitosamente: ${name}`)
                        setServicios(servicios.filter(servicio => servicio.id !== id))                    
                    }else
                    {  console.log(`Servicio no eliminado: ${name}`)}
                }
            )
        }}

    return (
        <div>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="Tabla Ejecutivos">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 'bold', textAlign:'center'}}> ID </TableCell>
                        <TableCell style={{fontWeight: 'bold', textAlign:'center'}}> Servicio </TableCell>
                        {/* <TableCell style={{fontWeight: 'bold', textAlign:'center'}}> Editar </TableCell> */}
                        <TableCell style={{fontWeight: 'bold', textAlign:'center'}}> Eliminar </TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
  
                    {servicios.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell style={{textAlign:'center'}}> {row.id} </TableCell>
                            <TableCell style={{textAlign:'center'}}> {row.tipoServicio}</TableCell>
                            {/* <TableCell style={{textAlign:'center'}}> <EditIcon /> </TableCell> */}
                            <TableCell style={{textAlign:'center'}}> <BackspaceIcon onClick={()=>handleServiceDelete(row.id, row.tipoServicio)} />  </TableCell>
                            
                        </TableRow>))}

                </TableBody>
                </Table>
                {/* <Box component='div' style={{colSpan:'3', margin:'1%'}}>
                    <Pagination count={10} onChange={handlePagination}/>
                </Box> */}
            </TableContainer>
        </div>
    );
}

export default TablaServicios;
