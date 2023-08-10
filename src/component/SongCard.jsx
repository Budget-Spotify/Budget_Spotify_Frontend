import React, {useEffect, useState} from 'react'
import "./component.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from "react-redux";
import {setSong} from "../redux/features/songs/songSlice";
import {setPlayBar,setPlay} from "../redux/features/musicPlayBar/playBarSlice";

export default function SongCard({songUrl, image, title, artist, id, song}) {
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(false);
    const currentSong = useSelector(state => state.song.song)
    const playingMusic = useSelector(state => state.playBar.playingMusic);
    useEffect(()=>{
        if(song.songName===currentSong.songName) setFlag(playingMusic)
    },[playingMusic])

    return (
        <div className='songCardDiv'>
            <img src={image} alt="image"/>
            {
                flag ? (
                    <button onClick={() => {
                        dispatch(setSong(song));
                        dispatch(setPlay(false))
                        setFlag(false);
                    }}>
                        <FontAwesomeIcon icon={faPause}/>
                    </button>
                ) : (
                    <button onClick={() => {
                        if(song.songName!==currentSong.songName){
                            dispatch(setSong(song));
                        }
                        dispatch(setPlay(true));
                        dispatch(setPlayBar(true));
                        setFlag(true);
                    }}>
                        <FontAwesomeIcon icon={faPlay}/>
                    </button>
                )
            }
            <h3>{title}</h3>
            <p>{artist}</p>
        </div>
    )
}
