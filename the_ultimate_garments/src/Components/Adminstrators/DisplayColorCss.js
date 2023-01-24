import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainContainer: {
        width: '100%',
        height: '100%',
        background: '#e5e4e2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddding:'0.1cm'
    },

   
    txtBox: {
        width: 'auto',
        height: '60px',
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
        padding: '15px'
    },

})