import PasswordInput from "../component/shared/PasswordInput";
import { useState } from "react";
import MenuAppBar from "./NavBar";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Footer from "./Footer";


const DetailUser = () => {
    const [search] = useOutletContext();
    const [isLoading, setisLoading] = useState(false);
    const userLoginJSON = localStorage.getItem('userLogin');
    const userLogin = JSON.parse(userLoginJSON);
    
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
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                <div>
                    {/* <Icon icon="logos:spotify" width="150" /> */}
                </div>
                <div className="inputRegion w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3 py-10 flex flex-col items-center">
                    <div className="font-bold mb-4 text-2xl">
                        <h1>Your Profile</h1>
                    </div>
                    <div class="container">
                        <div className="avatar">
                            <img src={userLogin.avatar} alt="" />
                        </div>
                        <div class="name">
                            <h1>Username: {userLogin.username} </h1>
                            <ul class="contact">
                                <li>
                                    <span>Role:</span> {userLogin.role}
                                </li>
                                <li>
                                    <span>PhoneNumber:</span> {userLogin.phoneNumber}
                                </li>
                                <li>
                                    <span>Gender:</span> {userLogin.gender}
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-green-400 font-semibold p-3 px-10 rounded-full " type="submit">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetailUser;