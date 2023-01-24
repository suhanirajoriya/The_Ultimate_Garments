import React from "react";
import { serverURL } from "../../Services/NodeServices";


export default function TwoCardComponents(props) {

    return props.images.map((item) => {
        return (<div style={{ position: 'relative', width: 530, height: 430, display: 'flex', flexDirection: 'row', padding: '2%' }}>
            <img src={`${serverURL}/images/${item.icon}`} style={{ width: '100%', height: '100%' }} />
            <div style={{ boxShadow: '2px 2px 10px 5px black inset', position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '94%', bottom: 20, zIndex: 1, color: 'white', fontWeight: 'bold', display: 'flex' }}>
                {item.productname}
            </div>
        </div>


        )
    })
}
