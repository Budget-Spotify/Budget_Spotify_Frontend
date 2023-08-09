import React from "react";
import ReactH5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./component.css";
import {useDispatch, useSelector} from "react-redux";
import {Fab} from "@mui/material";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import {setPlayBar} from "../redux/features/musicPlayBar/playBarSlice";


export default function MusicPlayBar() {
    const song = useSelector(state => state.song.song);
    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.playBar.isPlaying);

    const fixedUpIconStyle = {
        position: 'fixed',
        top: '85%',
        right: '1%',
    };
    const fixedDownIconStyle = {
        position: 'fixed',
        top: '70%',
        right: '1%',
    };

    const handleCollapse = () => {
        dispatch(setPlayBar(!isPlaying));
    }
    return (
        <>
            {!isPlaying ? (
                <div style={fixedUpIconStyle}>
                    <Fab
                        aria-label="upIcon"
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                        }}
                        onClick={handleCollapse}
                    >
                        <UpIcon/>
                    </Fab>
                </div>
            ) : (
                <div style={fixedDownIconStyle}>
                    <Fab
                        aria-label="upIcon"
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                        }}
                        onClick={handleCollapse}
                    >
                        <DownIcon/>
                    </Fab>
                </div>
            )}

            {isPlaying && (
                <div
                    style={{
                        backgroundColor: "black",
                        width: "100%",
                        padding: "40px 30px 20px 30px",
                        boxSizing: "borser-box",
                        position: "fixed",
                        bottom: "0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        zIndex: "10",
                        borderTop: "1px solid rgb(37, 37, 37)"
                    }}
                >
                    <div
                        style={{
                            background: "black",
                            width: "29%",
                            height: "70px",
                            objectFit: "cover",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        {song ? (

                            <img
                                src={song.avatar}
                                alt="img"
                                style={{width: "70px", height: "100%", borderRadius: "5px"}}
                            />
                        ) : (
                            <img
                                src="https://storage.googleapis.com/uamp/The_Kyoto_Connection_-_Wake_Up/art.jpg"
                                alt="img"
                                style={{width: "70px", height: "100%", borderRadius: "5px"}}
                            />
                        )}

                        <div style={{color: "#fff", background: "black", width: "78%"}}>
                            {song ? <h3 style={{background: "black", marginTop: "4px"}}>{song.songName}</h3> :
                                <h3 style={{marginTop: "4px", background: "black"}}>Voyage I - Waterfall</h3>}
                            {song ?
                                <p style={{
                                    fontSize: "13px",
                                    background: "black",
                                    marginTop: "20px"
                                }}>{song.songName}</p> :
                                <p style={{background: "black", fontSize: "13px", marginTop: "20px"}}>The Kyoto
                                    Connection</p>}
                        </div>
                    </div>
                    {
                        song ? <ReactH5AudioPlayer
                                src={song.fileURL}
                                layout="stacked-reverse"
                                volume={0.6}
                                autoPlay
                                showSkipControls={true}
                                progressJumpStep={5000}
                                style={{
                                    color: "white",
                                    width: "60%",
                                    margin: "0 auto",
                                    backgroundColor: "#131313",
                                    padding: "16px 20px 16px 20px",
                                    borderRadius: "10px",
                                }}
                            /> :
                            <ReactH5AudioPlayer
                                src={"https://storage.googleapis.com/uamp/The_Kyoto_Connection_-_Wake_Up/03_-_Voyage_I_-_Waterfall.mp3"}
                                layout="stacked-reverse"
                                volume={0.6}
                                showSkipControls={true}
                                progressJumpStep={5000}
                                style={{
                                    color: "white",
                                    width: "62%",
                                    margin: "0 auto",
                                    backgroundColor: "#131313",
                                    padding: "16px 20px 16px 20px",
                                    borderRadius: "10px",
                                }}
                            />
                    }
                </div>
            )}
        </>
    );
}
