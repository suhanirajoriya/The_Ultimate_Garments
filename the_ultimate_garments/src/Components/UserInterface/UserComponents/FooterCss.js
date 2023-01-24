import { makeStyles } from "@mui/styles";

export const useStyles =makeStyles({
    mainContainer:{
        width:'100%',
        height:'50%',
        background:' linear-gradient(rgba(44, 44, 44, 0.8),rgba(2, 1, 1, 0.8))'

    },
    headingStyle:{
        fontFamily:'Copperplate Gothic Light',
        color:'white',
        fontWeight:'bold',
        fontSize:'20px',
        padding:'6%',
        letterSpacing:1
    },
    txtStyle:{
        color:'white',
        letterSpacing:1,
        padding:'6%',
        fontFamily:'Cambria Math',
        display:'block'
    },
    imgset:{
    paddingLeft:'25%',
    color:'white'
    }
})