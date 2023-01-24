import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import GroupedButtons from './Counter';
import { Button, Paper, TextField } from '@mui/material';
import CartBuyBtn from './CartBuyBtn';
import SizeRadio from './SizeRadio';
import ColorRadio from './ColorRadio';
import { postData } from '../../Services/NodeServices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeliveryOptions from './DeliveryOptions';
export default function ProductListRight(props) {


    const [size, setSize] = useState([])

    const [msg, setMsg] = useState('')
    const [colors, setColors] = useState(null)

    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)

    var cart = useSelector(state => state.cart)
    var selectedProduct = cart[props.ProductInfo.productid]

    var keys = Object.keys(cart)
    var selectedQty = null
    if (keys.length > 0) {
        selectedQty = selectedProduct.qty
        props.ProductInfo['size'] = selectedProduct.size
        props.ProductInfo['color'] = selectedProduct.color
        props.ProductInfo['qty'] = selectedProduct.qty
    }

    const [qty, setQty] = useState(selectedQty)

    var dispatch = useDispatch()

    useEffect(function () {
        fetch_All_Size_By_ProductId()
    }, [])



    const fetch_All_Size_By_ProductId = async () => {

        var result = await postData('userinterface/fetch_size_by_product', { productid: props.ProductInfo.productid })
        //  var sizes = JSON.parse(result.data)
        //  setSize(result.data)
        //    alert(JSON.stringify(result.data))
        //   setSize(setSizeStatus(sizes))
        var sizes = result.data.map((item) => {
            fetch_color_by_size(item.size)
            if (keys > 0 && selectedProduct != undefined && selectedProduct.size == item.size) {
                return { 'size': item.size, 'status': true }
            }
            else {
                return { 'size': item.size, 'status': false }

            }


        })
        setSize(sizes)



    }

    const setSizeStatus = (size) => {
        var sizeJson = []
        size.map((item) => {

            sizeJson.push({ 'size': item, 'status': false })

        })
        return sizeJson
    }

    const handleSize = (i) => {
        setSelectedColor(null)
        var temp = size.map((item) => {

            return { 'size': item.size, 'status': false }
        })

        temp[i].status = true

        setSize([...temp])
        setSelectedSize(temp[i].size)

        { fetch_color_by_size(temp[i].size) }
        props.ProductInfo['size'] = temp[i].size
        dispatch({ type: 'ADD_CART', payload: [props.ProductInfo.productid, props.ProductInfo] })

    }

    const fetch_color_by_size = async (cc) => {

        var result = await postData('userinterface/fetch_color_by_size_and_productid', { productid: props.ProductInfo.productid, size: cc })
        var pcolor = JSON.parse(result.data[0].color)
        setColors(pcolor)



    }

    const showSize = () => {

        return size.map((item, i) => {
            return (

                <div onClick={() => handleSize(i)} style={{ fontSize: '15px', padding: '1%', cursor: 'pointer', border: item.status ? '2px solid #51cccc' : '1px solid grey', margin: '1%', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    {item.size}</div>
            )
        })
    }

    const handleQtyChange = (value) => {

        setQty(value)

        if (selectedColor != null && selectedSize != null) {

            if (value == 0) {
                dispatch({ type: 'DELETE_CART', payload: [props.ProductInfo.productid, props.ProductInfo] })
            }
            else {
                props.ProductInfo['qty'] = value
                props.ProductInfo['color'] = selectedColor
                props.ProductInfo['size'] = selectedSize
                dispatch({ type: 'ADD_CART', payload: [props.ProductInfo.productid, props.ProductInfo] })
                setQty(value)
            }
            props.updateCart()
            setMsg('')
        }
        else {

            setMsg('Plz select color and size')
            setQty(null)

        }

    }

    const handleColor = (value) => {
        setQty(0)

        setSelectedColor(value)
        props.ProductInfo['color'] = value
        dispatch({ type: 'ADD_CART', payload: [props.ProductInfo.productid, props.ProductInfo] })

    }


    return (<div style={{ padding: '3%' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ padding: '1%', fontWeight: 'bold', fontSize: '20px' }}>{props.ProductInfo.productname}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '130px' }}>
                <IconButton aria-label="delete" size="small">
                    <FavoriteBorderIcon sx={{ color: 'black' }} />
                </IconButton>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: "row" }}>
            <div style={{ fontWeight: '100px', fontSize: '25px', padding: '1%' }}>&#8377;{props.ProductInfo.offer_price}</div>
            <div style={{ fontSize: '17px', padding: '2%', color: 'grey', textDecoration: 'line-through' }}>&#8377;{props.ProductInfo.price}</div>
            <div style={{ fontSize: '17px', paddingTop: '2%', color: 'green', fontWeight: '30px' }}>(&#8377;{props.ProductInfo.price - props.ProductInfo.offer_price}/- off)</div>

        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ fontSize: '15px', paddingLeft: '1%' }}>Inclusive of all taxes + </div>
            <div style={{ fontSize: '15px', paddingLeft: '1%', color: '#efb30b', fontWeight: '100px' }}>Free Shipping</div>

        </div>

        <div style={{ fontWeight: '400px', fontSize: '20px', }}>Size</div>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {showSize()}

        </div>
        <div style={{ color: 'red', fontSize: '12px' }}>{msg}</div>

        <div>
            <ColorRadio colorlist={colors} onClick={(value) => handleColor(value)} colorName={selectedProduct && selectedProduct.color} />
        </div>




        <CartBuyBtn value={qty} onChange={handleQtyChange} />
        <div style={{ padding: '1%' }}>
            <DeliveryOptions />
        </div>
    </div>
    )
}