import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    mainContainer: {
        width: '100wh',
        height: '100vh',
        background: '#e5e4e2',
        display: 'flex',
        justifyContent: 'center',
        padding:'0.1cm'


    },

    headbox: {
        width: '550px',
        height: '60px',
        background: '#EFF7FE',
        borderRadius: '0.5cm',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '19px'
    },
    headtxt: {
        fontFamily: 'Castellar',
        fontSize: '25px',
        borderRadius: '4px',
        textShadow: '2px 2px 8px black',
        fontWeight: 'bold'

    },
    gridStyle: {
        paddingLeft: '0.1cm',
        paddingTop: '0.5cm'
    },
    category: {
        marginTop: '-6cm',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',

    },

    textBox: {
        width: '600px',
        height: '60px',
        background: '#C2D5D5',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: '0.5cm'


    },
    text: {
        fontFamily: 'Times New Roman',
        fontSize: '30px',

    },

})