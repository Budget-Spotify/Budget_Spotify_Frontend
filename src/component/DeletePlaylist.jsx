import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserService from "../services/user.service";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    color: 'black',
};

export default function DeletePlayListModal({playlist, reload}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        const accessToken = localStorage.getItem("token");
        UserService.deletePlaylist({_id: playlist._id}, accessToken)
            .then(res => {
                reload(res);
                setOpen(false)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <button onClick={handleOpen} >Delete</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        <span style={{color: 'white', backgroundColor: 'black'}}>FBI </span>
                        <span style={{color: 'black', backgroundColor: 'orange'}}>WARNING!</span>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Are you sure you want to delete this item? This action cannot be undone.
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                        <Button variant="outlined" onClick={handleClose} sx={{mr: 2}}>
                            CANCEL
                        </Button>
                        <Button variant="contained" onClick={handleDelete} color="error">
                            OK
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}