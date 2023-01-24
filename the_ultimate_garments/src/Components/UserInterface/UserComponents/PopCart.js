import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Avatar, Divider, Typography } from '@mui/material';
import { useSelector } from "react-redux"
import { serverURL } from "../../Services/NodeServices"

export default function PopCart(props) {
  const [anchorEl, setAnchorEl] = React.useState(props.anchorEl1);
  const [open, setOpen] = React.useState(props.open1)


  var cart = useSelector(state => state.cart)
  var value = Object.values(cart)
  var keys = Object.keys(cart)

  const totalPayableAmount = (a, b) => {
    var price = 0
    if (b.offer_price > 0)
      price = b.offer_price * b.qty
    else
      price = b.price* b.qty
    return a + price
  }

  const actualAmount = (a, b) => {
    return a + b.price
  }

  var tpay = value.reduce(totalPayableAmount, 0)
  var aamt = value.reduce(actualAmount, 0)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(function () {
    setOpen(props.open1)
    setAnchorEl(props.anchorEl1)
  }, [props])

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const showDataInPopover = () => {
    return value.map((item) => {
      return (<div style={{ display: 'flex', justifyContent: "space-evenly" }}>
        <div style={{ padding: 6 }}>
          <Avatar variant='square' src={`${serverURL}/images/${item.icon}`} style={{ width: '50px', height: '50px' }} />
        </div>
        <div style={{ padding: 6 }}>
          <div style={{ fontWeight: 'bold', fontSize: '12px', fontFamily: 'sans-serif' }}> {item.productname}</div>
          <div style={{ display: 'flex', paddingTop: '5px' }}>  <div style={{ color: 'red', textDecoration: "line-through", fontWeight: '100px', fontSize: '12px', fontFamily: 'sans-serif' }}> &#8377;{item.price}</div><div style={{ fontWeight: '100px', fontSize: '12px', fontFamily: 'sans-serif', paddingLeft: '8px', }}  >&#8377;{item.offer_price}</div><div style={{ fontWeight: '100px', fontSize: '10px', fontFamily: 'sans-serif', paddingLeft: '8px' }}>X</div><div style={{ fontWeight: '100px', fontSize: '12px', fontFamily: 'sans-serif', paddingLeft: '7px', paddingBottom: '-2px' }}>{item.qty}</div><div style={{ fontWeight: '100px', fontSize: '13px', fontFamily: 'sans-serif', paddingLeft: '8px' }}>=</div><div style={{ fontWeight: '100px', fontSize: '12px', fontFamily: 'sans-serif', paddingLeft: '7px', paddingBottom: '-2px' }}>&#8377;{item.qty * item.offer_price}</div></div>
          <div style={{ fontWeight: '100px', fontSize: '12px', fontFamily: 'sans-serif', color: 'green', paddingTop: '3px' }}>You Save &#8377;{item.price - item.offer_price}</div>
        </div>

      </div>)
    })
  }

  const showPaymentDetaiils = () => {
    return (
    <div>
    <div style={{ display: 'flex', padding: '10px 10px 10px 6px', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>Total Amount</div><div style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>&#8377;{aamt}</div>
    </div>
    <div style={{ display: 'flex', padding: '0px 10px 10px 6px', justifyContent: 'space-between',color:'green' }}>
      <div style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>You save</div><div style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>&#8377;{aamt - tpay}</div>
    </div>
    <div style={{ display: 'flex', padding: '0px 10px 10px 6px', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>Shipping</div><div style={{ fontSize: '12px', fontFamily: 'sans-serif',color:'green' }}>Free</div>
    </div>
    <Divider/>
    <div style={{ display: 'flex', padding: '8px 10px 10px 6px', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>Amount Payable</div><div style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>&#8377;{tpay}</div>
    </div>
    </div>)
  }

  return (
    <div>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',

        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        //    onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {showDataInPopover()}
        <Divider />
        {showPaymentDetaiils()}
      </Popover>
    </div>
  );
}