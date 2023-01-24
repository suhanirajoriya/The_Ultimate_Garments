import { useStyles } from "./DisplayColorCss";
import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getData, postData } from "../Services/NodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, TextField, Button } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MuiColorInput } from 'mui-color-input'
import { useNavigate } from "react-router";

export default function DisplayColor() {

var navigate = useNavigate()

    //state
    const [colorData, setColorData] = useState([])
    const [open, setOpen] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [productList, setProductList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [productId, setProductId] = useState('')
    const [size, setSize] = useState('')
    const [sizeList, setSizeList] = useState([])
    const [color, setColor] = useState('')
    const [colorId, setColorId] = useState('')
    const [colorCode, setColorCode] = useState('')
    const [colorList,setColorList]=useState({})
    const [keys,setKeys]=useState({})
    const [values,setValues]=useState({})

/*     const [colors, setColors] = useState({})
 */



    //fetch all Colors data
    const fetchAllColor = async () => {
        var result = await getData('color/display_all_color')
        setColorData(result.data)

        
    }

    //handle Open

    const handleOpen = (rowData) => {
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setProductId(rowData.productid)
        setSize(rowData.size)
        fetchAllCategory()
        fetchSubCategory(rowData.categoryid)
        fetchProduct(rowData.subcategoryid)
        fetchSize(rowData.productid)
         fetchColor(rowData.colorid)
        setColorId(rowData.colorid)
    }
    //handle Close
    const handleClose = () => {
        setOpen(false)
    }

    //fetch All category
    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.data)
    }

    // fill category

    const fillCategory = () => {
        return categoryList.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
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
    //fill Sub
    const fillSubCategory = () => {
        return subCategoryList.map((item) => {
            return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)
        })
    }
    //handle sub Category
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

    //handle Product

    const handleProduct = (event) => {
        setProductId(event.target.value)
        fetchSize(event.target.value)
    }

    //fetch size
    const fetchSize = async (pid) => {
        var result = await postData('size/fetch_size_by_product', { productid: pid })
        setSizeList(result.data)
    }
    //fill size
    const fillSize = () => {
        return sizeList.map((item) => {
            return (<MenuItem value={item}>{item}</MenuItem>)
        })
    }
    //handle size
    const handleSize = (event) => {
        setSize(event.target.value)
    }

 const fetchColor = async (clid) => {
        var result = await postData('color/fetch_color_by_color', { colorid: clid })
        setColorList(JSON.stringify(result.data))
    }
  


    //handle color code
    const handleColorCode = (event) => {

        setColorCode(event)
        console.log(colorCode)
    }
    //handle Add Color
    const handleAddColor = () => {
      var temp = colorList
      setColorList({ ...temp, [color]: colorCode })     
    }
    const handleClearColor=()=>{
        setColorList(JSON.stringify({}))
    }


    const deleteColor = async () => {
        var result = await postData('color/delete_color', { colorid: colorId })
        alert(result.status)
        fetchAllColor()

    }




    //use Effect
    useEffect(function () {
        fetchAllColor()
    }, [])
    //show data in dialog box
    const showColor = () => {
        return (<div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent>
                    <div className={classes.box1}>
                        <div className={classes.txtBox}>
                            <div className={classes.txt}>
                                Edit Color
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
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={size}
                                        label="Size"
                                        onChange={handleSize}
                                    >
                                        {fillSize()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField id="outlined-basic" onChange={(event) => setColor(event.target.value)} label="Color" fullWidth variant="outlined" />

                            </Grid>
                            <Grid item xs={3} >

                            <MuiColorInput value={colorCode} onChange={handleColorCode}  format="hex"/>
                            </Grid>


                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <Button variant="contained" onClick={handleAddColor} fullWidth color="error" >SET</Button>
                            </Grid>
                            


                            <Grid item xs={12}>
                                <TextField id="outlined-basic" value={colorList} onChange={(event) => setColorList(event.target.value)} label="Color List" fullWidth variant="outlined" />

                            </Grid>
                            <Grid item xs={6} >
                                <Button fullWidth variant="contained" color="success" /*onClick={handleSubmit}  */ >
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs={6} >
                                <Button fullWidth onClick={deleteColor} variant="contained" color="error">
                                    Delete            </Button>
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





    var classes = useStyles()

    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            <MaterialTable
                title="Simple Action Preview"
                columns={[
                    { title: 'Category', field: 'cname' },
                    { title: 'Sub Category', field: 'scname' },
                    { title: 'Product', field: 'pname' },
                    { title: 'Size', field: 'size', },
                 
                    { title: 'Color',field:'color'}
                ]}
                data={colorData}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) =>navigate('/dashboard/color')
                    },
                ]}
            />

        </div>
        {showColor()}

    </div>)
}