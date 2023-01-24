import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



export default function AdminAppBar() {

    
    return (<div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: "#95a5a6" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, color: 'black' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                        The Ultimate Garments                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    </div>)
}