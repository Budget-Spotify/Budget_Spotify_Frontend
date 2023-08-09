import { FileUploader } from "react-drag-drop-files";
import { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import UserService from "../services/user.service";
import storage from "../config/firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const fileTypes = ["MP3"];
const BoxStyle = {
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
  color: "black",
};

function UploadSongDragAndDrop() {
  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        style={{
          width: "80%",
          height: "100px",
          marginLeft: "10%",
          marginBottom: "10px",
          border: "3px dashed #eeeeee",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>
          <span
            style={{
              marginRight: "5px",
              borderBottom: hover ? "3px solid white" : "2px solid white",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Select
          </span>
          <span>or drop your track here!</span>
        </p>
      </div>
    </>
  );
}
function UploadImageDragAndDrop({ imageSrc }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {imageSrc === "" ? (
        <div style={{ width: "80%", height: "80%", marginTop: "20px" }}></div>
      ) : (
        <img
          src={imageSrc}
          alt="img"
          style={{ width: "60%", height: "75%", marginTop: "20px" }}
        />
      )}
      <p id={"upload"} style={{ marginBottom: "20px" }}>
        Select an image
      </p>
    </div>
  );
}

function UserAddSong({reload}) {
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [haveFile, setHaveFile] = useState(false);
  const [haveAvatar, setHaveAvatar] = useState(false);

  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const resetFormFileAndImage = () => {
    setFile(null);
    setAvatar(null);
    setHaveFile(false);
    setHaveAvatar(false);
  };
  const handleChangeFile = (input) => {
    console.log(input);
    setFile(input);
    handleOpen();
  };
  const handleChangeAvatar = (input) => {
    console.log(input);
    setAvatar(input);
    setImageSrc(URL.createObjectURL(input));
  };
  const handleUploadFile = () => {
    return new Promise((resolve, reject) => {
      const imgRef = ref(storage, `/images/${avatar.name}`);
      const imageTask = uploadBytesResumable(imgRef, avatar);
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
              setAvatar(avatarFirebase);
              setHaveAvatar(true);
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
        if (!file || !avatar) {
          return console.log('no file')
        }
        if (formAdd.values.songName === "") {
          return console.log('no song name')
        }
        console.log('submitting');
        handleUploadFile();
      } catch (e) {
        console.log(e);
      }
    },
  });
  useEffect(() => {
    if (haveFile && haveAvatar) {
      let data = {
        ...formAdd.values,
        fileURL: file,
        avatar: avatar,
      };
      UserService.addSong(data)
        .then((res) => {
          resetFormFileAndImage();
          formAdd.resetForm();
          handleClose();
          reload(data);
        })
        .catch((err) => console.log(err.response.data.message));
    }
  }, [haveFile, haveAvatar]);
  return (
    <>
      <FileUploader
        handleChange={handleChangeFile}
        name="file"
        label="Upload or drop your track here"
        types={fileTypes}
        multiple={false}
        required={true}
        children={<UploadSongDragAndDrop />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          //   onSubmit={formAdd.handleSubmit}
          noValidate
          sx={BoxStyle}
        >
          <div
            style={{
              position: "absolute",
              width: "50%",
              height: "100%",
              top: 0,
              left: 0,
            }}
          >
            <FileUploader
              handleChange={handleChangeAvatar}
              name="avatar"
              types={["JPG", "PNG", "GIF"]}
              multiple={false}
              required={true}
              children={<UploadImageDragAndDrop imageSrc={imageSrc} />}
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "50%",
              marginLeft: "50%",
            }}
          >
            <h1>Add a new song</h1>
            <TextField
              margin="normal"
              required
              fullWidth
              //   value={formAdd.values.songName}
              //   onChange={formAdd.handleChange}
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
              //   value={formAdd.values.description}
              //   onChange={formAdd.handleChange}
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "green" }}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default UserAddSong;
