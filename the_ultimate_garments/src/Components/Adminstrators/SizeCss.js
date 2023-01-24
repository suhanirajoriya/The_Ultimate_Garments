import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainContainer: {
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
      marginTop:'-5%'
    
    },
    textBox:{
        width:'700px',
        height:'100px',
        background:'#C2D5D5',
        borderRadius:'4px',
        display:'flex',

        alignContent:'center',
        alignItems:'center'
    },
    text:{
        fontFamily:'Times New Roman',
        fontSize:'30px',
        padding:'2.5%',
    },
    gridStyle:{
  padding:'15px'
        
    },
})