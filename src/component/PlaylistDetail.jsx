import MenuAppBar from "./NavBar";
import Footer from "./Footer";
import * as React from "react";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import UserService from "../services/user.service";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import { setSong } from "../redux/features/songs/songSlice";
import { setPlayBar } from "../redux/features/musicPlayBar/playBarSlice";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import SongService from "../services/song.service";
import { useOutletContext } from "react-router-dom";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function PlaylistDetail() {
    const search = useOutletContext();
    const dispatch = useDispatch();
    const params = useParams();
    const [songsListChange, setSongsListChange] = useState(null);
    const [data, setData] = useState([]);
    const [isPlay, setIsPlay] = useState(false);
    const [favorite, setFavorite] = React.useState(false);
    const [handleFavoriteClickTime, setHandleFavoriteClickTime] = React.useState(0);
    let playlistId = useParams().playlistId;
    const userInfo = JSON.parse(localStorage.getItem('userLogin'));


    const handleClickPlayPause = () => setIsPlay(!isPlay);
    useEffect(() => {
        SongService.getPublicPlaylist(params.playlistId)
            .then(res => {
                setData(res.data.playlist)
                const playlistLikeCounts = res.data.playlist?.playlistLikeCounts;
                playlistLikeCounts?.forEach(
                    like => {
                        like.user === userInfo._id ? setFavorite(true) : setFavorite(false);
                    }
                )
            })
            .catch(e => {
                console.log(e)
            });
    }, [songsListChange]);

    const handleFavoriteClick = async () => {
        try {
            !favorite
                ? await UserService.submitLikePlaylist(playlistId)
                : await UserService.submitDislikePlaylist(playlistId);

            setHandleFavoriteClickTime(handleFavoriteClickTime + 1);
            setFavorite(!favorite);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Root>
            <MenuAppBar search={search} />
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
                    <CardContent style={{ flexGrow: '1' }}>
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
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <img
                                src={data?.uploader?.avatar}
                                alt="error"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '100%'
                                }}
                            />
                            &nbsp;{data?.uploader?.lastName + " " + data?.uploader?.firstName} &bull; {data?.songs?.length} songs
                        </Typography>
                    </CardContent>
                </Stack>
                <CardActions disableSpacing>
                        {
                            isPlay ?
                                (
                                    <IconButton
                                        aria-label="pause"
                                        onClick={() => handleClickPlayPause()}
                                    >
                                        <PauseCircleIcon
                                            fontSize='large'
                                            sx={{
                                                color: '#1ed760',
                                                fontSize: 60,
                                            }}
                                        />
                                    </IconButton>
                                ) :
                                (
                                    <IconButton
                                        aria-label="play"
                                        onClick={() => handleClickPlayPause()}
                                    >
                                        <PlayCircleIcon
                                            fontSize='large'
                                            sx={{
                                                color: '#1ed760',
                                                fontSize: 60,
                                            }}
                                        />
                                    </IconButton>
                                )
                        }
                    <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
                        {
                            favorite ?
                                (
                                    <FavoriteIcon
                                        fontSize='large'
                                        sx={{
                                            color: '#1ed760'
                                        }}
                                    />
                                ) :
                                (
                                    <FavoriteBorderIcon
                                        fontSize='large'
                                        sx={{
                                            color: '#1ed760',
                                        }}
                                    />
                                )
                        }
                    </IconButton>
                    </CardActions>
            </Card>

            <table aria-label="custom pagination table">
                <thead>
                    <tr>
                        <th>Song</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {data?.songs?.map(song => (
                        <tr key={song._id}>
                            <td colSpan={6} style={{ backgroundColor: 'grey' }}>
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
                                                    {new Date(song.uploadTime).toLocaleDateString()}
                                                </Typography>
                                            </Stack>
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
                                        </CardActions>
                                    </Stack>
                                </Card>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
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
    ({ theme }) => `
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