import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

const TablaServicios = ( {servicios} ) => {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Tabla Ejecutivos">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 'bold'}}> ID </TableCell>
                        <TableCell style={{fontWeight: 'bold'}}> Servicio </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
  
                    {servicios.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell> {row.id} </TableCell>
                            <TableCell> {row.tipoServicio}</TableCell>
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
