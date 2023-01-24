import { useStyles } from "./SizeCss";
import { Grid, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { getData, postData } from "../Services/NodeServices";
import { useState, useEffect } from "react";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Swal from "sweetalert2";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router";
export default function Size(props) {
    //state
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [productList, setProductList] = useState([])
    const [categoryId, setCategoryId] = useState()
    const [subCategoryId, setSubCategoryId] = useState()
    const [productId, setProductId] = useState()
    const [size, setSize] = useState([]);
    var navigate = useNavigate();



    // fetch Category
    const fetchCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
    }
    //fill Category
    const fillCategory = () => {
        return categoryList.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }
    //handle category
    const handleCategory = (event) => {
        setCategoryId(event.target.value)
        fetchSubCategory(event.target.value)
    }

    //fetch Sub Category
    const fetchSubCategory = async (cid) => {
        var result = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        setSubCategoryList(result.data)
    }

    //fill Sub Category
    const fillSubCategory = () => {
        return subCategoryList.map((item) => {
            return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    //handle Sub category
    const handleSubCategory = (event) => {
        setSubCategoryId(event.target.value)
        fetchProduct(event.target.value)
    }

    //fetch Product
    const fetchProduct = async (sid) => {
        var result = await postData('product/fetch_product_by_subcategory', { subcategoryid: sid })
        setProductList(result.data)
    }
    //fill Product

    const fillProdct = () => {
        return productList.map((item) => {
            return (<MenuItem value={item.productid}>{item.productname}</MenuItem>)
        })
    }

    //handle Product
    const handleProduct = (event) => {
        setProductId(event.target.value)
    }

    useEffect(function () {
        fetchCategory()
    }, [])

    //size
    const names = [
        'S',
        'M',
        'L',
        'XS',
        'XL',
        'XXL',
    ];


    //handle Size
    const handleSize = (event) => {
        const {
            target: { value },
        } = event;
        setSize(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    //menu PROPS
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    //handle Submit

    const handleSubmit = async () => {
        var body = { categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, size: JSON.stringify(size) }
        var result = await postData('size/add_size', body)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Record Submitted Successfully !!!',

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
    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            <div container spacing={2}>
                <div className={classes.textBox}>
                    <div className={classes.text}>Size Interface</div>
                    <Avatar src={'/show.webp'} style={{marginLeft:'10cm'}}  width='30' variant="square" onClick={() => navigate('/dashboard/displaysize')} />

                </div>
               
              
            </div>
            <Grid container spacing={2} className={classes.gridStyle}>
                <Grid item xs={6} >
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
                <Grid item xs={6} >
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
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Product</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productId}
                            label="Product"
                            onChange={handleProduct}
                        >
                            {fillProdct()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Size</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={size}
                            onChange={handleSize}
                            input={<OutlinedInput label="Size" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={size.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <Button onClick={handleSubmit} fullWidth variant="contained" color="success">
                        SUBMIT
                    </Button>
                </Grid>
                <Grid item xs={6} >
                    <Button fullWidth variant="contained" color="error">
                        RESET
                    </Button>
                </Grid>
            </Grid>


        </div>

    </div>)
}