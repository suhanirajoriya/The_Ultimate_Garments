import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { AccountCircle } from '@material-ui/icons';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Slide from '@mui/material/Slide';

import Button from '@mui/material/Button';

import InputAdornment from '@mui/material/InputAdornment';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function MainBar() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const dialogShow = () => {


    return (
      <div>
        <Dialog
          open={open}
          PaperProps={{ sx: { position: "fixed", top: 30, right: 20, m: 0, width: "30%", height: "65%", borderRadius: '3%' } }}
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-describedby="alert-dialog-slide-description"
        >

          <DialogContent>
            <div style={{ fontSize: '30px', fontWeight: "bold", fontFamily: 'sans-serif' }}> Hii...</div>
            <div style={{ fontSize: '23px', fontFamily: 'ibm_plex_sansregular', paddingTop: '4%' }}>Please enter your mobile numer to login</div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%' }}>
              <div style={{}}>
                <TextField

                  id="outlined-start-adornment"
                  variant='standard'
                  sx={{ m: 1, width: '25ch', color: 'black' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                  }}
                />
              </div>
              <div>
                <Fab sx={{ background: 'black' }} aria-label="add">
                  <ArrowForwardIcon sx={{ color: '#95a5a6' }} />
                </Fab>
              </div>
            </div>
            <div style={{ width: '60%', marginTop: '2%', color: '#7f8c8d' }}>OTP will be sent to this number by SMS and WhatsApp. By signing up, I agree to the Privacy Policy,Terms and Conditions of The Ultimate Garments</div>

          </DialogContent>

        </Dialog>
      </div>
    );
  }



  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing('15%'),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(6),
      width: '90%',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));



  return (<div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'black' }}>
        <Toolbar>

          <Box
            component="img"
            sx={{
              height: 90,
              maxHeight: { xs: 150, md: 150 },
              maxWidth: { xs: 350, md: 250 },
              padding: '10px'
            }}
            alt="The house from the offer."
            src="/TUG logo.png"
          />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Search style={{ width: '30%' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <InputBase
                sx={{ marginLeft: '1.5cm', color: 'white' }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </div>
          <div>
            <div onClick={handleClickOpen} style={{ fontSize: 11, width: '80px', cursor: 'pointer' }} >
              LOGIN | SIGNUP
            </div>

          </div>
        </Toolbar>

      </AppBar>

    </Box >

    {dialogShow()}
  </div>
  );
}
