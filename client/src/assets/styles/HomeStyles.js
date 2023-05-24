import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse',
        },
    },
    searchBar: {
        fontFamily: 'Calibri',
        borderRadius: '10px',
        marginBottom: '10px',
        display: 'flex',
        padding: '16px',
    },
    searchButton: {
        fontFamily: 'Calibri',
        borderRadius: '20px',
        backgroundColor: '#452c63',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#662d91',
        },
    },
    pag: {
        borderRadius: 4,
        marginTop: '10px',
        padding: '16px',
    },
}));