import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { getData, postData } from '../../Services/NodeServices';
import { Button, IconButton, Badge } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import { serverURL } from '../../Services/NodeServices';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PopCart from './PopCart';
import { Navigate, useNavigate } from 'react-router';


export default function MainBar2() {
  //use State
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(anchorEl)
  const [hover, setHover] = useState('')
  const [open1,setOpen1]=useState(false )
  const [anchorEl1, setAnchorEl1] = useState(null);
const [refresh,setRefresh]=useState(false)

  var cart = useSelector(state => state.cart)
  var keys = Object.keys(cart)
  console.log(keys)
  
var navigate=useNavigate()

  const handleClick = (event) => {
    setOpen(true)
    setAnchorEl(event.currentTarget);
    setCategoryId(event.currentTarget.value)
    fetchAllSubCategory(event.currentTarget.value)
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };


  //fetch All Category
  const fetchAllCategory = async () => {
    var data = await getData('userinterface/display_all_category')
    setCategory(data.data)


  }

  const handleOut = (event) => {
    setAnchorEl(null);
  }




  //show category menu
  const showCategory = () => {
    return category.map((item) => {

      return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5cm', alignItems: 'center' }}>

          <Button style={{ color: 'black', cursor: 'pointer' }} onMouseEnter={handleClick} value={item.categoryid} >{item.categoryname}</Button>
        </div>
      )
    })
  }

  //fetch sub category

  const fetchAllSubCategory = async (categoryid) => {
    var data = await postData('userinterface/display_subcategory_by_category', { categoryid: categoryid })
    setSubCategory(data.data)
  }

  //show subcategory
  const showSubCategory = () => {
    return subCategory.map((item) => {
      return (
        <MenuItem style={{ cursor: 'pointer' }} value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )
    })
  }
  //use Effect
  useEffect(function () {
    fetchAllCategory()

  }, [])

  const handlePopoverClose = () => {
    setAnchorEl1(null);
    setOpen1(false)
setRefresh(!refresh)
  };

  const handleClickOpenPopCart=(event)=>{
setAnchorEl1(event.currentTarget)
setOpen1(true)
setRefresh(!refresh)
  }

  const handleShowCart=()=>{
    navigate('/checkout')
  }



  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <div style={{ width: "100%", display: 'flex', flexDirection: 'row', background: 'white' }}>
          <div onMouseLeave={handleClose} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center', width: '70%' }}>
            {showCategory()}

            <div style={{ paddingBottom: '2cm' }}>
              <Menu
                position="center"
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',

                }}
              >
                {showSubCategory()}
              </Menu>
            </div>
          </div>
          <div style={{ color: 'black', width: '30%', display: "flex", justifyContent: 'right' }}><IconButton sx={{ color: 'black' }} aria-label="add to shopping cart">
            <Badge badgeContent={keys.length} color="error">
              <ShoppingCartIcon  onMouseEnter={handleClickOpenPopCart}     onMouseLeave={handlePopoverClose} onClick={handleShowCart} />
            </Badge>
          </IconButton>
          </div>
        </div>

      </AppBar>
    </Box >
    <PopCart anchorEl1={anchorEl1} open1={open1}/>

    </>
  );
}