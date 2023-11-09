import * as React from "react";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import Stack from "@mui/material/Stack";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {setPlayList, setSong} from "../redux/features/songs/songSlice";
import {setPlay, setPlayBar} from "../redux/features/musicPlayBar/playBarSlice";
import {useDispatch, useSelector} from "react-redux";

export default function PlaylistCard({playlist, playlistId, likes}) {
    const [flag, setFlag] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const [isPlay, setIsPlay] = useState(false);
    const currentPlaylist = useSelector(state => state.song.currentPlaylist);
    const dispatch = useDispatch();
    const isPlayingMusic = useSelector(state => state.playBar.playingMusic);
    const handleViewPlaylist = (playlistId) => {
        navigate(`/playlist/detail/${playlistId}`)
    }

    const formatUploadTime = (uploadTime) => {
        const date = new Date(uploadTime);
        const dateString = date.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: '2-digit'});
        const timeString = date.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
        return `${dateString} ${timeString}`;
    }

    const handlePlay = () => {
        if (playlist.playlistName !== currentPlaylist.playlistName) {
            dispatch(setPlayList({
                playlistName: playlist.playlistName,
                songs: playlist.songs
            }))
            dispatch(setSong(playlist.songs[0]))
        }
        dispatch(setPlayBar(true))
        setIsPlay(true)
    }
    const handlePause = () => {
        setIsPlay(false)
    }
    useEffect(() => {
        if (playlist.playlistName === currentPlaylist.playlistName) {
            dispatch(setPlayBar(true))
            dispatch(setPlay(isPlay))
        }
    }, [isPlay])

    useEffect(() => {
        if (playlist.playlistName !== currentPlaylist.playlistName) setIsPlay(false)
        else setIsPlay(isPlayingMusic)
    }, [isPlayingMusic, currentPlaylist])

    return (
        <div className='songCardDiv'>
            <img
                src={playlist?.avatar}
                alt="image"
                onClick={() => {
                    handleViewPlaylist(playlistId)
                }}
                className="scale-img"
            />
            {
                isPlay
                    ? (
                        <button
                            onClick={handlePause}
                        >
                            <FontAwesomeIcon icon={faPause}/>
                        </button>
                    )
                    : (
                        <button
                            onClick={handlePlay}
                        >
                            <FontAwesomeIcon icon={faPlay}/>
                        </button>
                    )
            }
            <h3>{playlist?.playlistName}</h3>
            <Stack
                direction='row'
                sx={{
                    fontSize: '12px'
                }}
            >
                <p>Updated on: {formatUploadTime(playlist?.uploadTime)}</p>
                <p
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: '-10%'
                    }}
                >
                    <FavoriteIcon
                        sx={{
                            fontSize: '12px',
                        }}
                    />
                    &nbsp;{likes}
                </p>
            </Stack>
        </div>
    )
}