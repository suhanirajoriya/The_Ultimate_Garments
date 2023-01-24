import { useStyles } from "./Categorycss";
import { useState } from "react";
import { Grid, TextField, Button, Avatar } from '@mui/material'
import * as React from 'react';
import { postData } from "../Services/NodeServices";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


export default function Category(props) {
    var classes = useStyles()
    var navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('')
    const [icon, setIcon] = useState({ url: '/icon.jpg', bytes: '' })

    const handleIcon = (event) => {
        setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })

    }
    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryname', categoryName)
        formData.append('icon', icon.bytes)
        var result = await postData('category/add_new_category', formData, true)
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
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }

    const handleReset = () => {
        setCategoryName('')
    }



    return (
        <div className={classes.mainContainer} >

            <div className={classes.box}>
                <Grid container>
                    <Grid className={classes.headbox} >
                        <Grid className={classes.headtxt}>
                            Category Interface

                        </Grid>
                        <div style={{ marginLeft: '8cm' }}>
                            <Avatar src={'/show.webp'} width='30' variant="square" onClick={() => navigate('/dashboard/displayallcategory')} />
                        </div>

                    </Grid>

                    <Grid item xs={12} className={classes.category}>
                        <Grid item xs={12} className={classes.gridStyle}>
                            <TextField onChange={(event) => setCategoryName(event.target.value)} fullWidth label="Category Name" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.gridStyle}>
                        <Grid
                            container
                            direction="column-reverse"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <div sx={{ fontSize: '1px', FontFace: 'Times New Roman' }} >Upload image</div>
                            <IconButton onChange={handleIcon} color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" />

                                <PhotoCamera sx={{ fontSize: "40px", color: 'black' }} />

                            </IconButton>

                            <Avatar
                                alt="Remy Sharp"
                                src={icon.url}
                                sx={{ width: 100, height: 100 }}
                                variant="rounded"
                            />


                        </Grid>
                    </Grid>

                    <Grid item xs={6} sx={{ padding: '0.2cm' }} >
                        <Button onClick={handleSubmit} variant="contained" color="success" fullWidth >SUBMIT</Button>
                    </Grid>
                    <Grid item xs={6} sx={{ padding: '0.2cm' }}>
                        <Button variant="contained" fullWidth color="error" onClick={handleReset}>RESET</Button>
                    </Grid>

                </Grid>
            </div>
        </div >
    )
}

