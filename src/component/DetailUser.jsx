import PasswordInput from "../component/shared/PasswordInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import TextField from "@mui/material/TextField/TextField";
import MenuAppBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

const DetailUser = () => {
    const { id } = useParams();
    const [search] = useOutletContext();
    const [info, setInfo] = useState({});
    const [isLoading, setisLoading] = useState(false);
    const userLoginJSON = localStorage.getItem('userLogin');
    const userLogin = JSON.parse(userLoginJSON);
    const navigate = useNavigate();

    function getData() {
        setisLoading(true);
        UserService.getInfo(id).then(res => {
            console.log(res.data);
            setInfo(res.data.user);
            setisLoading(false);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div
            style={{
                marginLeft: '20.5%',
                marginBottom: '155px',
                marginRight: '1%',
                color: '#fff',
                padding: '30px 20px 20px 20px',
                background: 'black',
                borderRadius: '10px',
            }}
        >
            <MenuAppBar />
            <div className="center-content">
                <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                    {/* <Icon icon="logos:spotify" width="150" /> */}
                </div>
                <div className="inputRegion w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3 py-10 flex flex-col items-center">
                    <div className="font-bold mb-4 text-2xl">
                        <h1>Your Profile</h1>
                    </div>
                    <div class="container">
                        <div className="avatar">
                            <img
                                src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/344544622_582258900551376_4176474794430710547_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lzWCZ30j7hgAX_BNQDP&_nc_ht=scontent.fhan17-1.fna&oh=00_AfCukd50pGVHSTivMrBxhfXgCFzQk0bzjDQ16JbwcM9pCQ&oe=64D0A1FC"
                                alt=""
                            />
                        </div>
                        <div class="name">
                            <h1>Username: {info.username} </h1>
                            <ul class="contact">
                                <li>
                                    <span>Role:</span> {info.role}
                                </li>
                                <li>
                                    <span>PhoneNumber:</span> {info.phoneNumber}
                                </li>
                                <li>
                                    <span>Gender:</span> {info.username}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default DetailUser;