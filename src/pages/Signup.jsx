import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import TextField from '@mui/material/TextField';
import {useState} from "react";

export function SignupComponent() {
    const navigate = useNavigate();
    const validateSignup = Yup.object({
        username: Yup.string()
            .matches(/^[a-zA-Z0-9]+$/, 'Username không được ký tự đặc biệt'),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                'Password phải có tối thiểu 1 ký tự hoa, 1 ký tự số và 1 ký tự đặc biệt, và ít nhất 8 ký tự'
            ),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        phoneNumber: Yup.string()
            .nullable()
            .max(10, 'Tối đa 10 ký tự'),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            gender: "",
            avatar: "",
        },
        validationSchema: validateSignup,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:8000/auth/register", values);
                navigate('/login');
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }
    });

    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    return (
        <div className="w-full h-full flex flex-col items-center" style={{backgroundColor: "white"}}>
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                <h1 className="text-4xl font-bold">
                    Music<span className="text-green-500">Mix</span>
                </h1>
            </div>
            <div className="inputRegion w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3 py-10 flex flex-col items-center">
                <div className="font-bold mb-4 text-2xl">
                    Sign up for free to start listening.
                </div>

                <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
                    {!showAdditionalFields && (
                        <>
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: "column"}}>
                                <div style={{marginBottom: '10px'}}>
                                    <TextField
                                        label="Username"
                                        placeholder="Enter your username"
                                        className="textFieldSignup-width"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        name="username"
                                        required
                                        error={showErrorMessage}
                                    />
                                    {formik.errors.username &&
                                        <div style={{color: 'red'}}>{formik.errors.username}</div>}
                                </div>

                                <div style={{marginBottom: '10px'}}>
                                    <TextField
                                        label="Create password"
                                        placeholder="Enter a strong password here"
                                        className="textFieldSignup-width"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        name="password"
                                        type="password"
                                        required
                                        error={showErrorMessage}
                                    />
                                    {formik.errors.password &&
                                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                                </div>

                                <div style={{marginBottom: '10px'}}>
                                    <TextField
                                        label="Confirm password"
                                        placeholder="Confirm your password here"
                                        className="textFieldSignup-width"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        error={showErrorMessage}
                                    />
                                    {formik.errors.confirmPassword &&
                                        <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>}
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-center my-8">
                                <button
                                    className="bg-green-400 font-semibold p-3 px-10 rounded-full"
                                    type="button"
                                    onClick={() => {
                                        if (formik.isValid && formik.dirty) {
                                            setShowAdditionalFields(true);
                                            setShowErrorMessage(false);
                                        } else {
                                            setShowErrorMessage(true);
                                        }
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                {showErrorMessage && <div style={{color: 'red'}}>{"Need to complete field"}</div>}
                            </div>
                        </>
                    )}

                    {showAdditionalFields && (
                        <>
                            <div style={{marginBottom: '10px'}}>
                                <TextField
                                    label="FirstName"
                                    placeholder="Enter your firstName"
                                    className="textFieldSignup-width"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    name="firstName"
                                />
                                {formik.errors.firstName && <div style={{color: 'red'}}>{formik.errors.firstName}</div>}
                            </div>

                            <div style={{marginBottom: '10px'}}>
                                <TextField
                                    label="LastName"
                                    placeholder="Enter your lastName"
                                    className="textFieldSignup-width"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    name="lastName"
                                />
                                {formik.errors.lastName && <div style={{color: 'red'}}>{formik.errors.lastName}</div>}
                            </div>

                            <div style={{marginBottom: '10px'}}>
                                <TextField
                                    label="PhoneNumber"
                                    placeholder="Enter your phoneNumber"
                                    className="textFieldSignup-width"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    name="phoneNumber"
                                />
                                {formik.errors.phoneNumber &&
                                    <div style={{color: 'red'}}>{formik.errors.phoneNumber}</div>}
                            </div>

                            <div className="textInputDiv flex flex-col space-y-2 w-full">
                                <label className="font-semibold pt-5">Gender</label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Select your gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            {formik.errors.gender && <div style={{color: 'red'}}>{formik.errors.gender}</div>}

                            <div className="w-full flex items-center justify-center my-8">
                                <button className="bg-green-400 font-semibold p-3 px-10 rounded-full" type="submit">
                                    Sign Up
                                </button>
                            </div>
                        </>
                    )}
                </form>
                {/* ... other content ... */}
                <div className="w-full border border-solid border-gray-300"></div>
                <div className="my-6 font-semibold text-lg">
                    Already have an account?
                </div>
                <div
                    className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold cursor-pointer hover:opacity-75">
                    <Link to="/login">LOG IN INSTEAD</Link>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}