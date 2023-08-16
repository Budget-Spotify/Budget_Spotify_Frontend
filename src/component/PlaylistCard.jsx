import * as React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
const ITEM_HEIGHT = 48;

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
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{ float: 'right' }} // Dropdown
                >
                    <MoreVertIcon style={{ transform: 'rotate(90deg)', color: 'white' }} />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    <MenuItem>
                        <p onClick={() => {
                            handleViewPlaylist(playlistId)
                        }}>View playlist</p>
                    </MenuItem>
                </Menu>
            </div>
            <img src={playlist?.avatar} alt="image" />

            <button onClick={() => {
                setFlag(true)
            }}><FontAwesomeIcon icon={faPlay} /></button>
            <h3>{playlist?.playlistName}</h3>
            <p>updated on: {playlist?.uploadTime}</p>
            </div>
    )
}