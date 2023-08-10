import * as React from "react";
import MenuAppBar from "./NavBar";
import Footer from "./Footer";
import {styled} from "@mui/system";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import MusicPlayBar from "./MusicPlayBar";
import UserService from "../services/user.service";
import {setSong} from "../redux/features/songs/songSlice";
import SongCard from "./SongCard";

function PlayListCard({songUrl, image, title, artist, id}) {
    const [flag, setFlag] = useState(false)
    return (
        <div className='songCardDiv'>
            <img src={image} alt="image"/>
            <button onClick={() => {
                setFlag(true)
            }}><FontAwesomeIcon icon={faPlay}/></button>
            <h3>{title}</h3>
            <p>{artist}</p>
            {flag && <MusicPlayBar id={id} songUrl={songUrl} image={image} title={title} artist={artist}/>}
        </div>
    )
}

export default function Playlist() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        UserService.getPlaylist(accessToken)
            .then(res => {
                setData(res.data.data);
            })
            .catch(e => {
                console.log(e)
            })
    }, []);

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
            <MenuAppBar/>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5,1fr)",
                    marginTop: "40px",
                    gap: "30px 20px",
                }}
            >
                {data.map((e, index) => {

                    return (
                        <SongCard
                            image={e.avatar}
                            title={e.playlistName}
                            artist={e.description}
                            key={index}
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