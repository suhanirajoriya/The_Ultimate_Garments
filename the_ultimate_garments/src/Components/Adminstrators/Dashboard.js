import AdminAppBar from "./AdminAppBar"
import SideList from "./SideList";
import Category from "./Category";
import SubCategory from "./SubCategory";
import DisplayAllCategory from "./DisplayAllCategory";
import DisplaySubCategory from "./DisplaySubCategory";
import Product from "./Product";
import DisplayProduct from "./DisplayProduct";
import Size from "./Size";
import DisplaySize from "./DisplaySize";
import Color from "./Color";
import DisplayColor from "./DisplayColor";

import BannerImages from "./BannerImages";
import ProductImages from "./ProductImages";
import { Route } from "react-router";
import { Routes } from "react-router";

export default function Dashboard(props) {
    return (<div style={{ display: 'flex', flexDirection: 'column',width:'100%' }}>
        <AdminAppBar />

        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '15%' }}>
                <SideList />
            </div>
            <div style={{ width: '85%' }}>
                <Routes>
                    <Route element={<Category />} path="/category" />
                    <Route element={<DisplayAllCategory />} path="/displayallcategory" />
                    <Route element={<SubCategory />} path="/subcategory" />
                    <Route element={<DisplaySubCategory />} path="/displaysubcategory" />
                    <Route element={<Product />} path="/product" />
                    <Route element={<DisplayProduct />} path="/displayproduct" />
                    <Route element={<Size />} path="/size" />
                    <Route element={<DisplaySize />} path="/displaysize" />
                    <Route element={<Color />} path="/color" />
                    <Route element={<DisplayColor />} path="/displaycolor" />
                    <Route element={<BannerImages />} path="/bannerimages" />
          <Route element={<ProductImages />} path="/productimages" />

                </Routes>
            </div>
        </div>
    </div>
    )
}