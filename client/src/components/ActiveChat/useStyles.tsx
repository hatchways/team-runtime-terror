import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 30,
    flexGrow: 2,
    boxShadow: '0 2px 20px 0 rgba(88,133,196,0.10)',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: -17,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
    height: '50px',
    overflowY: 'auto',
  },
}));

export default useStyles;
