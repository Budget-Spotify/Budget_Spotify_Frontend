import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import storage from "../config/firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import UserService from "../services/user.service";
import * as Yup from 'yup';
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff', // Đổi màu chữ (text) thành trắng
        },
        text: {
            primary: '#ffffff', // Đổi màu chữ (text) thành trắng
            secondary: '#ffffff', // Đổi màu chữ phụ (secondary text) thành trắng
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: '#ffffff', // Màu chữ (text) khi label được focus
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 2,
                        borderColor: '#ffffff', // Màu viền (border) ban đầu
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // Màu viền khi hover
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff', // Màu viền khi input được chọn (focus)
                    },
                },
            },
        },
    },
});
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "black",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "row",
    color: "white",
};
const imageInputLabelStyle = {
    display: "inline-block",
    width: "20%",
    textAlign: "left",
    marginBottom: "5px"
};

const imageInputStyle = {
    marginLeft: "10px",
    maxWidth: "70%",
    marginBottom: "5px"
};
const validationSchema = Yup.object({
    playlistName: Yup.string().required('PlayListName is reqired'),
});
export default function AddPlaylist({ reload }) {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    const [haveImage, setHaveImage] = useState(false);
    const userLoginJSON = localStorage.getItem('userLogin');
    const [showError, setShowError] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleImageInput = (e) => {
        setImage(e.target.files[0]);
        setImageSrc(URL.createObjectURL(e.target.files[0]));
    };
    const resetFormFileAndImage = () => {
        setImage("");
        setHaveImage(false);
    };
    const handleUploadFile = () => {
        return new Promise((resolve, reject) => {
            console.log(image);
            const imgRef = ref(storage, `/images/${image?.name}`);
            const imageTask = uploadBytesResumable(imgRef, image);
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
        });
    };

    const formAdd = useFormik({
        initialValues: {
            playlistName: "",
            description: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            try {
                setShowError("Submitting...");
                handleUploadFile();
            } catch (e) {
                console.log(e);
            }
        },
    });
    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        if (haveImage) {
            let data = {
                ...formAdd.values,
                avatar: image,
            };
            console.log(data);
            resetFormFileAndImage();
            formAdd.resetForm();
            handleClose()
            UserService.addPlayList(data, accessToken)
                .then((res) => {
                    reload(res)
                })
                .catch((err) => console.log(err));
        }
    }, [haveImage]);
    return (
        <>
            <Button
                sx={{
                    backgroundColor: "black",
                    color: "white",
                    margin: "10px",
                    border: "2px solid white",
                    "&:hover": {
                        backgroundColor: "grey",
                        color: "white",
                    },
                }}
                onClick={handleOpen}
            >
                Add PlayList
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ThemeProvider theme={theme}>
                    <Box
                        component="form"
                        onSubmit={formAdd.handleSubmit}
                        noValidate
                        sx={style}
                    >
                        <div style={{ position: "relative", width: "50%" }}>
                            <h1
                                style={
                                    showError === "" || showError === "Submitting..."
                                        ? { color: "black" }
                                        : { color: "red" }
                                }
                            >
                                {showError === "" ? "Add PlayList" : showError}
                            </h1>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={formAdd.values.playlistName}
                                onChange={formAdd.handleChange}
                                id="laylistName"
                                label="playlistName"
                                name="playlistName"
                                autoComplete="playlistName"
                                autoFocus
                            />
                            {formAdd.errors.playlistName && (
                                <div style={{ color: 'red' }}>{formAdd.errors.playlistName}</div>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={formAdd.values.description}
                                onChange={formAdd.handleChange}
                                id="description"
                                label="description"
                                name="description"
                                autoComplete="description"
                                autoFocus
                            />
                            <label htmlFor="avatar" style={imageInputLabelStyle}>Avatar:</label>
                            <input id="avatar" type="file" onChange={handleImageInput} style={imageInputStyle} />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: "green" }}
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
                            {imageSrc !== "" ? (
                                <img
                                    src={imageSrc}
                                    alt="Image Preview"
                                    style={{ width: "80%", height: "80%" }}
                                />
                            ) : (
                                <p>Image Preview</p>
                            )}
                        </div>
                    </Box>
                </ThemeProvider>
            </Modal>
        </>
    );
}