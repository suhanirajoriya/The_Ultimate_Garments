import { useStyles } from "./ProductCss";
import { TextField, Grid, Avatar, Button } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import FormLabel from '@mui/material/FormLabel';
import { getData, postData } from "../Services/NodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function Product(props) {
    var classes = useStyles()
    var navigate = useNavigate()

    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [product, setProduct] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')
    const [status, setStatus] = useState('')
    const [saleStatus, setSaleStatus] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [subCategoryList, setSubCategoryList] = useState([])
    const [icon, setIcon] = useState({ url: '/icon.jpg', bytes: '' })
    // fetch and fill category start
    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
        

    }
    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fetchSubCategory = async (cid) => {
        var data = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        setSubCategoryList(data.data)

    }
    const fillSubCategory = () => {
        return subCategoryList.map((item) => {
            return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)
        })
    }
    const fillCategory = () => {
        return categoryList.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
        })
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value)
        fetchSubCategory(event.target.value)

    }

    const handleIcon = (event) => {
        setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const handleSubCategory = (event) => {
        setSubCategoryId(event.target.value)
    }

    const handleSaleStatus = (event) => {
        setSaleStatus(event.target.value)
    }

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategoryid', subCategoryId)
        formData.append('productname', product)
        formData.append('price', price)
        formData.append('offer_price', offerPrice)
        formData.append('stock', stock)
        formData.append('description', description)
        formData.append('rating', rating)
        formData.append('status', status)
        formData.append('sale_status', saleStatus)
        formData.append('icon', icon.bytes)
        var result = await postData('product/add_new_product', formData, true)
        if (result.status) {
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
    return (<div className={classes.mainContainer}>
        <div className={classes.box} >
            <div className={classes.textBox} >
                <div className={classes.text}>Product Interface</div>
                <div style={{ display: 'flex', width: '600px', justifyContent: 'right', padding: '0.4cm' }}>
                    <Avatar src={'/show.webp'} width='30' variant="square" onClick={() => navigate('/dashboard/displayproduct')} />
                </div>
            </div>

            <Grid container spacing={1} className={classes.gridStyle} >
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Category"
                            onChange={handleCategory}
                        >
                            <MenuItem>Choose Categgory</MenuItem>
                            {fillCategory()}
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label1">Sub Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={subCategoryId}
                            label="Sub Category"
                            onChange={handleSubCategory}
                        >
                            <MenuItem>Choose Sub Category</MenuItem>
                            {fillSubCategory()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <TextField onChange={(event) => setProduct(event.target.value)} fullWidth label="Product Name" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField onChange={(event) => setPrice(event.target.value)} fullWidth label="Price" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField onChange={(event) => setOfferPrice(event.target.value)} fullWidth label="Offer Price" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField onChange={(event) => setStock(event.target.value)} fullWidth label="Stock" variant="outlined" />
                </Grid>
                <Grid item xs={8}>
                    <TextField onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <TextField onChange={(event) => setRating(event.target.value)} fullWidth label="Rating" variant="outlined" />
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sale Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={saleStatus}
                            label="Sale Status"
                            onChange={handleSaleStatus}
                        >
                            <MenuItem value={'Trending'}>Trending</MenuItem>
                            <MenuItem value={'Popular'}>Popular</MenuItem>
                            <MenuItem value={'New Arrivals'}>New Arrivals</MenuItem>

                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel onChange={(event) => setStatus(event.target.value)} value="Continue" control={<Radio />} label="Continue" />
                            <FormControlLabel onChange={(event) => setStatus(event.target.value)} value="Discontinue" control={<Radio />} label="Discontinue" />

                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ width: '60px', display: 'flex', justifyContent: 'center' }}>
                    <IconButton onChange={handleIcon} sx={{ marginTop: '0cm' }} aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera sx={{ fontSize: "40px", color: 'black', }} />
                        <div className={classes.text1} >  Upload Picture</div>
                    </IconButton>

                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', marginTop: '0.1cm' }}>
                    <Avatar
                        alt="Remy Sharp"
                        src={icon.url}
                        sx={{ width: 70, height: 70 }}
                        variant="square"
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginTop: '0.3cm' }}  >
                    <Button fullWidth variant="contained" color="success" onClick={handleSubmit}  >
                        Submit
                    </Button>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: '0.3cm' }} >
                    <Button fullWidth variant="contained" color="error">
                        RESET
                    </Button>
                </Grid>


            </Grid>


        </div>

    </div >)
}