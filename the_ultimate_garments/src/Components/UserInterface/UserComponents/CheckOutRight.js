import { Button, ListItem, TextField, List } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import Fab from '@mui/material/Fab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function CheckOutRight() {
    return (<div style={{ paddingLeft: '8%', paddingTop: "2%" }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ paddingRight: '2%' }}><img src="coupon.svg" /></div>
            <div> Have a Coupon/Referral Code?</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '2%' }}>
            <div style={{}}>
                <TextField id="outlined-basic" variant="outlined" style={{ width: '8cm' }} />

            </div>
            <div>
                <Button variant="contained" style={{ background: '#51cbcc', height: '1.5cm' }}>Apply</Button>
            </div>
        </div>
        <div style={{ fontSize: '22px', fontWeight: '600', padding: "20px 0px 10px 0px" }}>
            PRICE DETAILS(2 items)
            <hr style={{ backgroundColor: 'grey' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '100%' }}>
            <div style={{ fontFamily: 'Dubai Ligh' }}>Total MRP (Inc. of Taxes)</div>
            <div style={{ paddingLeft: '42%', paddingBottom: '2%', fontFamily: 'Dubai Ligh' }}>&#8377;9999</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '100%' }}>
            <div style={{ fontFamily: 'Dubai Ligh' }}>TheUltimate Discount</div>
            <div style={{ paddingLeft: '51%', paddingBottom: '2%', fontFamily: 'Dubai Ligh' }}>&#8377;99</div>
        </div>


        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '100%' }}>
            <div style={{ fontFamily: 'Dubai Ligh' }}>Shipping</div>
            <div style={{ paddingLeft: '70%', paddingBottom: '2%', fontFamily: 'Dubai Ligh' }}>Free</div>
        </div>


        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '100%' }}>
            <div style={{ fontFamily: 'Dubai Ligh' }}>Cart Total</div>
            <div style={{ paddingLeft: '66%', paddingBottom: '2%', fontFamily: 'Dubai Ligh' }}>&#8377;1549</div>
        </div>
        <hr />
        <div style={{ display: 'flex', flexDirection: 'row', fontSize: '100%' }}>
            <div style={{ fontFamily: 'Dubai Ligh', fontWeight: '900' }}>Total Amount</div>
            <div style={{ paddingLeft: '60%', paddingBottom: '2%', fontFamily: 'Dubai Ligh', fontWeight: '900' }}>&#8377;1549</div>
        </div>
        <div style={{ background: '#4caf50', display: 'flex', justifyContent: 'center', letterSpacing: '0.8px', fontSize: '15px', padding: '3%',color:'white' }}>You saved &#8377;999 on this order</div>

        <div style={{ paddingTop: '3%'}}><Button variant="contained" style={{ background: '#51cbcc', width: '100%' }}>Checkout Securely</Button>
        </div>
    </div>)
}