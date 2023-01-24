import { useStyles } from "./BannerImagesCss";
import { useState } from "react";
import { Grid, TextField, Button, Avatar } from '@mui/material'
import * as React from 'react';
import { postData } from "../Services/NodeServices";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { DropzoneArea } from 'material-ui-dropzone';



export default function BannerImages(props) {
    var classes = useStyles()
    var navigate = useNavigate();
    const [getFiles, setFiles] = useState([])

    const handleSubmit = async () => {
        var formdata = new FormData()
        getFiles.map((item, index) => {
            formdata.append("picture" + index, item)
           
        })
        var result = await postData('category/add_banner_images',formdata,true)
        if (result.result) {

            Swal.fire({
                icon: 'success',
                title: 'Record Submitted Successfully',
            })
        }
        else {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })
        }
    }


    const handleSave = (files) => {
        setFiles(files)
    }


    return (
        <div className={classes.mainContainer} >

            <div className={classes.box}>
                <Grid container>
                    <Grid className={classes.headbox} >
                        <Grid className={classes.headtxt}>
                            Banner Images Interface

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea
                            onChange={handleSave}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            maxFileSize={5000000}
                            filesLimit={6}
                        />
                    </Grid>


                    <Grid item xs={6} sx={{ padding: '0.2cm' }} >
                        <Button onClick={handleSubmit} variant="contained" color="success" fullWidth >SUBMIT</Button>
                    </Grid>
                    <Grid item xs={6} sx={{ padding: '0.2cm' }}>
                        <Button variant="contained" fullWidth color="error" >RESET</Button>
                    </Grid>

                </Grid>
            </div>
        </div >
    )
}

