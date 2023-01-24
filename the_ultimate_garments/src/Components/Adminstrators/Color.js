import { useStyles } from "./ColorCss"
import { Grid, TextField, Button } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import { getData, postData } from "../Services/NodeServices";
import ColorPicker from 'material-ui-color-picker';
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";
import { MuiColorInput } from 'mui-color-input'

export default function Color(props) {

    //states
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubcategoryId] = useState('')
    const [productId, setProductId] = useState('')
    const [sizeId, setSizeId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [productList, setProductList] = useState([])
    const [sizeList, setSizeList] = useState([])
    const [color, setColor] = useState('')
    const [colorCode, setColorCode] = useState('')
    const [colorList, setColorList] = useState({})

var navigate = useNavigate()
    //fetch All Category

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
        setSizeId(event.target.value)
    }

    //handle color code
  /*   const handleColorCode = (event) => {

        setColorCode(event)
        console.log(colorCode)
    } */

    const handleColorCode = (color) => {
        setColorCode(color)
      }
    //handle Add Color
    const handleAddColor = () => {
        var temp = colorList
        setColorList({ ...temp, [color]: colorCode })
    }

    //handle submit

    const handleSubmit = async () => {
        var body = { categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, size: sizeId, color: JSON.stringify(colorList) }
        var result = await postData('color/add_new_color', body)
        if(result.status)
        {
            Swal.fire({
                icon: 'success',
                title: 'Record Submitted Successfully !!!',
              
              })
        }
        else
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              
              })
        }
    }

    //use Effect
    useEffect(function () {
        fetchCategory()
    }, [])

    var classes = useStyles()
    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            <div className={classes.textBox}>
                <div className={classes.text}>
                    Color Interface
                </div>
                <Avatar src={'/show.webp'}  style={{marginLeft:'10cm'}}   width='30' variant="square" onClick={() => navigate('/dashboard/displaycolor')} />

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
                            value={sizeId}
                            label="Size"
                            onChange={handleSize}
                        >
                            {fillSize()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" value={color} onChange={(event) => setColor(event.target.value)} label="Color" fullWidth variant="outlined" />

                </Grid>
                <Grid item xs={3} >

                <MuiColorInput value={colorCode} onChange={handleColorCode}  format="hex"/>

                </Grid>


                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Button variant="contained" onClick={handleAddColor} fullWidth color="error" >SET</Button>
                </Grid>


                <Grid item xs={12}>
                    <TextField id="outlined-basic" value={JSON.stringify(colorList)} onChange={(event) => setColorList(event.target.value)} label="Color List" fullWidth variant="outlined" />

                </Grid>
                <Grid item xs={6} sx={{ marginTop: '1cm' }}  >
                    <Button fullWidth variant="contained" color="success" onClick={handleSubmit}  >
                        Submit
                    </Button>
                </Grid>
                <Grid item xs={6} sx={{ marginTop: '1cm' }} >
                    <Button fullWidth variant="contained" color="error">
                        RESET
                    </Button>
                </Grid>


            </Grid>

        </div>

    </div>)
}