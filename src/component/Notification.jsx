import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import {useState} from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Notification() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

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