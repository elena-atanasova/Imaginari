import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    background: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),
        minHeight:'500px',
        minWidth: '400px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',    
    },
    welcome: {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        lineHeight: '2.8'
    },
    form: {
        display:'flex',
        flexDirection: 'column',
        alignItem: 'center',
        justifyContent: 'center',  
        width: '75%',
        marginTop: theme.spacing(2),
    },
    googleButton: {
        marginBottom: theme.spacing(2),
    },
    account: {
        fontSize: '16px',
        fontFamily: 'Calibri',
        textAlign: 'center'
    },
}));