import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  fix: {
    padding: theme.spacing(2),
  },
  main: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  form: {
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  create: {
    lineHeight: '2.8',
    fontFamily: 'Calibri',
    fontWeight: 'bold',
  },
  file: {
    marginLeft: '50px',
    marginBottom: '5px',
    width: '100%',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));