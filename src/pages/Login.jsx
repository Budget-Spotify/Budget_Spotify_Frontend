import {useFormik} from "formik";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import TextField from '@mui/material/TextField';

export function LoginComponent() {
    const navigate = useNavigate();
    const formik = useFormik({
            initialValues: {
                username: "",
                password: "",
            },
            onSubmit: async (values) => {
                try {
                    const response = await axios.post("http://localhost:8000/auth/login", values);
                    localStorage.setItem("token", response.data.accessToken);
                    const userObject = response.data.user;
                    const userString = JSON.stringify(userObject);
                    localStorage.setItem("userLogin", userString);
                    navigate('/');

                    // if you need to get userLogin
                    // const storedUserString = localStorage.getItem("userLogin");
                    // const storedUserObject = JSON.parse(storedUserString);
                    // console.log(storedUserObject);
                } catch (error) {
                    console.error("Login failed:", error);
                }
            }

        }
    )

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                <h1 className="text-4xl font-bold">
                    Music<span className="text-green-500">Mix</span>
                </h1>

            </div>
            <div className="inputRegion w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3 py-10 flex flex-col items-center">
                <div className="font-bold mb-4 text-center text-xl">
                    To continue, log in to Spotify.
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Username"
                        placeholder="Enter your username"
                        className="my-6"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        name="username"
                    />
                    <TextField
                        label="Password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        name="password"
                        type="password"
                    />
                    <div className="w-full flex items-center justify-center my-8">
                        <button className="bg-green-400 font-semibold p-3 px-10 rounded-full" type="submit">
                            LOG IN
                        </button>
                    </div>
                </form>
                <div className="w-full border border-solid border-gray-300"></div>
                <div className="my-6 font-semibold text-center text-lg">
                    Don't have an account?
                </div>
                <div
                    className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold  cursor-pointer hover:opacity-75">
                    <Link to="/signup">SIGN UP FOR MusicMix</Link>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}