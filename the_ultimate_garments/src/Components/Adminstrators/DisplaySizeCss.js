import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainContainer1: {
        width: '100%',
        height: '100%',
        background: '#e5e4e2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    box: {
      width:'auto',
      height:'auto',
      background:'white',
      border:'2px solid black',
      padding:'0.5cm'
    },
    textBox:{
        width:'500px',
        height:'50px',
        background:'#C2D5D5',
        borderRadius:'4px',
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    text:{
        fontFamily:'Times New Roman',
        fontSize:'30px',
    },
    gridStyle:{
  padding:'15px'
        
    },


}
)