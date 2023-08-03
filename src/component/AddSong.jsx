import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import {Add} from "@mui/icons-material";
import {useFormik} from "formik";
import {useEffect, useState} from "react";

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
    display: 'flex',
    flexDirection: 'row'
};

export default function AddSong() {
    const [open, setOpen] = useState(false);
    const [file,setFile]=useState(null)
    const [image,setImage]=useState(null)
    const [imageSrc,setImageSrc] = useState("")
    const [haveFile, setHaveFile] = useState(false)
    const [haveImage, setHaveImage] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleFileInput = (e) => setFile(e.target.files[0])
    const handleImageInput = (e) => {
        setImage(e.target.files[0])
        setImageSrc(URL.createObjectURL(e.target.files[0]))
    }
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
            console.log(file)
            console.log(image)

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
            >
                <Box component="form" onSubmit={formAdd.handleSubmit} noValidate sx={style}>
                    <div style={{position:"relative",width:"50%"}}>
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
                        <label htmlFor="avatar">Avatar:</label>
                        <input id="avatar" type="file" onChange={handleImageInput}/>
                        <label htmlFor="song">Song:</label>
                        <input id="song" type="file" onChange={handleFileInput}/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, backgroundColor: 'green'}}
                        >
                            Save
                        </Button>
                    </div>
                    <div style={{
                        position:"absolute",
                        width:"50%",
                        height:"100%",
                        top:0,
                        right:0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img src={imageSrc} alt="Image Preview"/>
                    </div>
                </Box>
            </Modal>
        </>
    );
}