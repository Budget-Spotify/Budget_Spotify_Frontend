import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import {Add} from "@mui/icons-material";
import {useFormik} from "formik";
import {useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddSong() {
    const [open, setOpen] = useState(false);
    const [haveFile, setHaveFile] = useState(false)
    const [haveImage, setHaveImage] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const resetFormFileAndImage = () => {
        setHaveFile(false)
        setHaveImage(false)
    }
    const formAdd = useFormik({
        initialValues: {
            songName: '',
            description: '',
            fileURL: '',
            avatar: '',
            uploadTime: '',
            singers: [],
            composers: [],
            tags: [],
            uploader: '',
            isPublic: false
        },
        onSubmit: (values) => {

        },
    });

    return (
        <>
            <Button sx={{
                backgroundColor: "green",
                color: "white",
                margin: "10px",
                '&:hover': {
                    backgroundColor: "grey",
                    color: "white",
                },
            }} onClick={handleOpen}><Add/></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{flexDirection: 'row'}}
            >
                <Box component="form" onSubmit={formAdd.handleSubmit} noValidate sx={style}>
                    <h1>Add a new song</h1>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={formAdd.values.songName}
                        onChange={formAdd.handleChange}
                        id="songName"
                        label="Song Name"
                        name="songName"
                        autoComplete="songName"
                        autoFocus
                    />
                    <input type="file"/>
                    <input type="file"/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, backgroundColor: 'green'}}
                    >
                        Save
                    </Button>
                </Box>
                <div>
                    <img src="" alt="aaa"/>
                </div>
            </Modal>
        </>
    );
}