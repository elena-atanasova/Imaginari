import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    background: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    paper: {
        minHeight:'500px',
        minWidth: '400px',
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',    
    },
    account: {
        fontSize: '14px',
        fontFamily: 'Arial',
        textAlign: 'center'
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
    },
    form: {
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        display:'flex',
        flexDirection: 'column',
        alignItem: 'center',
        justifyContent: 'center',
        
    },
    submit: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'red',
    },
    googleButton: {
        marginBottom: theme.spacing(2),
        
        
        
    },
    welcome: {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        lineHeight: '2.8'
    },
    divider: {
        margitTop: '20px'
    },
    
}));