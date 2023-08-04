import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {Add} from "@mui/icons-material";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import storage from "../config/firebase.config";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import UserService from "../services/user.service";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "row",
};

export default function AddSong({reload}) {
    const [open, setOpen] = useState(false);

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    const [imageSrc, setImageSrc] = useState("");

    const [haveFile, setHaveFile] = useState(false);
    const [haveImage, setHaveImage] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleFileInput = (e) => setFile(e.target.files[0]);
    const handleImageInput = (e) => {
        setImage(e.target.files[0]);
        setImageSrc(URL.createObjectURL(e.target.files[0]));
    };
    const resetFormFileAndImage = () => {
        setFile(null);
        setImage(null);
        setHaveFile(false);
        setHaveImage(false);
    };

    const handleUploadFile = () => {
        return new Promise((resolve, reject) => {
            console.log(file);
            console.log(image);
            const imgRef = ref(storage, `/images/${image.name}`);
            const imageTask = uploadBytesResumable(imgRef, image);
            const fileRef = ref(storage, `/songs/${file.name}`);
            const fileTask = uploadBytesResumable(fileRef, file);

            imageTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    if (percent === 100) console.log("img uploaded");
                },
                (err) => {
                    console.log(err);
                    reject(err);
                },
                () => {
                    getDownloadURL(imageTask.snapshot.ref)
                        .then((avatarFirebase) => {
                            console.log(avatarFirebase);
                            setImage(avatarFirebase);
                            setHaveImage(true);
                            resolve();
                        })
                        .catch((err) => reject(err));
                }
            );

            fileTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    if (percent === 100) console.log("file uploaded");
                },
                (err) => {
                    console.log(err);
                    reject(err);
                },
                () => {
                    getDownloadURL(fileTask.snapshot.ref)
                        .then((fileFirebase) => {
                            console.log(fileFirebase);
                            setFile(fileFirebase);
                            setHaveFile(true);
                            resolve();
                        })
                        .catch((err) => reject(err));
                }
            );
        });
    };

    const formAdd = useFormik({
        initialValues: {
            songName: "",
            description: "",
            singers: [],
            composers: [],
            tags: [],
            uploader: "64ca21378646dc995d7f7683",
            isPublic: false,
        },
        onSubmit: (values) => {
            try {
                handleUploadFile();
            } catch (e) {
                console.log(e);
            }
        },
    });
    useEffect(() => {
        if (haveFile && haveImage) {
            let data = {
                ...formAdd.values,
                fileURL: file,
                avatar: image,
            };
            console.log(data);
            resetFormFileAndImage();
            formAdd.resetForm();
            handleClose()
            UserService.addSong(data)
                .then((res) => reload(res))
                .catch((err) => console.log(err));
        }
    }, [haveFile, haveImage]);
    return (
        <>
            <Button
                sx={{
                    backgroundColor: "green",
                    color: "white",
                    margin: "10px",
                    "&:hover": {
                        backgroundColor: "grey",
                        color: "white",
                    },
                }}
                onClick={handleOpen}
            >
                <Add/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    component="form"
                    onSubmit={formAdd.handleSubmit}
                    noValidate
                    sx={style}
                >
                    <div style={{position: "relative", width: "50%"}}>
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={formAdd.values.description}
                            onChange={formAdd.handleChange}
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="description"
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
                            sx={{mt: 3, mb: 2, backgroundColor: "green"}}
                        >
                            Save
                        </Button>
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            width: "50%",
                            height: "100%",
                            top: 0,
                            right: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img src={imageSrc} alt="Image Preview"/>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
