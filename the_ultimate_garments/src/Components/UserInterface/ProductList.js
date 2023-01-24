import React, { useState, useEffect } from "react";
import { postData } from "../Services/NodeServices";
import { useParams } from "react-router";
import AllProductDetails from "./UserComponents/AllProductDetails";
import MainBar from "./UserComponents/MainBar";
import MainBar2 from "./UserComponents/MainBar2";
import Footer from "./UserComponents/Footer";
import { Grade } from "@material-ui/icons";
import FilterComponent from "./UserComponents/FilterComponent";
import { Grid } from "@mui/material";

export default function ProductList(props) {
    const [productList, setProductList] = useState([])
    var { id } = useParams()

    const fetchProductBySubcategory = async () => {

        var body = { subcategoryid: id }
        var result = await postData('userinterface/fetch_products_by_subcategory', body)
        setProductList(result.data)

    }

    useEffect(function () {
        fetchProductBySubcategory()
    }, [])

    return (
        <div>
            <MainBar />
            <MainBar2 />
            <Grid container>
                <Grid item xs={3}style={{marginTop:'1%'}}>
                    <FilterComponent />
                </Grid>
                <Grid item xs={9}>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '1%' }}>
                        <AllProductDetails data={productList} />
                    </div>
                </Grid>
            </Grid>
            <Footer />
        </div>

    )
}
