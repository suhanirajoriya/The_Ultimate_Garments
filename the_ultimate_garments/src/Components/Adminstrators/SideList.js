import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from "@mui/material/List";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Divider from "@mui/material/Divider";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';
import { Link } from 'react-router-dom';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import GradientIcon from '@mui/icons-material/Gradient';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


export default function SideList() {
    return (

        <div>
            <Divider />
            <List component="nav">
                <React.Fragment>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </React.Fragment>
            </List>
            <List component="nav" >
                <Link to="/dashboard/displayallcategory" style={{textDecoration:'none',color:'black'}}>
                    <React.Fragment>
                        <ListItemButton>
                            <ListItemIcon>
                                <CropSquareIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories"  />
                        </ListItemButton>
                    </React.Fragment>
                </Link>

            </List>
            <List component="nav">
                <Link to="/dashboard/displaysubcategory"  style={{textDecoration:'none',color:'black'}}>
                    <React.Fragment>
                        <ListItemButton>
                            <ListItemIcon>
                                <AutoAwesomeMotionIcon  />
                            </ListItemIcon>
                            <ListItemText primary="Sub Categories" />
                        </ListItemButton>
                    </React.Fragment>
                </Link>
            </List>
            <List component="nav">
                <React.Fragment>
                    <Link to="/dashboard/displayproduct"  style={{textDecoration:'none',color:'black'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <CheckroomIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                        </ListItemButton>
                    </Link>
                </React.Fragment>
            </List>
            <List component="nav">
                <React.Fragment>
                    <Link to="/dashboard/displaycolor"  style={{textDecoration:'none',color:'black'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <GradientIcon />
                            </ListItemIcon>
                            <ListItemText primary="Color" />
                        </ListItemButton>
                    </Link>
                </React.Fragment>
            </List>
            <List component="nav">
                <React.Fragment>
                    <Link to="/dashboard/displaysize"  style={{textDecoration:'none',color:'black'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <FormatSizeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Size" />
                        </ListItemButton>
                    </Link>
                </React.Fragment>
            </List>
            <List component="nav">
                <React.Fragment>
                    <Link to="/dashboard/bannerimages"  style={{textDecoration:'none',color:'black'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddPhotoAlternateIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Banner Images" />
                        </ListItemButton>
                    </Link>
                </React.Fragment>
            </List>
           
            <List component="nav">
                <React.Fragment>
                    <Link to="/dashboard/productimages"  style={{textDecoration:'none',color:'black'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddPhotoAlternateIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Product Images" />
                        </ListItemButton>
                    </Link>
                </React.Fragment>
            </List>
           
            
           {/* 
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    Saved reports
                </ListSubheader>
                <ListItemButton>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Current month" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Last quarter" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Year-end sale" />
                </ListItemButton>
            </React.Fragment> */}

  
        </div >




    )
}