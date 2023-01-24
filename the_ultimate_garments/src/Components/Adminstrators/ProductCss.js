import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainContainer:{
        width:'100%',
        height:'100%',
        background:'#e5e4e2',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        margin:'3%',
        width:'900px',
        height:'500px',
        background:'white'
    },
    textBox:{
        width:'900px',
        height:'15%',
        background:'#C2D5D5',
        borderRadius:'4px',
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    marginBottom:'0.5cm'
    },
    gridStyle:{
        paddingRight:'0.5cm',
        paddingLeft:'0.5cm',
     
    },
    text:{
        fontFamily:'Times New Roman',
        fontSize:'30px',
    },
    text1:{
        fontFamily:'Times New Roman',
        fontSize:'20px',
        color :'black',
        padding:'0.4cm',
      
    },

})