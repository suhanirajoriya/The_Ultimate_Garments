import { useStyles } from "./SubCategoryCss";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Avatar } from '@mui/material'
import { getData, postData } from "../Services/NodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router";

export default function SubCategory(props) {
    var navigate = useNavigate();
    const [icon, setIcon] = useState({ url: '/icon.jpg', bytes: '' })
    const [categoryId, setCategoryId] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [bannerPriority, setBannerPriority] = useState('')
    const handleIcon = (event) => {
        setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
    }
    useEffect(function () {
        fetchAllCategory()
    }, [])
    const fillCategory = () => {
        return categoryList.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
        })

    }

    const handleChange = (event) => {
        setCategoryId(event.target.value)
    }

    const handlePriority = (event) => {
        setBannerPriority(event.target.value)
    }

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategory', subCategory)
        formData.append('icon', icon.bytes)
        formData.append('bannerpriority',bannerPriority)
        var result = await postData('subcategory/add_subcategory', formData, true)
        if (result.result) {

            Swal.fire({
                icon: 'success',
                title: 'Record Submitted Successfully...',
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
    var classes = useStyles()
    return (<div className={classes.mainContainer} >
        <div className={classes.box}>
            <Grid container  >
                <Grid className={classes.textBox} >

                    <Grid className={classes.text}>Sub Category Interface</Grid>
                    <div style={{ marginLeft: '9cm' }}>
                        <Avatar src={'/show.webp'} width='30' variant="square" onClick={() => navigate('/dashboard/displaysubcategory')} />
                    </div>
                </Grid>

                <Grid item xs={12} className={classes.gridStyle} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Category Name"
                            onChange={handleChange}
                        >
                            {fillCategory()}
                        </Select>
                    </FormControl>                </Grid>
                <Grid item xs={6} className={classes.gridStyle}>
                    <TextField onChange={(event) => setSubCategory(event.target.value)} label="Sub Category Name" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={6} className={classes.gridStyle}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Banner Priorty</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={bannerPriority}
                            label="Banner Priorty"
                            onChange={handlePriority}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
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

                            <PhotoCamera sx={{ fontSize: "30px", color: 'black' }} />

                        </IconButton>

                        <Avatar
                            alt="Remy Sharp"
                            src={icon.url}
                            sx={{ width: 70, height: 70 }}
                            variant="rounded"
                        />


                    </Grid>
                </Grid>

                <Grid item xs={6} className={classes.gridStyle} sx={{ paddingTop: '1cm' }}>
                    <Button fullWidth variant="contained" color="success" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
                <Grid item xs={6} className={classes.gridStyle} sx={{ paddingTop: '1cm' }}>
                    <Button fullWidth variant="contained" color="error">
                        RESET
                    </Button>
                </Grid>
            </Grid>
        </div>


    </div>

    )


}

