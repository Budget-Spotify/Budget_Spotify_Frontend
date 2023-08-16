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
export default function PlaylistDetail() {
    const search = useOutletContext();
    const dispatch = useDispatch();
    const params = useParams();
    const [songsListChange, setSongsListChange] = useState(null);
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchData, setSearchData] = useState([]);
    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        SongService.getPublicPlaylist(params.playlistId, accessToken)
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
    return (
        <Root>
            <MenuAppBar search={search}/>
            <section style={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: '#685A89',
                maxHeight: "250px",
                marginBottom: "20px"
            }}>
                <img
                    src={data?.avatar}
                    alt="This is a Picture"
                    style={{ maxWidth: "25%", maxHeight: "100%" }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "45%",
                        left: "27%",
                        transform: "translateY(-50%)",
                    }}
                >
                    <div style={{ fontSize: "0.9rem" }}>
                        Playlist
                    </div>
                    <div style={{ fontSize: "4rem" }}>
                        {data?.playlistName}
                    </div>
                    <div style={{ fontSize: "0.9rem", marginLeft: "100%", width: "100%" }}>
                        {data?.songs?.length} songs
                    </div>
                </div>
            </section>


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
                                        <CardContent>
                                            <Typography
                                                variant="body2"
                                                style={{
                                                    color: 'white',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    paddingRight: '142.5px',
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