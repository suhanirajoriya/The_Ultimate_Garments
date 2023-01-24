import React from "react";
import { useNavigate } from "react-router";
import { serverURL } from "../../Services/NodeServices";


export default function OneCardComponents(props) {

    var navigate = useNavigate()
    const handleChange = (scid) => {
        navigate(`/${props.url}/${scid}`)
    }


    return props.images.map((item) => {
        return (<div onClick={() => handleChange(item.subcategoryid)} style={{ position: 'relative', width: 1120, height: 370, display: 'flex', flexDirection: 'row', padding: '1%' }}>
            <img src={`${serverURL}/images/${item.icon}`} style={{ width: '100%', height: '100%' }} />

        </div>


        )
    })
}
