import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  loading: {
    padding: '25px', 
    borderRadius: '20px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100px',
  },
  card: {
    display: 'flex',
    height: '100%',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  part: {
    flex: 1,
    borderRadius: '20px',
    margin: '10px',
  },
  image: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  media: {
    borderRadius: '15px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '550px',
  },
  recommendations: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  innerContainer: {
    height: '200px', 
    overflowY: 'auto', 
    marginRight: '30px'
  },
  outerContainer: {
    display: 'flex', 
    justifyContent: 'space-between',
  },
}));