import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: '5px',
        marginTop: '10px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 40px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        width: '100%',
    },
    share: {
        // fontSize: '10px',
        // [theme.shape.borderRadius('share')]: {
        //     borderRadius: '20px'
        // }
        marginRight: '20px'
    },
    logo: {
        textDecoration: 'none',
        fontFamily: 'Bradley Hand, cursive',
        fontSize: '2em',
        fontWeight: 300,
    },
    heading: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        fontSize: '2em',
        fontWeight: 300,
    },
    image: {
        marginLeft: '10px',
        marginTop: '5px',
        marginRight: '30px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        },
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            marginTop: 20,
            justifyContent: 'center',
        },
    },
    logout: {
        marginLeft: '20px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));