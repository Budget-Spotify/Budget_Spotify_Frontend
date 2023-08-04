import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import MenuAppBar from "./NavBar";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import {useEffect} from "react";
import UserService from "../services/user.service";
import {useParams} from "react-router-dom";
import Footer from "./Footer";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function SongCardDetail() {
    const [expanded, setExpanded] = React.useState(false);
    const [favorite, setFavorite] = React.useState(false);
    const [isPlay, setIsPlay] = React.useState(false);
    const [song, setSong] = React.useState({});

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleFavoriteClick = () => {
        setFavorite(!favorite);
    }

    const handlePlayClick = () => {
        setIsPlay(!isPlay);
    }

    let songId = useParams();

    useEffect(() => {
        UserService.getOneSong(songId.id)
            .then(res => {
                setSong(res.data.song);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div
            style={{
                marginLeft: "20.5%",
                marginBottom: "155px",
                marginRight: "1%",
                color: "#fff",
                padding: "30px 20px 20px 20px",
                background: "black",
                borderRadius: "10px",
            }}
        >
            <MenuAppBar/>
            <br/>
            <br/>
            <Card
                sx={{
                    backgroundColor: 'black'
                }}
            >
                <Stack direction={'row'}>
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://images.genius.com/64e8b829027624906b9832567259a0e1.1000x1000x1.jpg"
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
                            Song
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                color: 'white',
                                fontSize: '6rem',
                                fontWeight: '900',
                            }}>
                            {song.songName}
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: '700',
                            }}>
                            {song.uploadTime}
                        </Typography>
                    </CardContent>
                </Stack>
                <CardActions disableSpacing>
                    <IconButton aria-label="play" onClick={handlePlayClick}>
                        {
                            isPlay ?
                                (
                                    <PauseCircleIcon
                                        fontSize='large'
                                        sx={{
                                            color: '#1ed760',
                                            fontSize: 60,
                                        }}
                                    />
                                ) :
                                (
                                    <PlayCircleIcon
                                        fontSize='large'
                                        sx={{
                                            color: '#1ed760',
                                            fontSize: 60,
                                        }}
                                    />
                                )
                        }
                    </IconButton>
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
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon
                            sx={{
                                color: '#1ed760'
                            }}
                        />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent style={{color: 'white'}}>
                        <Typography paragraph>Lyrics:</Typography>
                        <Typography paragraph>
                            {song.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            <Footer/>
        </div>
    );
}