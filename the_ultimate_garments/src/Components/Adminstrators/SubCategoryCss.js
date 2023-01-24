
import { makeStyles } from '@mui/styles';



export const useStyles = makeStyles({
    mainContainer: {
        width: '100%',
        height: '100%',
        background: '#e5e4e2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize:'cover'

    },
    box: {
        width: '60%',
        height: '500px',
        background: 'white',
        display: 'flex',

    },
    textBox: {
        width: '700px',
        height: '80px',
        background: '#C2D5D5',
        borderRadius: '4px',
        display: 'flex',
padding:'2%',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Times New Roman',
        fontSize: '25px',
    },
    gridStyle: {
        paddingLeft: '10px',
        paddingRight: '10px',

    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }


});



