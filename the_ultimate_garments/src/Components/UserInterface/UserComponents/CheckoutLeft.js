import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import GroupedButtons from './Counter';
export default function CheckOutLeft(props){
var products = Object.values(props.cart)
console.log('pppp',products)


    return(<div>
         <div style={{ border: '1px solid #ddd', margin: '1%', }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ padding: '1%', width: '26%' }}>
                                <img src='Dark_Blue_Blazer_1.jpg' width='60%' />
                          
                            </div>
                            <div style={{ width: '50%' }}>
                                <div style={{ fontSize: '15px', fontFamily: 'inherit' }}> {products.productname}</div>
                                <div style={{ display: 'flex', flexDirection: "row", paddingTop: '1%' }}>
                                    <div style={{ fontWeight: '100px', fontSize: '20px' }}>&#8377;399</div>
                                    <div style={{ fontSize: '13px', padding: '2%', color: 'grey', textDecoration: 'line-through' }}>&#8377;799</div>
                                    <div style={{ fontSize: '14px', paddingTop: '2%', color: 'green', fontWeight: '30px' }}>(&#8377;400/- off)</div>

                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ width: '50%', paddingTop: '3%' }}>
                                        Color : Teal Blue
                                    </div>
                                    <div style={{ width: '50%', paddingLeft: '20%', paddingTop: '3%' }}>
                                        Size : M
                                    </div>
                                </div>
                            </div>
                        </div>
                        <GroupedButtons />
                        <hr />
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <div style={{width:'30%',justifyContent:'center',alignItems:'center',display:'flex'}}>
                                <Button style={{color:'black'}}>Remove</Button>
                            </div>
                            <Divider orientation="vertical" flexItem  style={{color:'black'}}/>
                            <div style={{width:'70%',justifyContent:'center',alignItems:'center',display:'flex'}}>
                                <Button style={{color:'black'}}>MOve to Wishlist</Button>
                            </div>
                       
                        </div>

                    </div>

    </div>)
}