import * as React from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { propsToClassKey } from '@mui/styles';
export default function CartBuyBtn(props) {

    const [value, setValue] = useState(props.value)

    const handleClick = () => {

     if (props.value != null) { 
            var v = value + 1
            setValue(v)}
            
            props.onChange(v)
  
    
    }

    const handlePlus = () => {
        var v = value
        if (v < 5) {
            v++
            setValue(v)
        }
        props.onChange(v)
    }

    const handleMinus = () => {
        var v = value
        if (v >= 1) {
            v = v - 1
            setValue(v)
        }
        props.onChange(v)

    }


    return (<div>
        {value == 0 || value == null ?
            <div>
                <Button onClick={handleClick} style={{ background: '#51cbcc', width: '48%', margin: '1%' }} variant="contained" endIcon={<ShoppingCartIcon />}>
                    Add to Cart
                </Button>
                <Button style={{ background: '#f9eb28', color: 'black', width: '48%' }} variant="contained" endIcon={<ArrowCircleRightIcon />}>
                    Buy
                </Button></div> : <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar onClick={handleMinus} variant='rounded' style={{ background: '#51cbcc', cursor: 'pointer' }}>
                        -
                    </Avatar>
                    <div style={{ paddingLeft: '3%', paddingRight: '3%', fontWeight: 'bold' }}> {value}</div>
                    <Avatar onClick={handlePlus} variant='rounded' style={{ background: '#51cbcc', cursor: 'pointer' }}>
                        +
                    </Avatar>
                </div>
                <Button style={{ background: '#f9eb28', color: 'black', width: '48%' }} variant="contained" endIcon={<ArrowCircleRightIcon />}>
                    Buy
                </Button>
            </div>}
    </div>)
}