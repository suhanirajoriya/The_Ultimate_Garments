import { useEffect, useState } from "react"

export default function ColorRadio(props) {
  var  selectedColor=null
    const [colorName, setColorName] = useState('')
 



    const handleColor = (cname) => {

        setColorName(cname)
        selectedColor=cname
        props.onClick(selectedColor)
    }

    useEffect(()=>{
        if(props && props.colorName)
        {
            setColorName(props.colorName)
        }
    })

    const showColor = () => {
        return Object.keys(props.colorlist).map((item) => {
            return (<div onClick={() => handleColor(item)} style={{ fontSize: '15px', display: 'inline-block', width: '47px', height: '47px', margin: ' -1px 4px 0 0', verticalAlign: 'center', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 33%)', backgroundRepeat: ' no-repeat', backgroundPosition: 'center', textAlign: 'center', lineHeight: '39px', cursor: 'pointer', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 33%)', padding: '1%', border: ` ${item == colorName ? '2px solid #51cccc' : '1px solid white'}`, margin: '1%', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', background: `${props.colorlist[item]}` }} value={item}></div>)
        })
    }


    return (
        <div>

            <div style={{ paddingTop: '1%' }}><span><span style={{ fontWeight: '400px', fontSize: '20px', paddingTop: '40px' }}>Color : </span><span style={{ color: 'grey' }}>{colorName}</span></span></div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {props.colorlist == null ? <div style={{fontSize:'12px',padding:'2px'}}>Plz Select Size</div> : showColor()}
            </div>
        </div>)


}