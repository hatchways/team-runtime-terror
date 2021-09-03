import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chatWrapper: {
    height: 80,
    margin: theme.spacing(3, 0, 0, 0),
    display: 'flex',
    flexDirection: 'row',
    bottom: -10,
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
    transform: 'translate(-40%, 45%)',
  },
  chatContent: {
    flexGrow: 1,
  },
  chatHeader: {
    fontWeight: 'bold',
  },
}));

export default useStyles;
