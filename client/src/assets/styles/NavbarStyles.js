import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

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
    image: {
        marginLeft: '10px',
        marginTop: '5px',
        marginRight: '30px',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));