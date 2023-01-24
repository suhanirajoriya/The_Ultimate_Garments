import MainBar from "./UserComponents/MainBar";
import MainBar2 from "./UserComponents/MainBar2";
import { createRef, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getData, postData, serverURL } from "../Services/NodeServices";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SliderComponent from "./UserComponents/SliderComponents";
import SmallCardComponents from "./UserComponents/SmallCardComponents";
import { style } from "@mui/system";
import ThreeCardComponents from "./UserComponents/ThreeCardComponents";
import OneCardComponent from "./UserComponents/OneCardComponent";
import Footer from "./UserComponents/Footer";
import TwoCardComponents from "./UserComponents/TwoCardComponents";





var bannersettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
};


export default function Home(props) {

    const [banner, setBanner] = useState([])
    const [subCategoryImgBy4, setSubCategoryImgBy4] = useState([])
    const [subCategoryImgBy3, setSubCategoryImgBy3] = useState([])
    const [oneCardImage, setOneCardImage] = useState([])
    const [productImgByPriority2, setproductImgByPriority2] = useState([])
    const [productImgByTrending, setProductImgByTrending] = useState([])
    const [productImgByPopular, setProductImgByPopular] = useState([])


    const fetchSubCategoryImgBy4 = async (priority) => {
        var body = { "priority": priority }
        var result = await postData('userinterface/display_subcategory_by_4', body)
        setSubCategoryImgBy4(result.data)
    }
    const fetchSubCategoryImgBy3 = async (priority) => {
        var body = { "priority": priority }
        var result = await postData('userinterface/display_subcategory_by_3', body)
        setSubCategoryImgBy3(result.data)
    }

    const fetchSubCategoryByPriority = async (priority) => {
        var body = { "priority": priority }
        var result = await postData('userinterface/display_subcategory_by_priority', body)
        setOneCardImage(result.data)

    }

    const fetchProductImgByTrending = async (status) => {
        var body = { "status": status }
        var result = await postData('userinterface/display_productimg_by_trending', body)
        setProductImgByTrending(result.data)

    }
    const fetchProductImgByPopular = async (status) => {
        var body = { "status": status }
        var result = await postData('userinterface/display_productimg_by_popular', body)
        setProductImgByPopular(result.data)

    }

    const fetchSubCategoryByPriority2 = async (priority) => {
        var body = { "priority": priority }
        var result = await postData('userinterface/display_subcategory_by_priority_2', body)
        setproductImgByPriority2(result.data)

    }

    useEffect(function () {
        fetchSubCategoryImgBy4("4")
        fetchSubCategoryImgBy3("3")
        fetchSubCategoryByPriority("1")
        fetchSubCategoryByPriority2('2')
        fetchProductImgByTrending('Trending')
        fetchProductImgByPopular("Popular")

    }, [])

    const Heading = (props) => {
        return (<div style={{ width: '100wh', textAlign: 'center', fontSize: 22, letterSpacing: 1, fontWeight: '600', margin: 5, color: props.color, paddingTop: '3%' }}>
            <hr />
            {props.heading}
            <hr />
        </div>)
    }

    const fetchBannerImg = async () => {

        var result = await getData('category/display_all_banner')
        var temp = result.data
        setBanner(temp)

    }

    useEffect(function () {
        fetchBannerImg()
    }, [])

    // two card components

    return (<div>
        <MainBar />
        <MainBar2 />
        <SliderComponent images={banner} bannersettings={bannersettings} />

        {/*trending products for women*/}
        <Heading heading="TRENDING PRODUCTS" color="#000" />
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <SmallCardComponents images={productImgByTrending} />
        </div>

        {/*trending products for women*/}
        <Heading heading="POPULAR PRODUCTS" color="#000" />
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <SmallCardComponents images={productImgByPopular} url={'productinfo'} />
        </div>

        {/* Shop For Men */}

        <Heading heading="SHOP FOR MEN" color="#000" />
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <ThreeCardComponents images={subCategoryImgBy4} />
        </div>

        {/*  //Shop For WoMen */}

        <Heading heading="SHOP FOR WOMEN" color="#000" />
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <ThreeCardComponents images={subCategoryImgBy3} />
        </div>


        {/* //Top Wear */}
        <Heading heading="TOP WEAR" color="#000" />
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <TwoCardComponents images={productImgByPriority2} />
        </div>
        {/* 
       //one card components */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <OneCardComponent images={oneCardImage} url={'productlist'} />
        </div>
        <Footer />

    </div>)
}