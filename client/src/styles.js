import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    image: {
        marginLeft: '10px',
    },
    [theme.breakpoints.down('sm')]: {
        mainContainer: {
            flexDirection: "column-reverse"
        }
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
    },
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));
