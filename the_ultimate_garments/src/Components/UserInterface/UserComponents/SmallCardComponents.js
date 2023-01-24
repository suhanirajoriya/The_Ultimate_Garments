import React from "react";
import { useNavigate } from "react-router";
import { serverURL } from "../../Services/NodeServices";

export default function SmallCardComponents(props) {
    /*    const handleBig = (event) => {
   
           event.target.style.height = '300px'
       }
       const handleOut = (event) => {
   
           event.target.style.height = '244px'
       } */
       var navigate=useNavigate()

/*     const handleProduct = (pid) => {
        Navigate(`/${props.url}/${pid}`)
    }
 */



    return props.images.map((item) => {
        return (<div /* onClick={handleProduct(item.productid)} */ style={{ cursor: 'pointer', position: 'relative', width: 250, height: 290, display: 'flex', flexDirection: 'row', padding: '1%' }}>
            <img src={`${serverURL}/images/${item.icon}`} style={{ width: '100%', height: '100%' }} />
            <div style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '91%', bottom: 20, zIndex: 1, color: 'white', fontWeight: 'bold', display: 'flex' }}>
                {item.productname}
            </div>
        </div>

        )

    })


}