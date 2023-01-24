import React from "react";
import Steppers from "./UserComponents/Stepper";
import CheckOutMainBar from "./UserComponents/CheckOutMainBar";
import Paper from '@mui/material/Paper';
import { Button, Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import CheckOutLeft from "./UserComponents/CheckoutLeft";
import CheckOutRight from "./UserComponents/CheckOutRight";
import {useSelector } from "react-redux"

export default function CheckOut() {

    var cart = useSelector(state=>state.cart)


    return (<div>
        <CheckOutMainBar />

        <div style={{ background: '#f1f2f6', marginTop: '0.5%', width: '100%' }}>
            <div style={{ width: 'auto', height: '150px', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <Steppers />
            </div>

            <Grid container style={{ width: '90%', marginLeft: '5%', background: 'white' }} >
                <Grid item xs={7}>
                    <CheckOutLeft cart={cart} />

                </Grid>

                <Grid item xs={5}>
                    <CheckOutRight  cart={cart} />
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', paddingTop: '3%', paddingBottom: '3%' }}>

                    <img src='lock.png'  style={{marginLeft:'1%'}}/>
                    <img src='paytm.png' style={{marginLeft:'1%'}}/>
                    <img src='visa.png' style={{marginLeft:'1%'}} />
                    <img src='card.png' style={{marginLeft:'1%'}}/>
                    <img src='upi.png' style={{marginLeft:'1%'}}/>
                    <img src='maestro.png' style={{marginLeft:'1%'}}/>                </Grid>
            </Grid>
        </div>

    </div>)
}