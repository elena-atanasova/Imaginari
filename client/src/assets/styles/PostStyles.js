import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  card: {
    justifyContent: 'space-between',
    borderRadius: '10px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      '& $additionalInfo': {
        display: 'block',
      },
    },
  },
  action: {
    textAlign: 'initial',
    display: 'block',
  },
  media: {
    height: 0,
    paddingTop: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  top: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  title: {
    padding: '0 16px',
    fontSize: '22px',
    fontWeight: 'bold',
    fontFamily: 'Calibri'
  },
  actions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: '15px',
    fontFamily: 'Calibri',
    fontWeight: 'bold',
    marginTop: '5px'
  },
});