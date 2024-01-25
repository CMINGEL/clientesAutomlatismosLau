import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

const TablaServicios = ( {servicios} ) => {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="Tabla Ejecutivos">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 'bold', textAlign:'center'}}> ID </TableCell>
                        <TableCell style={{fontWeight: 'bold', textAlign:'center'}}> Servicio </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
  
                    {servicios.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell style={{textAlign:'center'}}> {row.id} </TableCell>
                            <TableCell style={{textAlign:'center'}}> {row.tipoServicio}</TableCell>
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
