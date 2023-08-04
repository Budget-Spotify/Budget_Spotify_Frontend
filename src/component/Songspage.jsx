import React, {useEffect, useState} from "react";
import axios from "axios";
import SongCard from "./SongCard";
import Footer from "./Footer";
import MenuAppBar from "./NavBar";
import {useOutletContext} from "react-router-dom";

export default function Songspage() {
    const [search] = useOutletContext();
    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    function getData() {
        setisLoading(true);

        !search
            ? axios
                .get("https://frightened-baseball-cap-fish.cyclic.app/musixmix/songs")
                .then((res) => {
                    setData(res.data.data);
                    setisLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setisLoading(false);
                })
            : axios
                .get(
                    `https://frightened-baseball-cap-fish.cyclic.app/musixmix?search=${search}`
                )
                .then((res) => {
                    setData(res.data.songs);
                    console.log(res.data.songs)
                    setisLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setisLoading(false);
                });
    }

    useEffect(() => {
        getData();
    }, [search]);

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
            <MenuAppBar/>
            <br/>
            <br/>
            <h2 className="text-2xl font-semibold">Best of what India listens to!</h2>
            {isLoading ? (
                <h2 style={{textAlign: "center", margin: "150px", color: "#1DB954"}}>
                    Loading...
                </h2>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5,1fr)",
                        marginTop: "40px",
                        gap: "30px 20px",
                    }}
                >
                    {data && data.map((e, index) => {

                        return (
                            <SongCard
                                songUrl={e.source}
                                image={e.image}
                                title={e.title}
                                artist={e.artist}
                                key={index}
                            />
                        );
                    })}
                </div>
            )}

            <Footer/>
        </div>
    );
}