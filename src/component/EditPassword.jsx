import PasswordInput from "../component/shared/PasswordInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField/TextField";

const EditPassword = () => {
    const [errMessage, setErrorMessage] = useState("");
    const formEdit = useFormik({
        initialValues: {
            oldpassword: "",
            newpassword: "",
            newpasswordconfirm: "",
        },
        onSubmit: values => {

        }
    })
    return (
        <div style={{
            marginLeft: "20.5%",
            marginBottom: "155px",
            marginRight: "1%",
            color: "#fff",
            padding: "30px 20px 20px 20px",
            background: "black",
            borderRadius: "10px",
        }} >
            <div className="w-full h-full flex flex-col items-center">
                <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                    {/* <Icon icon="logos:spotify" width="150" /> */}
                </div>
                <div className="inputRegion w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3 py-10 flex flex-col items-center">
                    <div className="font-bold mb-4 text-2xl">
                        Security Management
                    </div>
                    <form onSubmit={formEdit.handleSubmit}>

                        <TextField
                            label="Current Password"
                            placeholder="Enter Current Password"
                            className="my-6"
                            name="oldpassword"
                            onChange={formEdit.handleChange}
                            value={formEdit.values.oldpassword}
                            inputProps={{ style: { color: "white" } }}
                            fullWidth
                            margin="normal"
                            style={{background:"white"}}
                        />
                        <TextField
                            label="New Password"
                            placeholder="Enter New Password"
                            className="mb-6"
                            onChange={formEdit.handleChange}
                            value={formEdit.values.newpassword}
                            name="newpassword"
                            inputProps={{ style: { color: "white" } }}
                            fullWidth
                            margin="normal"
                            style={{background:"white"}}
                        />
                        <TextField
                            label="Confirm newpassword"
                            placeholder="reEnter new password"
                            className="mb-6"
                            onChange={formEdit.handleChange}
                            value={formEdit.values.newpasswordconfirm}
                            name="newpasswordconfirm"
                            inputProps={{ style: { color: "white" } }}
                            fullWidth
                            margin="normal"
                            style={{background:"white"}}
                        />

                        <div className="w-full flex items-center justify-center my-8">
                            <button className="bg-green-400 font-semibold p-3 px-10 rounded-full" style={{ width: "100%" }}>
                                Edit password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPassword;