import { Margin } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainContainer: {
        width: '100wh',
        height: '100vh',
        background: '#e5e4e2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddding:'0.1cm',
        
    },

    box: {

        width: '60%',
        height: 'auto',
        background: 'white',
        padding: '0cm',


    },
    box1: {

        width: '70%',
        height: 'auto',
        background: 'white',
        padding: '0.1cm',
        border: '1px solid black'

    },

    txtBox: {
        width: 'auto',
        height: '80px',
        background: '#C2D5D5',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontFamily: 'Times New Roman',
        fontSize: '30px',
    },
    gridStyle: {
        padding: '10px'
    },
    mg:{
        paddingBottm:'2px',
        Margin:'2px'
    }

})