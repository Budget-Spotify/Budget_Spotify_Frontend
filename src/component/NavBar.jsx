import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useState} from "react";
import {Avatar} from "@mui/material";
import {Link, useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";


export default function MenuAppBar() {
    const navigate = useNavigate()
    const userLoginJSON = localStorage.getItem('userLogin');
    const userLogin = JSON.parse(userLoginJSON);
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userLogin');
        navigate('/');
    }
    return (
        <Box sx={{flexGrow: 1, position: 'fixed', top: 0, zIndex: 999, width: '77%'}}>
            <AppBar position="static" sx={{backgroundColor: 'black'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>

                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                onClick={handleMenu}
                                size="small"
                                sx={{ml: 2}}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >   {userLogin ? (
                                userLogin.avatar ? (
                                    <Avatar sx={{width: 38, height: 38}}>
                                        <img src={userLogin.avatar}></img>
                                    </Avatar>
                                ) : (
                                    <Avatar sx={{width: 38, height: 38}}>{userLogin.firstName.charAt(0)}</Avatar>
                                )
                            ) : (
                                <>
                                    <Button color="inherit"
                                            component={Link}
                                            to='/signup'
                                            sx={{
                                                backgroundColor: "black",
                                                borderRadius: "30px",
                                                color: "#fffa",
                                                textDecoration: "none",
                                                width: "120px",
                                                height: "55px",
                                                '&:hover': {
                                                    backgroundColor: "black",
                                                    color: "white",
                                                    fontWeight: 'bold',
                                                },
                                            }}
                                    >
                                        <b>Sign up</b>
                                    </Button>
                                    <div style={{position: 'relative', width: '145px', height: '50px'}}>
                                        <Button color="inherit"
                                                component={Link}
                                                to='/login'
                                                sx={{
                                                    backgroundColor: "white",
                                                    borderRadius: "30px",
                                                    color: "black",
                                                    textDecoration: "none",
                                                    width: "100%",
                                                    height: "100%",
                                                    '&:hover': {
                                                        backgroundColor: "white",
                                                        color: "black",
                                                        height: "51px",
                                                        width: "146px",
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                        >
                                            <b>Log in</b>
                                        </Button>
                                    </div>
                                </>
                            )}

                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            >
                                {userLogin ? (
                                        <div>
                                            <MenuItem><Link style={{width: '100%', display: 'block'}}
                                                            to={`/info/detail`}>Profile</Link></MenuItem>
                                            <MenuItem><Link style={{width: '100%', display: 'block'}}
                                                            to={'/info/editpassword'}>Change Password</Link></MenuItem>
                                            <MenuItem onClick={handleLogout}>Log out</MenuItem>
                                        </div>) :
                                    (
                                        <div>
                                            <MenuItem><Link to={'/login'}>Login</Link></MenuItem>
                                        </div>
                                    )
                                }
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}