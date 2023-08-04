import PasswordInput from "../component/shared/PasswordInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField/TextField";
import MenuAppBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as Yup from 'yup';
import { useOutletContext } from "react-router-dom";
import Footer from "./Footer";
const editpasswordSchema = Yup.object().shape({
    newpassword: Yup.string()
        .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
            'Password phải có tối thiểu 1 ký tự hoa, 1 ký tự số và 1 ký tự đặc biệt, và ít nhất 8 ký tự'
        ),
});

const EditPassword = () => {
    const [search] = useOutletContext();
    const userLoginJSON = localStorage.getItem('userLogin');
    const userLogin = JSON.parse(userLoginJSON);
    const [errMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()
    
    useEffect(() => {
    }, [errMessage]);
    const formEdit = useFormik({
        initialValues: {
            oldpassword: "",
            newpassword: "",
            newpasswordconfirm: "",
        },
        validationSchema: editpasswordSchema,
        onSubmit: values => {
            let data = {
                id: userLogin._id,
                oldpassword: values.oldpassword,
                newpassword: values.newpassword,
                newpasswordconfirm: values.newpasswordconfirm
            }
            UserService.editPassword(data).then(res => {
                if (res.data.status === "failed") {
                    setErrorMessage(res.data.message)
                } else {
                    navigate('/')
                }
            }).catch(err => {
                console.log(err);
            })
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
            <MenuAppBar />
            <div className="w-full h-full flex flex-col items-center">
                <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                    {/* <Icon icon="logos:spotify" width="150" /> */}
                </div>
                <div className="inputRegion w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3 py-10 flex flex-col items-center">
                    <div className="font-bold mb-4 text-2xl">
                        Security Management
                    </div>
                    <form onSubmit={formEdit.handleSubmit}>
                        <p style={{ color: "red" }}>{errMessage}</p>
                        <TextField
                            type="password"
                            label="Current Password"
                            placeholder="Enter Current Password"
                            className="my-6"
                            name="oldpassword"
                            onChange={formEdit.handleChange}
                            value={formEdit.values.oldpassword}
                            inputProps={{ style: { color: "black" } }}
                            fullWidth
                            margin="normal"
                            style={{ background: "white" }}
                            
                        />
                        <TextField
                            type="password"
                            label="New Password"
                            placeholder="Enter New Password"
                            className="mb-6"
                            onChange={formEdit.handleChange}
                            value={formEdit.values.newpassword}
                            name="newpassword"
                            inputProps={{ style: { color: "black" } }}
                            fullWidth
                            margin="normal"
                            style={{ background: "white" }}
                        />
                        {formEdit.errors.newpassword && <div style={{ color: 'red' }}>{formEdit.errors.newpassword}</div>}
                        <TextField
                            type="password"
                            label="Confirm newpassword"
                            placeholder="reEnter new password"
                            className="mb-6"
                            onChange={formEdit.handleChange}
                            value={formEdit.values.newpasswordconfirm}
                            name="newpasswordconfirm"
                            inputProps={{ style: { color: "black" } }}
                            fullWidth
                            margin="normal"
                            style={{ background: "white" }}
                        />

                        <div className="w-full flex items-center justify-center my-8">
                            <button className="bg-green-400 font-semibold p-3 px-10 rounded-full" style={{ width: "100%" }}>
                                Edit password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default EditPassword;