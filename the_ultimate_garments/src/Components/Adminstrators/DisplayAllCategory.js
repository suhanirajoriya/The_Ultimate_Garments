import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Grid, TextField, Avatar } from "@material-ui/core";
import { getData, serverURL } from "../Services/NodeServices";
import { useStyles } from "./DisplayAllCategoryCss";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { postData } from "../Services/NodeServices";
import IconButton from '@mui/material/IconButton';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Swal from "sweetalert2";
import Button from '@mui/material/Button';

import { Navigate, useNavigate } from "react-router";
import { style } from "@mui/system";


export default function DisplayAllCategory(props) {
    var classes = useStyles();
    var navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [btnStatus, setBtnStatus] = useState(false)
    const [uploadBtn, setUploadBtn] = useState(false)
    const [oldIcon, setOldIcon] = useState('')
    const [icon, setIcon] = useState({ url: '/icon.jpg', bytes: '' })
    const [open, setOpen] = useState(false)

    const fetchAllCategory = async () => {
        var data = await getData('category/display_all_category')
        setCategories(data.data)
    }
    const handleIcon = (event) => {
        setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setBtnStatus(true)
        setUploadBtn(true)
    }
    const handleDelete = () => {
        alert("abcdr")
        setBtnStatus(false)
        setIcon({ url: oldIcon, bytes: '' })
        setUploadBtn(false)
    }
    const handleSavePicture = async () => {
        setOpen(false)
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('icon', icon.bytes)
        var result = await postData('category/update_icon', formData, true)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Icon Updated Successfully',
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Something went wrong!',

            })
        }
        setBtnStatus(false)
        setOldIcon('')
        setUploadBtn(false)
        fetchAllCategory()
    }
    const handleEditCategory = async () => {
        setOpen(false)
        var body = { categoryname: categoryName, categoryid: categoryId }
        var result = await postData('category/edit_category_data', body)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Record Updated Successfully...',
            })
            fetchAllCategory()
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

                <Button onClick={handleSavePicture} style={{ fontSize: '10px', borderColor: 'green', color: 'green', marginTop: '1.5cm', marginRight: '0.3cm' }} variant="outlined">
                    <CheckTwoToneIcon />
                </Button>

                <Button onClick={handleDelete} style={{ fontSize: '10px', borderColor: 'red', color: 'red', marginTop: '1.5cm' }} variant="outlined">
                    <CancelIcon />
                </Button>

            </> : <></>}
        </div>)
    }

    const handleDeleteCategory = async () => {
        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete the category?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then(async (res) => {


            if (res.isConfirmed) {
                var body = { categoryid: categoryId }
                var result = await postData('category/delete_category_data', body)
                if (result.status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted Successfully...'
                    })
                }
                else {
                    Swal.fire('Server Error!', '', 'error')
                }
                fetchAllCategory()
            }

        })

    }

    useEffect(function () {
        fetchAllCategory()
    }, [])
    const handleOpen = (rowData) => {
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)
        setOldIcon(`${serverURL}/images/${rowData.icon}`)
        setIcon({ url: `${serverURL}/images/${rowData.icon}`, bytes: `` })

    }

    const handleClose = () => {
        setOpen(false)
    }

    const showCategory = () => {
        return (<div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent>

                    <div className={classes.box}>
                        <Grid container  >
                            <Grid className={classes.textBox} >

                                <Grid className={classes.text}>Edit Category Interface</Grid>
                            </Grid>

                            <Grid item xs={12} className={classes.gridStyle}>
                                <TextField onChange={(event) => setCategoryName(event.target.value)} value={categoryName} label="Sub Category Name" fullWidth variant="outlined" />
                            </Grid>
                            <Grid item xs={6} className={classes.gridStyle} sx={{ paddingTop: '1cm' }}>
                                <Button onClick={handleEditCategory} fullWidth variant="contained" color='success' >
                                    Edit
                                </Button>


                               
                            </Grid>
                            <Grid item xs={6} className={classes.gridStyle} sx={{ paddingTop: '1cm' }}>
                                <Button onClick={handleDeleteCategory} fullWidth variant="contained" color="error" >
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
                                    <PhotoCamera sx={{ fontSize: "30px", color:'black'}} />

                                </IconButton>


                            </Grid>
                            <Grid item xs={4} className={classes.gridStyle}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={icon.url}
                                    style={{ width: 100, height: 100 }}
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
        </div>)

    }


    function displayCategories() {
        return (
            <MaterialTable
            style={{marginTop:'3%'}}
            
                title="DETAILS OF CATEGORY"
                columns={[

                    {
                        title: 'Category ID', field: 'categoryid',

                    },
                    {
                        title: 'Category Name', field: 'categoryname',

                    },
                    {
                        title: 'Icon',

                        render: (rowData) => <img src={`${serverURL}/images/${rowData.icon}`} width='30' height='30' style={{ borderRadius: '10%' }} />
                    },

                ]}
                data={categories}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },

                    {
                        icon: 'add',
                        tooltip: 'Add Category',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/category')
                    }

                ]}
            />
        )
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box} >
                {displayCategories()}
            </div>
            {showCategory()}
        </div>)
}