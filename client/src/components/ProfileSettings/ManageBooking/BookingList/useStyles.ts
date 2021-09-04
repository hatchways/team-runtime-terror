import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: 450,
    margin: '2rem',
    marginLeft: '0rem',
  },
  bookingWrapper: {
    padding: theme.spacing(2),
    maxWidth: 450,
    height: '40vh',
    margin: '2rem',
    marginLeft: '0rem',
    overflowY: 'scroll',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  photoAvatar: {
    display: 'inline-block',
    width: '48px',
    height: '48px',
    border: '0.5px solid grey',
  },
  userName1: {
    display: 'inline',
    marginLeft: '-70px',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  userName: {
    display: 'inline',
    marginLeft: '1.5rem',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  status: {
    display: 'inline',
    marginRight: '1rem',
    color: 'grey',
    marginTop: '21px',
  },
  bookingText: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  internalGrid: {
    borderRadius: '0.3px',
    margin: '0rem 0rem 2rem 3rem',
    width: '85%',
  },
  avatarGrid: {
    verticalAlign: 'middle',
    alignItems: 'center',
    display: 'flex',
  },
  statusGrid: {
    verticalAlign: 'middle',
    display: 'flex',
  },
  internalPaper: {
    width: '100%',
    margin: '0rem',
  },

  overflowGrid: {
    overflow: 'auto',
    flexGrow: 1,
    height: '60vh',
    paddingRight: '1rem',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'lightgrey',
      borderRadius: '5px',
    },
  },
  payButton: {
    width: 40,
  },
}));

export default useStyles;
