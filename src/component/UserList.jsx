import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import MenuAppBar from "./NavBar";
import AdminUser from "../services/admin.user";
import "bootstrap/dist/css/bootstrap.css"


export default function UserList() {
    const [data, setData] = useState({ list: [] });
    const [isLoading, setisLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    function getData() {
        setisLoading(true);
        AdminUser.getUserList().then(res => {
            console.log(res.data);
            setData(res.data)
            setisLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, {});

    // Tính toán chỉ số của phần tử đầu tiên và cuối cùng trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.list.slice(indexOfFirstItem, indexOfLastItem);

    // Thay đổi trang hiện tại
    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    // Hiển thị số trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.list.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Giới hạn số lượng trang hiển thị
    const maxPagesToShow = 5;
    let startPage = currentPage - Math.floor(maxPagesToShow / 2);
    startPage = Math.max(startPage, 1);
    startPage = Math.min(startPage, pageNumbers.length - maxPagesToShow + 1);
    const pagesToShow = pageNumbers.slice(startPage - 1, startPage + maxPagesToShow - 1);

    return (
        <div
            style={{
                marginLeft: "20.5%",
                marginBottom: "155px",
                marginRight: "1%",
                color: "#fff",
                padding: "30px 20px 20px 20px",
                background: "black",
                borderRadius: "10px",
            }}
        >
            <MenuAppBar />
            <h2 class="text-2xl font-semibold">Best of what India listens to!</h2>
            {isLoading ? (
                <h2 style={{ textAlign: "center", margin: "150px", color: "#1DB954" }}>
                    Loading...
                </h2>
            ) : (
                <div>
                    <table class="table">
                        <thead>
                            <tr >
                                <th scope="col" style={{ color: "#ffffff", backgroundColor: "#000000" }} >#</th>
                                <th scope="col" style={{ color: "#ffffff", backgroundColor: "#000000" }}>Username</th>
                                <th scope="col" style={{ color: "#ffffff", backgroundColor: "#000000" }}>first Name</th>
                                <th scope="col" style={{ color: "#ffffff", backgroundColor: "#000000" }}>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ color: "#ffffff", backgroundColor: "#000000" }}>{index + 1}</td>
                                    <td style={{ color: "#ffffff", backgroundColor: "#000000" }}>{item.username}</td>
                                    <td style={{ color: "#ffffff", backgroundColor: "#000000" }}>{item.firstName}</td>
                                    <td style={{ color: "#ffffff", backgroundColor: "#000000" }}>{item.lastName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ul style={{ display: "flex", listStyleType: "none" }}>
                        {currentPage > 1 && (
                            <>
                                <li onClick={() => setCurrentPage(1)} style={{ marginRight: "10px" }}>First</li>
                                <li onClick={() => setCurrentPage(currentPage - 1)} style={{ marginRight: "10px" }}>Prev</li>
                            </>
                        )}
                        {pagesToShow.map((number) => (
                            <li
                                key={number}
                                id={number}
                                onClick={handlePageChange}
                                style={{
                                    fontWeight: currentPage === number ? "bold" : "normal",
                                    marginRight: "10px",
                                }}
                            >
                                {number}
                            </li>
                        ))}
                        {currentPage < pageNumbers.length && (
                            <>
                                <li onClick={() => setCurrentPage(currentPage + 1)} style={{ marginRight: "10px" }}>Next</li>
                                <li onClick={() => setCurrentPage(pageNumbers.length)}>Last</li>
                            </>
                        )}
                    </ul>
                </div>
            )}

            <Footer />
        </div>
    );
}