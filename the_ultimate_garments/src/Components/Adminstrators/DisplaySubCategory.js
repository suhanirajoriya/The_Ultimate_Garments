import { useStyles } from "./DisplaySubCategoryCss";
import MaterialTable from "@material-table/core";
import { Button, Avatar, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'



import { getData, postData, serverURL } from "../Services/NodeServices";
export default function DisplaySubCategory(props) {

    var classes = useStyles();
    var navigate = useNavigate();
    const [subCategories, setSubCategories] = useState([])
    const [open, setOpen] = useState(false)
    const [categoryId, setCategoryId] = useState()
    const [subCategoryId, setSubCategoryId] = useState()
    const [subCategory, setSubCategory] = useState()
    const [btnStatus, setBtnStatus] = useState(false)
    const [icon, setIcon] = useState({ url: `/icon.jpg`, bytes: `` })
    const [oldIcon, setOldIcon] = useState({ url: `/icon.jpg`, bytes: `` })
    const [categoryList, setCategoryList] = useState([])
    const [data1, setData1] = useState([])
    const [bannerPriority,setBannerPriority]=useState('')

    const [uploadBtn, setUploadBtn] = useState(false)
    const handleOpen = (rowData) => {
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setSubCategory(rowData.subcategoryname)
        setOldIcon(`${serverURL}/images/${rowData.icon}`)
        setIcon({ url: `${serverURL}/images/${rowData.icon}`, bytes: `` })
        setBannerPriority(rowData.bannerpriority)
    }
    const fetchAllSubCategory = async () => {
        var data = await getData('subcategory/display_sub_category')
        setSubCategories(data.data)
    }

    useEffect(function () {
        fetchAllSubCategory()
        fetchCategory()
    }, [])

    const fetchCategory = async () => {
        var data = await getData('category/display_all_category')
        setCategoryList(data.data)
    }


    const fillCategory = () => {
        return categoryList.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }
    const handleIcon = (event) => {
        setBtnStatus(true)
        setUploadBtn(true)
        setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }
    const handleCancel = () => {
        setBtnStatus(false)
        setUploadBtn(false)
        setIcon({ url: oldIcon, bytes: `` })
    }
    const handleChange = (event) => {
        setCategoryId(event.target.value)
    }

    
    const handlePriority = (event) => {
        setBannerPriority(event.target.value)
        
    }

    const handleSavePicture = async () => {
        setOpen(false)
        var formData = new FormData()
        formData.append('subcategoryid', subCategoryId)
        formData.append('icon', icon.bytes)
        var result = await postData('subcategory/update_icon', formData, true)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Icon Updated Successfully',

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
        setBtnStatus(false)
        setOldIcon('')
        setUploadBtn(false)
        fetchAllSubCategory()
    }

    const handleEditCategory = async () => {
        setOpen(false)
        var body = { categoryid: categoryId, subcategoryid: subCategoryId, subcategoryname: subCategory,bannerpriority:bannerPriority }
        var result = await postData('subcategory/edit_subcategory_data', body)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Record Updated Successfully',

            })
            fetchAllSubCategory()

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

    const saveAndCancelButton = () => {
        return (<div>
            {btnStatus ? <>

                <Button onClick={handleSavePicture} sx={{ fontSize: '10px', borderColor: 'green', color: 'green', marginTop: '0.7cm', marginRight: '0.3cm' }} variant="outlined">
                    <CheckTwoToneIcon />
                </Button>

                <Button onClick={handleCancel} sx={{ fontSize: '10px', borderColor: 'red', color: 'red', marginTop: '0.7cm' }} variant="outlined">
                    <CancelIcon />
                </Button>

            </> : <></>}
        </div>)
    }

    const handleClose = () => {
        setOpen(false)

    }
  

    const handleDeleteSubCategory = async () => {
        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete the Sub Category ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then(async (res) => {


            /* Read more about isConfirmed, isDenied below */
            if (res.isConfirmed) {
                var body = { subcategoryid: subCategoryId }
                var result = await postData('subcategory/delete_subcategory', body)
                if (result.status) {
                    Swal.fire('Deleted!', '', 'success')
                }
                else {
                    Swal.fire('Server Error!', '', 'error')
                }
                fetchAllSubCategory()
            }

            else if (res.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }


    const showSubCategory = () => {
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>

                        <div className={classes.box}>
                            <Grid container spacing={2}>
                                <Grid className={classes.textBox} >

                                    <Grid className={classes.text}>Edit Sub Category Interface</Grid>

                                </Grid>

                                <Grid item xs={12} className={classes.gridStyle}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={categoryId}
                                            label="Category"
                                            onChange={handleChange}
                                        >
                                            {fillCategory()}

                                        </Select>
                                    </FormControl></Grid>
                                <Grid item xs={6} className={classes.gridStyle}>
                                    <TextField onChange={(event) => setSubCategory(event.target.value)} value={subCategory} label="Sub Category Name" fullWidth variant="outlined" />
                                </Grid>
                                <Grid item xs={6} className={classes.gridStyle}>
                                    <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Banner Priority</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={bannerPriority}
                                        label="Banner Priority"
                                        onChange={handlePriority}
                                    >
                                        <MenuItem value={'1'}>1</MenuItem>
                                        <MenuItem value={'2'}>2</MenuItem>
                                        <MenuItem value={'3'}>3</MenuItem>
                                        <MenuItem value={'4'}>4</MenuItem>
                                        <MenuItem value={'5'}>5</MenuItem>
                                    </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} className={classes.gridStyle} sx={{ paddingTop: '1cm' }}>
                                    <Button onClick={handleEditCategory} fullWidth variant="contained" color="success">
                                        Edit
                                    </Button>
                                </Grid>
                                <Grid item xs={6} className={classes.gridStyle} sx={{ paddingTop: '1cm' }}>
                                    <Button onClick={handleDeleteSubCategory} fullWidth variant="contained" color="error">
                                        Delete
                                    </Button>
                                </Grid>
                                <Grid item xs={4}
                                    container
                                    direction="column-reverse"
                                    justifyContent="center"
                                    alignItems="center"

                                >
                                    <div sx={{ fontSize: '1px', FontFace: 'Times New Roman' }} >Upload New image</div>
                                    <IconButton disabled={uploadBtn} color="primary" onChange={handleIcon} aria-label="upload picture" component="label">
                                        <input hidden accept="image/*" type="file" />
                                        <PhotoCamera sx={{ fontSize: "30px", }} />

                                    </IconButton>


                                </Grid>
                                <Grid item xs={4} className={classes.gridStyle}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={icon.url}
                                        sx={{ width: 100, height: 100 }}
                                        variant="rounded"
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
            </div >)
    }


    function displaySubCategories() {
        return (
            <MaterialTable
                style={{ margin: '3%' }}
                title="Details of Sub Category"
                columns={[
                    { title: 'Sub Category Id', field: 'subcategoryid' },
                    { title: 'Category', field: 'cname' },
                    { title: 'Category Name', field: 'subcategoryname' },
                    { title: 'Banner Priority', field: 'bannerpriority' },
                    {
                        title: 'Icon',
                        render: (rowData) => <img src={`${serverURL}/images/${rowData.icon}`} width='30' height='30' />
                    },
                ]}
                data={subCategories}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Sub-Category',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Sub Category',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/subcategory')
                    }
                ]}
            />

        )


    }

    return (<div className={classes.mainContainer1} >

        <div className={classes.innerBox}>
            {displaySubCategories()}
        </div>
        {showSubCategory()}


    </div>)
}