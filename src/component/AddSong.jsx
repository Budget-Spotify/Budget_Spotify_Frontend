import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const fileTypes = ["MP3"];

function UploadDragAndDrop() {
  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        style={{
          width: "80%",
          height: "100px",
          border: "1px white solid",
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
              borderBottom: hover ? "2.1px solid white" : "2px solid white",
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

function AddSong() {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (file) => {
    console.log(file);
    setFile(file);
  };
  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="file"
        label="Upload or drop your track here"
        types={fileTypes}
        multiple={false}
        required={true}
        children={<UploadDragAndDrop />}
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
        >
          <div
            style={{
              position: "absolute",
              width: "50%",
              height: "100%",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* {imageSrc !== "" ? (
              <img
                src={imageSrc}
                alt="Image Preview"
                style={{ width: "80%", height: "80%" }}
              />
            ) : (
              <p>Image Preview</p>
            )} */}
            <p>place holder</p>
          </div>
          <div
            style={{
              position: "relative",
              width: "50%",
              marginLeft: "50%",
            }}
          >
            <h1>
                Add a new song
            </h1>
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
            <div>
              <label htmlFor="avatar">
                Avatar:
              </label>
              <input
                id="avatar"
                type="file"
              />
            </div>
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

export default AddSong;
