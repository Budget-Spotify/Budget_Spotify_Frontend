import {useEffect, useRef, useState} from "react";
import ReactH5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./component.css";
import {useDispatch, useSelector} from "react-redux";
import {Fab} from "@mui/material";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import {setPlay, setPlayBar} from "../redux/features/musicPlayBar/playBarSlice";
import { addSongIntoPlayList, setSong } from "../redux/features/songs/songSlice";
import SongService from "../services/song.service";


export default function MusicPlayBar() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const song = useSelector(state => state.song.song);
    const tracks = useSelector(state => state.song.currentPlaylist)
    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.playBar.isPlaying);
    const playingMusic = useSelector(state => state.playBar.playingMusic);

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

    const audioRef = useRef();

    const handlePlay = () => {
      audioRef.current.audio.current.play();
    };

    const handlePause = () => {
      audioRef.current.audio.current.pause();
    };

    const handleNextTrack = () => {
        let nextTrackIndex = currentTrackIndex
        if(currentTrackIndex===tracks.length-1){
            SongService.getRandomSong()
            .then(res=>{
                const randomSong = res.data.data
                const songExist = tracks.some(e => e.songName === randomSong.songName)
                if(songExist){
                    handleNextTrack()
                } else {
                    dispatch(setSong(res.data.data))
                    dispatch(addSongIntoPlayList(res.data.data))
                    nextTrackIndex = currentTrackIndex + 1
                }   
            })
            .catch(err=>{
                console.log(err);
            })
        } else nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
        console.log(nextTrackIndex);
        setCurrentTrackIndex(nextTrackIndex);
    };
    const handlePreTrack = () => {
        const nextTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        setCurrentTrackIndex(nextTrackIndex);
    };
    const handlePlayButton = () =>{
        dispatch(setPlay(true))
    }
    const handlePauseButton = () => {
        dispatch(setPlay(false))
    }
    const handleEmptyTracks = () =>{
        SongService.getRandomSong()
            .then(res=>{
                dispatch(setSong(res.data.data))
                dispatch(addSongIntoPlayList(res.data.data))
            })
            .catch(err=>{
                console.log(err);
            })
    }

    useEffect(()=>{
        if(song.songName) {
            const songExist = tracks.some(e => e.songName === song.songName)
            if(songExist){
                const songIndex = tracks.findIndex(e => e.songName === song.songName);
                setCurrentTrackIndex(songIndex)
            } else {
                dispatch(addSongIntoPlayList(song))
                if(tracks.length===0) setCurrentTrackIndex(0)
                else {setCurrentTrackIndex(tracks.length)}
            }
        }
    },[song])

    
    useEffect(()=>{
        console.log(tracks); // you can use this to monitor the tracklist using in playbar
    },[tracks])
    
    useEffect(()=>{
        if(playingMusic) handlePlay()
        else handlePause()
    },[playingMusic]);

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


            <div
                style={{
                    backgroundColor: "black",
                    width: "100%",
                    height: isPlaying ? "130px" : "0%",
                    // padding: "0px 30px 20px 30px",
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
                        height: "91%",
                        objectFit: "cover",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    {song.songName && tracks[currentTrackIndex] ? (

                        <img
                            src={tracks[currentTrackIndex].avatar}
                            alt="img"
                            style={{width: "50%", height: "100%", borderRadius: "5px"}}
                        />
                    ) : (
                        <img
                            src="https://steamcommunity-a.akamaihd.net/public/images/profile/2020/bg_dots.png"
                            alt="img"
                            style={{width: "50%", height: "100%", borderRadius: "5px"}}
                        />
                    )}

                    <div style={{color: "#fff", background: "black", width: "78%"}}>
                        {song.songName && tracks[currentTrackIndex] ? <h3 style={{background: "black", marginTop: "10px", marginLeft: "10px"}}>{song.songName}</h3> :
                            <h3 style={{marginTop: "10px", marginLeft: "10px", background: "black"}}>...</h3>}
                        {song.songName && tracks[currentTrackIndex] ?
                            <p style={{fontSize: "12px", background: "black", marginTop: "10px", marginLeft: "10px"}}>{song.songName}</p> :
                            <p style={{background: "black", fontSize: "12px", marginTop: "10px", marginLeft: "10px"}}>...</p>}
                    </div>
                </div>
                {
                    song.songName && tracks[currentTrackIndex]? <ReactH5AudioPlayer
                            ref={audioRef}
                            src={tracks[currentTrackIndex].fileURL}
                            layout="stacked-reverse"
                            volume={1.0}
                            autoPlay
                            showSkipControls={true}
                            progressJumpStep={5000}
                            onPlay={handlePlayButton}
                            onPause={handlePauseButton}
                            onClickPrevious={handlePreTrack}
                            onClickNext={handleNextTrack}
                            onEnded={handleNextTrack}
                            style={{
                                color: "white",
                                width: "60%",
                                height: isPlaying ? "100px" : "0%",
                                margin: "0 auto",
                                backgroundColor: "#131313",
                                // padding: "0% 20px 16px 20px",
                                borderRadius: "10px",
                            }}
                        /> :
                        <ReactH5AudioPlayer
                            ref={audioRef}
                            src={"https://firebasestorage.googleapis.com/v0/b/budget-spotify.appspot.com/o/placeholders%2FMp3%20placeholder.mp3?alt=media&token=61efdf22-c1fa-4a93-ada0-ae5629ff565f"}
                            layout="stacked-reverse"
                            volume={1.0}
                            showSkipControls={true}
                            progressJumpStep={5000}
                            onPlay={handleEmptyTracks}
                            style={{
                                color: "white",
                                width: "62%",
                                height: "0%",
                                margin: "0 auto",
                                backgroundColor: "#131313",
                                // padding: "0% 20px 16px 20px",
                                borderRadius: "10px",
                            }}
                        />
                }
            </div>
        </>
    );
}
