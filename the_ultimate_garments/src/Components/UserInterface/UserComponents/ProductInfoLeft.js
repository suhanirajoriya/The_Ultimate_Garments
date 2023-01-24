import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { postData, serverURL } from '../../Services/NodeServices';


export default function ProductInfoLeft(props) {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [images, setImages] = useState([]);



  const fetchAllProductImages = async () => {
    var result = await postData('userinterface/fetch_all_productimg', { productid: props.productid })
    setImages(JSON.parse(result.data[0].bannerimages))
  }
  useEffect(function () {
    fetchAllProductImages()
  }, [])

  const setImagesBig = () => {
    return images.map((item) => {
      return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'yellow', width: '750px' }}>
        <img src={`${serverURL}/images/${item}`} width='170%' />
      </div >)
    })
  }

  const setImagesSmall = () => {
    return images.map((item) => {
      return (<div>
        <img src={`${serverURL}/images/${item}`} width='14%' />
      </div>)
    })
  }


  return (
    <div >
      <div>
        <Slider
          style={{ height: '100%' }}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={false}
          fade={true}
          autoplay={true}
          infinite={true}
          autoplaySpeed='1000'
          centerMode={true}
          centerPadding='30%'
          mobileFirst={true}

          asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
          {setImagesBig()}
        </Slider>
      </div>
      <div style={{ marginTop: '-91%', marginLeft: '9%' }}>
        <Slider
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
          slidesToShow={5}
          swipeToSlide={true}
          centerMode={false}
          focusOnSelect={true}
          dots={true}
          vertical={true}

        >
          {setImagesSmall()}
        </Slider>
      </div>
    </div >
  );
}
