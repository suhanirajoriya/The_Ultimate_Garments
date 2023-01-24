import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Grid, TextField, Avatar } from "@material-ui/core";
import { getData, serverURL } from "../Services/NodeServices";
import { useStyles } from "./DisplayAllCategoryCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { postData } from "../Services/NodeServices";
import IconButton from '@mui/material/IconButton';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Swal from "sweetalert2";
import Button from '@mui/material/Button';

import { Navigate, useNavigate } from "react-router";
import { style } from "@mui/system";




export default function DisplayAllBanner(props) {

    const [banner,setBanner]=useState([])
 
 const fetchAllBanners=async()=>{
    var result =await getData('category/display_all_banner')
    alert(result.data)
    setBanner(result.data)
 }
 
    var classes = useStyles();
    useEffect(function () {
        fetchAllBanners()
    }, [])
    
   
    function displayBanner() {
        return (
            <MaterialTable
            style={{marginTop:'3%'}}
            
                title="DETAILS OF BANNERs"
                columns={[

                    {
                        title: 'Icon',

                        render: (rowData) => <img src={`${serverURL}/images/${rowData.icon}`} width='30' height='30' style={{ borderRadius: '10%' }} />
                    },

                ]}
                data={banner}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) =>"success"
                    },

                    {
                        icon: 'add',
                        tooltip: 'Add Category',
                     }

                ]}
            />
        )
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box} >
                {displayBanner()}
            </div>
            
        </div>)
}