import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Add } from "@mui/icons-material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import storage from "../config/firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
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

export default function EditInfo({ reload }) {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const [haveImage, setHaveImage] = useState(false);
    const userLoginJSON = localStorage.getItem('userLogin');
    const userLogin = JSON.parse(userLoginJSON);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleImageInput = (e) => {
        setImage(e.target.files[0]);
        setImageSrc(URL.createObjectURL(e.target.files[0]));
    };
    const resetFormFileAndImage = () => {
        setImage(null);
        setHaveImage(false);
    };

    const handleUploadFile = () => {
        return new Promise((resolve, reject) => {
            console.log(image);
            const imgRef = ref(storage, `/images/${image.name}`);
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
            firstName: "",
            lastName: "",
            phoneNumber: "",
            gender: "",
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
        if (haveImage) {
            let data = {
                id: userLogin._id,
                ...formAdd.values,
                avatar: image,
            };
            console.log(data);
            resetFormFileAndImage();
            formAdd.resetForm();
            handleClose()
            UserService.editInfo(data)
                .then((res) => {
                    reload(res)
                })
                .catch((err) => console.log(err));
            const dataLogin = {
                id: userLogin._id,
                username:userLogin.username,
                role:userLogin.role,
                ...formAdd.values,
                avatar: image,
            }
            const userString = JSON.stringify(dataLogin);
            localStorage.setItem("userLogin", userString);
        }
    }, [haveImage]);
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
                Edit
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
                    <div style={{ position: "relative", width: "50%" }}>
                        <h1>Edit ProFile</h1>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={formAdd.values.firstName}
                            onChange={formAdd.handleChange}
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={formAdd.values.lastName}
                            onChange={formAdd.handleChange}
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={formAdd.values.phoneNumber}
                            onChange={formAdd.handleChange}
                            id="phoneNumber"
                            label="Phone Number"
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                            autoFocus
                        />
                        <div className="textInputDiv flex flex-col space-y-2 w-full">
                            <label className="font-semibold pt-5">Gender</label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-white text-black"
                                name="gender"
                                value={formAdd.values.gender}
                                onChange={formAdd.handleChange}
                                required
                            >
                                <option value="">Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <label htmlFor="avatar">Avatar:</label>
                        <input id="avatar" type="file" onChange={handleImageInput} />
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
                        <img src={imageSrc} alt="Image Preview" />
                    </div>
                </Box>
            </Modal>
        </>
    );
}
