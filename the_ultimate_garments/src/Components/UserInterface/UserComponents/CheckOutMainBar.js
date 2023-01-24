import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function CheckOutMainBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{background:'white'}}>
        <Toolbar>
        <Box
            component="img"
            sx={{
              height: 50,
              maxHeight: { xs: 150, md: 150 },
              maxWidth: { xs: 350, md: 250 },
              padding: '10px'
            }}
            alt="The house from the offer."
            src="/1.jpeg"
          />
          <div style={{display:'flex',justifyContent:'flex-end', alignItems:'flex-end',width:'100%'}}>

            <img src='/shield.svg' height='50'/>
           <div style={{fontSize:'20px',color:'black'}}> 100% SECURE PAYMENT</div>
          </div>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}



