import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import {useState, useEffect} from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Notification() {
    const userInfo = JSON.parse(localStorage.getItem('userLogin'));
    const userId = userInfo._id;
    const [anchorEl, setAnchorEl] = useState(null);
    const [allNotify, setAllNotify] = useState([]);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    useEffect(() => {
        const eventSource = new EventSource(
            "http://localhost:8000/sse/notifyInNavbar/" + userId
        );

        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            console.log(eventData.allNotifyOfUploader.reverse());
            setAllNotify(eventData.allNotifyOfUploader.reverse());
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
                style={{
                    position: "absolute",
                    zIndex: 1000,
                }}
            >

                {allNotify.map(notify => (
                    <Box
                        key={notify._id}
                        sx={{
                            border: 1,
                            p: 1,
                            bgcolor: 'grey',
                            marginTop: '1%',
                            marginRight: '27%',
                            marginLeft: '-45%',
                        }}
                    >
                        {`${notify.sourceUser.username} ${notify.action} on the ${notify.entityType} ${(notify.entityType === "Songs") ? notify.entity.songName : notify.entity.playlistName}`}
                    </Box>
                ))}

            </Popper>
        </div>
    );
}
