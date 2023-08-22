import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import {useState, useEffect} from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Notification.css';
import Stack from "@mui/material/Stack";
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

export default function Notification() {
    const userInfo = JSON.parse(localStorage.getItem('userLogin'));
    const userId = userInfo._id;
    const [anchorEl, setAnchorEl] = useState(null);
    const [allNotify, setAllNotify] = useState([]);
    const [seen, setSeen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClickNotice = () => {
        setSeen(!seen);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    useEffect(() => {
        const eventSource = new EventSource(
            "http://localhost:8000/sse/notifyInNavbar/" + userId
        );

        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            setAllNotify(eventData.allNotifyOfUploader);
        };

        eventSource.onerror = (error) => {
            console.error("SSE Error:", error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <NotificationsIcon onClick={handleClick}/>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                className="popper-container"
            >
                {
                    allNotify.length === 0
                        ? <div className="notification-box"
                               style={{
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                               }}
                        >
                            <Stack
                                direction={"column"}
                                alignItems={"center"}
                            >
                                <NotificationsOffIcon
                                    sx={{
                                        fontSize: '50px'
                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: '25px'
                                    }}
                                >
                                    No notice
                                </p>
                            </Stack>
                        </div>
                        : (
                            <div
                                className="notification-box"
                            >
                                {allNotify.map(notify => (
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        gap={1}
                                        className="notification"
                                        key={notify._id}
                                        onClick={() => handleClickNotice()}
                                        style={{
                                            color: seen ? "gray" : "white"
                                        }}
                                    >
                                        <img
                                            src={notify.sourceUser.avatar}
                                            alt="Error"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Box
                                            style={{
                                                overflowWrap: 'break-word'
                                            }}
                                        >
                                            {`${notify.sourceUser.firstName} ${notify.action} on the ${notify.entityType} ${(notify.entityType === "Songs") ? notify.entity.songName : notify.entity.playlistName}`}
                                        </Box>
                                    </Stack>
                                ))}
                            </div>
                        )
                }
            </Popper>
        </div>
    );
}
