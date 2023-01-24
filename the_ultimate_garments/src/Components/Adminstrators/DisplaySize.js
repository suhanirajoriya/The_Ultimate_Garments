import { useStyles } from "./DisplaySizeCss";
import MaterialTable from "@material-table/core";
import { getData, postData } from "../Services/NodeServices";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


export default function DisplaySize(props) {
    var classes = useStyles()
var navigate = useNavigate()


    //state
    const [sizeList, setSizeList] = useState([])
    const [open, setOpen] = useState('')
    const [size, setSize] = useState([]);
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [productList, setProductList] = useState([])
    const [categoryId, setCategoryId] = useState()
    const [subCategoryId, setSubCategoryId] = useState()
    const [productId, setProductId] = useState()
    const [sizeId, setSizeId] = useState()

    // fetch Size
    const fetchSize = async () => {
        var result = await getData('size/display_size')
        setSizeList(result.data)

    }

    //useEffect 
    useEffect(function () {
        fetchSize()
    }, [])

    //for closing dialog box
    const handleClose = () => {
        setOpen(false)
    }

    //for open dialog box
    const handleOpen = (rowData) => {
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setProductId(rowData.productid)
        fetchCategory()
        fetchSubCategory(rowData.categoryid)
        fetchProduct(rowData.subcategoryid)
        setSize(JSON.parse(rowData.size))
        setSizeId(rowData.sizeid)
    }
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

    // handle size

    const handleSize = (event) => {
        const {
            target: { value },
        } = event;
        setSize(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

  
    //fetch Category

    const fetchCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
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

    const fetchSubCategory = async (cid) => {
        var data = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        setSubCategoryList(data.data)

    }


    const fillSubCategory = () => {
        return subCategoryList.map((item) => {
            return (<MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>)
        })
    }
    const handleSubCategory = (event) => {
        setSubCategoryId(event.target.value)
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

    const handleProduct = (event) => {
        setProductId(event.target.value)
    }
    //update size
    const handleEdit = async () => {
        setOpen(false)
        var body = { categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, size: JSON.stringify(size), sizeid: sizeId }
        var result = await postData('size/edit_size', body)
        fetchSize()
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Updated Successfully',
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
    // delete size
    const handleDelete = async () => {
        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete ?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then(async (res) => {
            /* Read more about isConfirmed, isDenied below */
            if (res.isConfirmed) {

                var result = await postData('size/delete_size', { sizeid: sizeId })
                fetchSize()
                if(result.status){
                Swal.fire('Deleted!', '', 'successfully')
                }
                else{
                    Swal.fire('Server Error!')  
                }

            }
        })




    }

    //show size im dialog

    const showSize = () => {
        return (<div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent>
                    <div className={classes.box}>
                        <div container spacing={2}>
                            <div className={classes.textBox}>
                                <div className={classes.text}>Size Interface</div>
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
                                        <MenuItem>Choose Category</MenuItem>
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
                                        label="Sub Category"
                                        value={subCategoryId}
                                        onChange={handleSubCategory}

                                    >
                                        <MenuItem>Choose Sub Category</MenuItem>
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
                                        label="Product"
                                        value={productId}
                                        onChange={handleProduct}
                                    >
                                        {fillProduct()}
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
                                <Button onClick={handleEdit} fullWidth variant="contained" color="success">
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs={6} >
                                <Button onClick={handleDelete} fullWidth variant="contained" color="error">
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autofocus>Close</Button>

                </DialogActions>
            </Dialog>
        </div>)
    }


    //display Size
    function displaySize() {
        return (<div>
            <MaterialTable
                title="Size List"
                columns={[
                    { title: 'Size Id', field: 'sizeid' },
                    { title: 'Category', field: 'cname' },
                    { title: 'Sub Category', field: 'scname' },
                    { title: 'Product', field: 'pname', },
                    { title: 'Size', field: 'size', },

                ]}
                data={sizeList}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) =>navigate('/dashboard/size')
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit Size',
                        onClick: (event, rowData) => handleOpen(rowData)
                    }

                ]}
            />
        </div>)
    }

    return (<div className={classes.mainContainer1} >
        <div className={classes.box1}>
            {displaySize()}

        </div>

        {showSize()}
    </div>)

}