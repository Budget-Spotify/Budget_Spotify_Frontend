import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import {useState, useEffect} from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Notification() {
    const userInfo = JSON.parse(localStorage.getItem('userLogin'));
    const userId = userInfo._id;
    const [anchorEl, setAnchorEl] = useState(null);

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
            console.log(eventData)
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
                <Box
                    sx={{
                        border: 1,
                        p: 1,
                        bgcolor: 'grey',
                        marginTop: '10%',
                        marginRight: '45%',
                        marginLeft: '-45%',
                    }}
                >
                    The content of the Popper.
                </Box>
            </Popper>
        </div>
    );
}