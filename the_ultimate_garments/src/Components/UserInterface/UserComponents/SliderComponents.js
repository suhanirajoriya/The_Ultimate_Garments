import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { serverURL } from "../../Services/NodeServices";


export default function SliderComponent(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    var mySlider = createRef();


    

    const handleBack = () => {

        mySlider.current.slickPrev()
    }

    const handleForward = () => {
        mySlider.current.slickNext()
    }
    console.log('1',props.bannersettings)
    const setImageInSlider = () => {

        return props.images.map((item) => {
            
            return (<div>
                <img width='100%' src={`${serverURL}/images/${item}`} />
            </div>)
        })
    }


    return (<div>

{props.images.length>0?

        <div style={{ width: '100%', height: '80%' }}>
            {matches ? <></> :
                <div style={{ left: '1%', opacity: '80%', background: 'white', width: '2%', height: '4%', position: 'absolute', top: '60%', zIndex: '2', borderRadius: '60%', display: 'flex', justifyContent: 'center' }}>
                    <ArrowBackIcon fontSize="small" style={{ position: 'absolute', top: '10%', zIndex: '2' }} onClick={handleBack} />
                </div>
            }
            <Slider {...props.bannersettings} ref={mySlider} >
                {setImageInSlider()}
            </Slider>
            {matches ? <></> :

                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <div style={{ background: 'white', width: '2%', height: '4%', position: 'absolute', top: '60%', zIndex: '2', borderRadius: '60%', display: 'flex', justifyContent: 'center', right: '1%', opacity: '80%', }}>
                        <ArrowForwardIcon fontSize="small" style={{ position: 'absolute', top: '10%', zIndex: '2' }} onClick={handleForward} />
                    </div>
                </div>
            }
        </div>
        :<div>hyy</div>}
    </div>)

}