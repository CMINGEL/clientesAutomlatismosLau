import React, { useEffect, useState } from 'react';
import Membrete from '../components/membrete';
import { Box, Button, Fab, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { getArchivos, descargaArchivos } from '../server/server';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link } from 'react-router-dom';


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

const Archivos = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [archivos, setArchivos] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(()=> {
        setLoading(true)
        fetch(getArchivos+'3/')
        .then((response) => response.json())
        .then((archivos)=>{
            setArchivos(archivos)
        })
        .catch((error) => setError('true'))
        .finally(() => setLoading(false)
        );
    }, []);

    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0])
    } 

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        // axios.post('/api/upload', formData)
        //   .then((response) => {
        //     console.log(response.data);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });

      };

    return (
        <div>
            <Membrete></Membrete>
            <Box  component="section" sx={{
                width:'80%',
                m: '1%',
                p: 5,
                borderRadius: 2,
                border: '1px solid grey',
                marginTop:'1%',
                marginBottom:'1%',
                margin:'auto'
                }}>
                

                <Box>
                    {archivos.map((archivo) => (
                        <Link to={descargaArchivos + archivo.image_content} key={archivo.id}> <InsertDriveFileIcon/> {archivo.image_content}</Link>
                    ))}
                </Box>
                <Box>
                    <Fab color="primary" aria-label="add">
                    <AddIcon onClick={()=>setOpen(true)}/>
                    </Fab>
                    <Fab color="secondary" aria-label="edit">
                    <EditIcon />
                    </Fab>
                </Box>
            </Box>


            <Modal
                open={open}
                // onClick={()=>setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agregar nuevo archivo
                    </Typography>

                    <Box component="form" noValidate autoComplete='off' sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                        <input type='file' onChange={handleFileUpload}/>
                        <Button variant="contained" size ='large' style={{width:'100%',height:'100%' ,justifyItems:'center', alignItems:'center'}} onClick={handleUpload} > Agregar Archivo</Button>
                    </Box>
                </Box>
            </Modal>

            
        </div>
    );
}

export default Archivos;
