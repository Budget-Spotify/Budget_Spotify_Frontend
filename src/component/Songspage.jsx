import React, {useEffect, useState} from "react";
import SongCard from "./SongCard";
import Footer from "./Footer";
import MenuAppBar from "./NavBar";
import SongService from "../services/song.service";

export default function Songspage() {
    const [isLoading, setIsLoading] = useState(false);
    const [listPublicSongs, setListPublicSongs] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        SongService.getPublicSongs()
            .then((res) => {
                setListPublicSongs(res.data.songs);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
    }, []);

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
                    {listPublicSongs && listPublicSongs.map((song, index) => {

                        return (
                            <SongCard
                                songUrl={song.fileURL}
                                image={song.avatar}
                                title={song.songName}
                                artist={song.singers[0]}
                                key={index}
                                song={song}
                            />
                        );
                    })}
                </div>
            )}

            <Footer/>
        </div>
    );
}