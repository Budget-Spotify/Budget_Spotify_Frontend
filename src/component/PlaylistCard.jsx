import * as React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function PlaylistCard({ playlist,playlistId }) {
    const [flag, setFlag] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewPlaylist = (playlistId) => {
        navigate(`/playlist/detail/${playlistId}`)
        }
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
            <button onClick={() => {
                setFlag(true)
            }}><FontAwesomeIcon icon={faPlay} /></button>
            <h3>{playlist?.playlistName}</h3>
            <p>updated on: {playlist?.uploadTime}</p>
            </div>
    )
}