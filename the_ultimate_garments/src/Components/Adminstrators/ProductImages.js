import { useStyles } from "./ProductImagesCss";
import { Grid, TextField, Button, Avatar } from '@mui/material'
import * as React from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { DropzoneArea } from 'material-ui-dropzone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import { getData, postData } from "../Services/NodeServices";




export default function BannerImages(props) {
    var classes = useStyles()
    var navigate = useNavigate();
    const [getFiles, setFiles] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubcategoryId] = useState('')
    const [productId, setProductId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [productList, setProductList] = useState([])


    const fetchCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
    }
    //fill Category
    const fillCategory = () => {
        return categoryList.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
        })
    }

    //handle Category
    const handleCategory = (event) => {
        setCategoryId(event.target.value)
        fetchSubCategory(event.target.value)
    }

    //fetch Sub Category
    const fetchSubCategory = async (cid) => {
        var result = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        setSubCategoryList(result.data)
    }
    //fill Sub
    const fillSubCategory = () => {
        return subCategoryList.map((item) => {
            return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)
        })
    }
    //handle sub Category
    const handleSubCategory = (event) => {
        setSubcategoryId(event.target.value)
        fetchProduct(event.target.value)
    }

    //fetch Product

    const fetchProduct = async (sid) => {
        var data = await postData('product/fetch_product_by_subcategory', { subcategoryid: sid })
        setProductList(data.data)

    }
    //fill Product
    const fillProduct = () => {
        return productList.map((item) => {
            return (<MenuItem value={item.productid}>{item.productname}</MenuItem>)
        })
    }

    //handle Product

    const handleProduct = (event) => {
        setProductId(event.target.value)

    }
    //use Effect
    useEffect(function () {
        fetchCategory()
    }, [])

    const handleSubmit = async () => {
        var formdata = new FormData()
        formdata.append('categoryid', categoryId)
        formdata.append('subcategoryid', subCategoryId)
        formdata.append('productid', productId)
        getFiles.map((item, index) => {
            formdata.append("picture" + index, item)

        })
        var result = await postData('product/add_product_images', formdata, true)
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


    const handleSave = (files) => {
        setFiles(files)
    }


    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <div className={classes.txtBox}>
                    <div className={classes.txt}>
                        Product Images Interface
                    </div>

                </div>
                <Grid container spacing={2} className={classes.gridStyle} >
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
                                {fillCategory()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategoryId}
                                label="Sub Category"
                                onChange={handleSubCategory}
                            >
                                {fillSubCategory()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productId}
                                label="Product"
                                onChange={handleProduct}
                            >
                                {fillProduct()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea
                        className={classes.mg}
                            onChange={handleSave}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', 'image/webp']}
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

