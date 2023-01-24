import ProductInfoUpBar from "./UserComponents/ProductInfoUpBar"
import ProductListRight from "./UserComponents/ProductListRight"
import { Grid } from "@material-ui/core"
import ProductInfoLeft from "./UserComponents/ProductInfoLeft"
import { serverURL } from "../Services/NodeServices"
import Footer from "./UserComponents/Footer"
import SizeRadio from "./UserComponents/SizeRadio"
import { useLocation } from "react-router"
import { useState } from "react"
export default function ProductInfo(props) {

    const [refresh,setRefresh]=useState(false)

    var location = useLocation()
    var product = location.state.product

    const updateCart=()=>{
        setRefresh(!refresh)
    }


 


    return (<div>
        <ProductInfoUpBar />
        <Grid container >
            <Grid item xs={6} style={{ marginTop: '2%' }}>
                <ProductInfoLeft  productid={product.productid}/>
            </Grid>
            <Grid item xs={6} >
                <ProductListRight updateCart={updateCart} ProductInfo={product} />
            </Grid>
        </Grid>
        <Grid item xs={12}>  <Footer /></Grid>


    </div>)
} 