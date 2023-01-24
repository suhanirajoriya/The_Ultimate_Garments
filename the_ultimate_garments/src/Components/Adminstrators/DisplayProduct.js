import { useStyles } from "./DisplayProductCss";
import MaterialTable from "@material-table/core";
import { getData, postData } from "../Services/NodeServices";
import { useEffect, useState } from "react";
import { serverURL } from "../Services/NodeServices";
import * as React from 'react';
import { Button, Avatar, TextField, Grid, MenuItem, Select, FormControl } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { IconButton } from "@material-ui/core";
import { Radio, RadioGroup, FormLabel, InputLabel } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function DisplayProduct(props) {
    var classes = useStyles()
    var navigate = useNavigate()

    const [productList, setProductList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [btnStatus, setBtnStatus] = useState(false)
    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState()
    const [subCategory, setSubCategory] = useState()
    const [product, setProduct] = useState()
    const [price, setPrice] = useState()
    const [offerPrice, setOfferPrice] = useState()
    const [stock, setStock] = useState()
    const [rating, setRating] = useState()
    const [saleStatus, setSaleStatus] = useState()
    const [status, setStatus] = useState()
    const [description, setDescription] = useState()
    const [oldIcon, setOldIcon] = useState()
    const [icon, setIcon] = useState({ url: '/icon.jpg', bytes: '' })
    const [uploadBtn, setUploadBtn] = useState(false)
    const [productId, setProductId] = useState()

    const fetchProduct = async () => {

        var data = await getData('product/display_product')
        setProductList(data.data)
    }
    const fetchCategory = async () => {
        var data = await getData('category/display_all_category')
        setCategoryList(data.data)
    }
    const fillCategory = () => {
        return categoryList.map((item) => {
            return (<MenuItem value={item.categoryid} >{item.categoryname}</MenuItem>)
        })
    }

    const fetchSubCategory = async (cid) => {
        var data = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        setSubCategoryList(data.data)
    }
    const fillSubCategory = () => {
        return subCategoryList.map((item) => {
            return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)
        })
    }

    const handleSubCategory = (event) => {
        setSubCategory(event.target.value)
    }
    const handleIcon = (event) => {
        setBtnStatus(true)
        setUploadBtn(true)
        setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const handleCancelPicture = () => {
        setBtnStatus(false)
        setUploadBtn(false)
        setIcon({ url: oldIcon, bytes: '' })
    }

    /*  const handleSavePicture = async () => {
         var body = { productid: productId, icon: icon.bytes }
         var result = await postData('product/update_icon', body, true)
         alert(result.status)
     } */

    const handleSavePicture = async () => {
        setOpen(false)
        var formData = new FormData()
        formData.append('productid', productId)
        formData.append('icon', icon.bytes)
        var result = await postData('product/update_icon', formData, true)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Update Icon Successfully !!!',

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

    const handleDelete = async () => {

        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete ?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var res = await postData('product/delete_product', { productid: productId })
                alert(res.status)
                fetchProduct()

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted Successfully !!!',
                })
            }
        })


    }
    const saveAndCancelButton = () => {
        return (<div>{
            btnStatus ? <> <Button onClick={handleSavePicture} style={{ fontSize: '10px', borderColor: 'green', color: 'green', marginTop: '1cm', marginRight: '0.3cm' }} variant="outlined">
                <CheckTwoToneIcon />
            </Button>

                <Button onClick={handleCancelPicture} style={{ fontSize: '10px', borderColor: 'red', color: 'red', marginTop: '1cm' }} variant="outlined">
                    <CancelIcon />
                </Button>
            </> : <></>}
        </div>)

    }

    const handleEditProduct = async () => {
        setOpen(false)
        var body = { productid: productId, categoryid: category, subcategoryid: subCategory, product: product, price: price, offerprice: offerPrice, stock: stock, description: description, rating: rating, status: status, salestatus: saleStatus }
        var result = await postData('product/update_product', body)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Update Record Successfully !!!',
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Something went wrong!',
            })
        }
        fetchProduct()
    }

    const handleSaleStatus = (event) => {
        setSaleStatus(event.target.value)
    }

    useEffect(function () {
        fetchProduct()
    }, [])

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = (rowData) => {
        setOpen(true)
        setCategory(rowData.categoryid)
        setSubCategory(rowData.subcategoryid)
        setProduct(rowData.productname)
        setPrice(rowData.price)
        setOfferPrice(rowData.offer_price)
        setStock(rowData.stock)
        setStatus(rowData.status)
        setOldIcon(`${serverURL}/images/${rowData.icon}`)
        setSaleStatus(rowData.sale_status)
        setRating(rowData.rating)
        setDescription(rowData.description)
        setProductId(rowData.productid)
        setIcon({ url: `${serverURL}/images/${rowData.icon}`, bytes: `` })
        fetchCategory()
        fetchSubCategory(rowData.categoryid)

    }
    const handleCategory = (event) => {
        setCategory(event.target.value)
        fetchSubCategory(event.target.value)
    }


    const showProduct = () => {
        return (<div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <div className={classes.box1} >
                        <div className={classes.textBox} >
                            <div className={classes.text}> -Update Product-</div>

                        </div>

                        <Grid container spacing={1} className={classes.gridStyle} >
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        label="Category"
                                        onChange={handleCategory}
                                    >
                                        <MenuItem>Choose Category</MenuItem>
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
                                        value={subCategory}
                                        label="Sub Category"
                                        onChange={handleSubCategory}

                                    >

                                        <MenuItem>Choose Sub Category</MenuItem>
                                        {fillSubCategory()}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField value={product} fullWidth label="Product Name" onChange={(event) => setProduct(event.target.value)} variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField value={price} onChange={(event) => setPrice(event.target.value)} fullWidth label="Price" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField value={offerPrice} onChange={(event) => setOfferPrice(event.target.value)} fullWidth label="Offer Price" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField value={stock} onChange={(event) => setStock(event.target.value)} fullWidth label="Stock" variant="outlined" />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField value={rating} onChange={(event) => setRating(event.target.value)} fullWidth label="Rating" variant="outlined" />
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sale Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={saleStatus}
                                        label="Sale Status"
                                        onChange={handleSaleStatus}

                                    >
                                        <MenuItem value='Trending'>Trending</MenuItem>
                                        <MenuItem value='Popular'>Popular</MenuItem>
                                        <MenuItem value='New Arrivals'>New Arrivals</MenuItem>

                                    </Select>

                                </FormControl>
                            </Grid>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={status}
                                    >
                                        <FormControlLabel onChange={(event) => setStatus(event.target.value)} value="Continue" control={<Radio />} label="Continue" />
                                        <FormControlLabel onChange={(event) => setStatus(event.target.value)} value="Discontinue" control={<Radio />} label="Discontinue" />

                                    </RadioGroup>
                                </FormControl>

                            </Grid>
                            <Grid item xs={6} sx={{ marginTop: '0.3cm' }}  >
                                <Button onClick={handleEditProduct} fullWidth variant="contained" color="success"  >
                                    Update                                </Button>
                            </Grid>
                            <Grid item xs={6} sx={{ marginTop: '0.3cm' }} >
                                <Button onClick={handleDelete} fullWidth variant="contained" color="error">
                                    Delete
                                </Button>
                            </Grid>

                            <Grid item xs={4} sx={{ width: '60px', display: 'flex', justifyContent: 'center' }}>
                                <IconButton disabled={uploadBtn} onChange={handleIcon} sx={{ marginTop: '1cm' }} aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" />
                                    <PhotoCamera sx={{ fontSize: "30px", color: 'black', }} />
                                    <div className={classes.text1} >  Upload Picture</div>
                                </IconButton>

                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', marginTop: '0.5cm' }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={icon.url}
                                    sx={{ width: 75, height: 75 }}
                                    variant="square"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {saveAndCancelButton()}
                            </Grid>
                        </Grid>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog>
        </div>)
    }

    function displayProduct() {
        return (<div>
            <MaterialTable
                title="Product Details"
                columns={[
                    { title: 'Product Id', field: 'productid' },
                    { title: 'Category', render: (rowData) => <div><div>{rowData.cname}</div><div>{rowData.sname}</div></div> },
                    { title: 'Product', field: 'productname' },
                    { title: 'Price', render: (rowData) => <div><div>Price : <s>{rowData.price}</s></div><div>Offer : {rowData.offer_price}</div><div>Stock : {rowData.stock}</div></div> },
                    { title: 'Description', field: 'description' },
                    { title: 'Rating', field: 'rating' },
                    { title: 'Status', render: (rowData) => <div><div>{rowData.status}</div><div>{rowData.sale_status}</div> </div> },
                    {
                        title: 'icon',
                        render: (rowData) => <img src={`${serverURL}/images/${rowData.icon}`} width='70' height='70' style={{ borderRadius: '10%' }} />
                    }]}
                data={productList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Product',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/product')
                    }

                ]}
            />
        </div>)
    }
    return (<div className={classes.mainContainer} >
        <div className={classes.box}>
            {displayProduct()}

        </div>

        {showProduct()}
    </div>)
}