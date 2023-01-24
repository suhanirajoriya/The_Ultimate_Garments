/* import { RefreshSharp } from "@material-ui/icons"
import { useEffect, useState } from "react"

export default function SizeRadio(props) {
    const [sizeId, setSizeId] = useState('')
    const [sizes, setSizes] = useState([])
    const [refresh, setRefresh] = useState(true)
    // alert(JSON.stringify(props.sizelist))
 

    useEffect(function () {
        setSizes(props.sizelist)
        setRefresh(!refresh)
    }, [])

  
    return (<div style={{ display: 'flex', flexDirection: 'row' }}>
        {showSize()}
    </div>)
} */