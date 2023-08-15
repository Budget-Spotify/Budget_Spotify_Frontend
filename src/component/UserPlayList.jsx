import * as React from "react";
import MenuAppBar from "./NavBar";
import Footer from "./Footer";
import {styled} from "@mui/system";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import MusicPlayBar from "./MusicPlayBar";
import UserService from "../services/user.service";
import AddPlaylist from "./AddPlaylist";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeletePlayListModal from "./DeletePlaylist";
import EditPlaylist from "./EditPlayList";
import {useNavigate} from "react-router-dom";
import { useOutletContext } from "react-router-dom";
const ITEM_HEIGHT = 48;

function PlayListCard({playlist, image, title, time, reload, playlistId}) {
    const [flag, setFlag] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewPlaylist = (playlistId) => {
        const accessToken = localStorage.getItem("token");
        navigate(`/playlists/song-in-play-list/${playlistId}`)
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
                    style={{float: 'right'}} // Dropdown
                >
                    <MoreVertIcon style={{transform: 'rotate(90deg)', color: 'white'}}/>
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
                        <DeletePlayListModal reload={reload} playlist={playlist}/>
                    </MenuItem>
                    <MenuItem>
                        <EditPlaylist reload={reload} playlist={playlist}/>
                    </MenuItem>
                    <MenuItem>
                        <p onClick={() => {
                            handleViewPlaylist(playlistId)
                        }}>View playlist</p>
                    </MenuItem>
                </Menu>
            </div>
            <img src={image} alt="image"/>

            <button onClick={() => {
                setFlag(true)
            }}><FontAwesomeIcon icon={faPlay}/></button>
            <h3>{title}</h3>
            <p>updated on: {time}</p>
            {flag && <MusicPlayBar image={image} title={title} time={time}/>}
        </div>
    )
}

export default function UserPlaylist() {
    const search = useOutletContext()
    const [data, setData] = useState([]);
    const [playListChange, setPlayListChange] = useState(null);
    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        UserService.getPlaylist()
            .then(res => {
                setData(res.data.data);
            })
            .catch(e => {
                console.log(e)
            })
    }, [playListChange]);

    return (
        <Root
            sx={{
                marginLeft: "20.5%",
                marginBottom: "155px",
                marginRight: "1%",
                color: "#fff",
                padding: "75px 20px 20px 20px",
                background: "black",
                borderRadius: "10px",
            }}
        >
            <MenuAppBar search={search}/>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5,1fr)",
                    marginTop: "40px",
                    gap: "30px 20px",
                }}
            ><AddPlaylist reload={setPlayListChange}/>
                {data.map((e, index) => {
                    return (
                        <PlayListCard
                            playlist={e}
                            image={e.avatar}
                            title={e.playlistName}
                            time={e.uploadTime}
                            playlistId={e._id}
                            key={index}
                            reload={setPlayListChange}
                        />
                    );
                })}
            </div>
            <Footer/>
        </Root>
    );
}

const grey = {
    200: '#d0d7de',
    800: '#32383f',
    900: '#24292f',
};

const Root = styled('div')(
    ({theme}) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : 'grey'};
  }
  `,
);