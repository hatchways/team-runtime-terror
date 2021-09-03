import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    height: '15%',
  },
  username: {
    margin: theme.spacing(1.5, 0, 0, 7),
    fontWeight: 'bold',
  },
  profilePic: {
    height: 44,
    width: 44,
  },
  badge: {
    height: 13,
    width: 13,
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: '#D0DAE9',
  },
  hamburger: {
    margin: theme.spacing(1.5, 0, 0, 100),
  },
}));

export default useStyles;
