import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bookingContainer: {
    margin: theme.spacing(25, 0, 0, 20),
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: '2rem',
    textAlign: 'center',
    width: '100vw',
    height: '55vh',
    display: 'flex',
    verticalAlign: 'top',
  },
  calendar: {
    marginTop: '0rem',
    paddingTop: '0rem',
  },
}));

export default useStyles;
