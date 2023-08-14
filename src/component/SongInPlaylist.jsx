import MenuAppBar from "./NavBar";
import Footer from "./Footer";
import * as React from "react";
import {styled} from "@mui/system";
import {useEffect, useState} from "react";
import UserService from "../services/user.service";
import {Link, useParams} from "react-router-dom";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import {setSong as setCurrentSong, setSong} from "../redux/features/songs/songSlice";
import {setPlay, setPlayBar} from "../redux/features/musicPlayBar/playBarSlice";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import {useDispatch} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

export default function SongInPlaylist() {
    const dispatch = useDispatch();
    const params = useParams();
    const [songsListChange, setSongsListChange] = useState(null);
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchData, setSearchData] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        UserService.getSongInPlaylist(params.playlistId, accessToken)
            .then(res => setData(res.data.playlist))
            .catch(e => {
                console.log(e)
            });
    }, [songsListChange]);

    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        UserService.searchSong(searchInput, accessToken)
            .then(res => {
                setSearchData(res)
                setSongsListChange(res)
            })
            .catch(e => {
                console.log(e)
            });
    }, [searchInput]);

    const addSongToPlaylist = (songId) => {
        const accessToken = localStorage.getItem("token");
        UserService.addSongToPlaylist(params.playlistId, songId, accessToken)
            .then(res => {
                setSongsListChange(res)
            })
            .catch(e => {
                console.log(e)
            });
    }
    const removeSongToPlaylist = (songId) => {
        const accessToken = localStorage.getItem("token");
        UserService.removeSongFromPlaylist(params.playlistId, songId, accessToken)
            .then(res => {
                setSongsListChange(res)
            })
            .catch(e => {
                console.log(e)
            });
        handleClose();
    }

    return (
        <Root>
            <MenuAppBar/>
            {/*<section style={{*/}
            {/*    position: "relative",*/}
            {/*    overflow: "hidden",*/}
            {/*    backgroundColor: '#685A89',*/}
            {/*    maxHeight: "250px",*/}
            {/*    marginBottom: "20px"*/}
            {/*}}>*/}
            {/*    <img*/}
            {/*        src={data?.avatar}*/}
            {/*        alt="This is a Picture"*/}
            {/*        style={{maxWidth: "25%", maxHeight: "100%"}}*/}
            {/*    />*/}
            {/*    <div*/}
            {/*        style={{*/}
            {/*            position: "absolute",*/}
            {/*            top: "45%",*/}
            {/*            left: "27%",*/}
            {/*            transform: "translateY(-50%)",*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <div style={{fontSize: "0.9rem"}}>*/}
            {/*            Playlist*/}
            {/*        </div>*/}
            {/*        <div style={{fontSize: "4rem"}}>*/}
            {/*            {data?.playlistName}*/}
            {/*        </div>*/}
            {/*        <div style={{fontSize: "0.9rem", marginLeft: "100%", width: "100%"}}>*/}
            {/*            {data?.songs?.length} songs*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <Card
                sx={{
                    backgroundColor: 'black'
                }}
            >
                <Stack direction={'row'}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={data?.avatar}
                        alt="Paella dish"
                        sx={{
                            width: '192px',
                            height: '192px'
                        }}
                    />
                    <CardContent style={{flexGrow: '1'}}>
                        <Typography
                            variant="body2"
                            style={{
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: '700',
                            }}>
                            Playlist
                        </Typography>
                        <Typography
                            variant="body2"
                            style={
                                data?.playlistName?.length > 21 ?
                                    {
                                        color: 'white',
                                        fontSize: '4rem',
                                        fontWeight: '900',
                                    } :
                                    {
                                        color: 'white',
                                        fontSize: '5rem',
                                        fontWeight: '900',
                                    }
                            }
                        >
                            {data?.playlistName}
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: '700',
                            }}>
                            {data?.songs?.length} songs
                        </Typography>
                    </CardContent>
                </Stack>
            </Card>


            <table aria-label="custom pagination table">
                <thead>
                <tr>
                    <th>Song</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {data?.songs?.map(song => (
                    <tr key={song._id}>
                        <td colSpan={6} style={{backgroundColor: 'grey'}}>
                            <Card
                                sx={{
                                    backgroundColor: 'black'
                                }}
                            >
                                <Stack direction={'row'}>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={song?.avatar}
                                        alt="Paella dish"
                                        onClick={() => {
                                            dispatch(setSong(song));
                                            dispatch(setPlayBar(true));
                                        }}
                                        sx={{
                                            width: '100px',
                                            height: '100px',
                                            cursor: "pointer",
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            flexGrow: '1',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <Stack direction={'column'}>
                                            <Typography
                                                variant="body2"
                                                style={{
                                                    color: 'white',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                }}>
                                                <Link to={`/song/detail/${song._id}`}>
                                                    {song.songName}
                                                </Link>
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                style={{
                                                    color: 'white',
                                                    fontSize: '12px',
                                                    fontWeight: '400',
                                                }}>
                                                {song.singers[0] ? song.singers[0].name : 'Unknown Singer'}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            style={{
                                                color: 'white',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                paddingRight: '180px',
                                                paddingTop: '25px',
                                            }}>
                                            Time
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteBorderIcon
                                                fontSize='large'
                                                sx={{
                                                    color: '#1ed760',
                                                }}
                                            />
                                        </IconButton>
                                        <div>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={handleOpen}
                                            >
                                                <DeleteIcon
                                                    sx={{
                                                        color: '#ce4242',
                                                    }}
                                                />
                                            </IconButton>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography variant="h6" component="h2" gutterBottom>
                                                        <span style={{
                                                            color: 'white',
                                                            backgroundColor: 'black'
                                                        }}>FBI </span>
                                                        <span style={{
                                                            color: 'black',
                                                            backgroundColor: 'orange'
                                                        }}>WARNING!</span>
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        Are you sure you want to delete this item? This action cannot be
                                                        undone.
                                                    </Typography>
                                                    <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                                                        <Button variant="outlined" onClick={handleClose} sx={{mr: 2}}>
                                                            CANCEL
                                                        </Button>
                                                        <Button variant="contained" onClick={() => {
                                                            removeSongToPlaylist(song._id)
                                                        }} color="error">
                                                            OK
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Modal>
                                        </div>
                                    </CardActions>
                                </Stack>
                            </Card>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
            <input
                className="w-70 h-10 rounded-md border border-gray-400 px-4 bg-black text-white "
                type="text"
                placeholder="Search Songs"
                onChange={(e) => {
                    setSearchInput(e.target.value);
                }}
                style={{width: "100%"}}
            />

            <table>
                <thead>
                <tr>
                    <th>Song</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {searchData.data && searchData.data.length > 0 ? (
                    searchData.data.map((song) => (
                        <tr key={song._id}>
                            <td colSpan={6} style={{backgroundColor: 'grey'}}>
                                <Card
                                    sx={{
                                        backgroundColor: 'black'
                                    }}
                                >
                                    <Stack direction={'row'}>
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={song?.avatar}
                                            alt="Paella dish"
                                            onClick={() => {
                                                dispatch(setSong(song));
                                                dispatch(setPlayBar(true));
                                            }}
                                            sx={{
                                                width: '100px',
                                                height: '100px',
                                                cursor: "pointer",
                                            }}
                                        />
                                        <CardContent
                                            sx={{
                                                flexGrow: '1',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                            }}
                                        >
                                            <Stack direction={'column'}>
                                                <Typography
                                                    variant="body2"
                                                    style={{
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                    }}>
                                                    <Link to={`/song/detail/${song._id}`}>
                                                        {song.songName}
                                                    </Link>
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    style={{
                                                        color: 'white',
                                                        fontSize: '12px',
                                                        fontWeight: '400',
                                                    }}>
                                                    {song.singers[0] ? song.singers[0].name : 'Unknown Singer'}
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                        <CardContent>
                                            <Typography
                                                variant="body2"
                                                style={{
                                                    color: 'white',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    paddingRight: '210px',
                                                    paddingTop: '25px',
                                                }}>
                                                Time
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <Button
                                                variant="outlined"
                                                onClick={() => addSongToPlaylist(song._id)}
                                                sx={{
                                                    borderColor: 'white',
                                                    color: 'white',
                                                    borderRadius: '500px',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                        backgroundColor: 'black',
                                                        fontWeight: 600,
                                                        borderColor: 'white',
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </CardActions>
                                    </Stack>
                                </Card>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No results found</td>
                    </tr>
                )}
                </tbody>
            </table>

            <Footer/>
        </Root>
    );
}

const rootSx = {
    marginLeft: "20.5%",
    marginBottom: "155px",
    marginRight: "1%",
    color: "#fff",
    padding: "75px 20px 20px 20px",
    background: "black",
    borderRadius: "10px",
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
            text-align: left;
            padding: 8px;
        }

        th {
            background-color: ${theme.palette.mode === 'dark' ? grey[900] : 'grey'};
        }
    `,
    rootSx
);

const grey = {
    200: '#d0d7de',
    800: '#32383f',
    900: '#24292f',
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    color: 'black',
};