import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PlaceIcon from '@mui/icons-material/Place';
import MainBar2 from './MainBar2';

export default function ProductInfoUpBar() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static" style={{ background: 'yellow' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black', padding: '0.3%', fontSize: 15 }}>
                    <span style={{ fontWeight: 600 }}> Free Shipping on All Orders | </span>Get Extra ₹100 OFF on Spent of ₹999 Use Code: <span style={{ fontWeight: 600 }}> THEULTIMATE100</span>
                </div>
            </AppBar>
            <AppBar position="static" style={{ background: 'black',height:'30px',display:'flex',justifyContent:"center" }}>
                <div>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"


                    >
                        <PlaceIcon sx={{ fontSize: 15 }} />
                    </IconButton>
                    <Typography component="div" sx={{ flexGrow: 1, fontSize: 11 }}>
                        TRACK ORDER
                    </Typography>

                    <div style={{fontSize:11}} >
                        LOGIN | SIGNUP
                    </div>

                </Toolbar>
                </div>
            </AppBar>
            <MainBar2/>
        </Box>
    );
}

