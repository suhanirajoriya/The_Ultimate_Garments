import React from "react";
import { useNavigate } from "react-router";
import { serverURL } from "../../Services/NodeServices";

export default function AllProductDetails(props) {
    var navigate = useNavigate()

    const handleProductDetails = (item) => {
        navigate('/productinfo', { state: { product: item } })
    }

    return props.data.map((item) => {
        return (

            <div onClick={() => handleProductDetails(item)} style={{ padding: '1%', boxShadow: '2px 2px 10px 2px #b2bec3', margin: '1%' }}>
                <div style={{ position: 'relative', width: 250, height: 290, display: 'flex', flexDirection: 'row', padding: '1%', }}>
                    <img src={`${serverURL}/images/${item.icon}`} style={{ width: '100%', height: '100%' }} />

                </div>
                <div style={{ height: '54%', display: 'flex', justifyContent: 'center', padding: '2%' }}>
                    <div style={{ letterSpacing: 1, fontWeight: "bold" }}>   {item.productname}</div>
                </div>
                <div style={{ left: 50, display: 'flex', flexDirection: 'row' }}>

                    <div style={{ color: 'green', fontWeight: 'bold' }}>  &#8377;
                        {item.offer_price}
                    </div>

                    <div style={{ color: 'red', textDecoration: 'line-through', width: '100%', display: 'flex', marginLeft: '5%' }}>  &#8377;
                        {item.price}
                    </div>
                    <div style={{ fontSize: '15px', width: '60%', height: '50%', fontWeight: '2px' }}>Save  &#8377;{item.price - item.offer_price}</div>

                </div>
                <div style={{ paddingTop: '5%' }}>
                    <div style={{ background: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ color: 'white', padding: '3%', fontFamily: 'sans-serif' }}>        ADD TO CART</div>
                    </div>
                </div>
            </div>

        )

    })


}