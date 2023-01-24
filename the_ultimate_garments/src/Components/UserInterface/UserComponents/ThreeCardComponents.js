import React from "react";
import { serverURL } from "../../Services/NodeServices";


export default function ThreeCardComponents(props) {

    return props.images.map((item) => {
        return (<div style={{ position: 'relative', width: 350, height: 470, display: 'flex', flexDirection: 'row', padding: '1%' }}>
            <img src={`${serverURL}/images/${item.icon}`} style={{ width: '100%', height: '100%' }} />
            <div style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '94%', bottom: 20, zIndex: 1, color: 'white', fontWeight: 'bold', display: 'flex' }}>
                {item.subcategoryname}
            </div>
        </div>


        )
    })
}
