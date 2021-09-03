import Navbar from '../../components/Navbar/Navbar';
import { Grid, CssBaseline } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import useStyles from './useStyles';
import ActiveChat from '../../components/ActiveChat/ActiveChat';

const Message = () => {
  const classes = useStyles();
  const { loggedInUser }: any = useAuth();

  return (
    <Grid container component="main" className={classes.root}>
      <Navbar
        LOGOUT="/logout"
        PROFILE="/profile"
        MY_SITTER="/mySitter"
        BECOME_SITTER="/becomeSitter"
        MESSAGE="/message"
        Logout="Log out"
        Profile="Profile"
        Mysitter="My Sitters"
        Becomesitter="BECOME A SITTER"
        Messages="Messages"
      />
      <CssBaseline />
      <ChatSideBanner loggedInUser={loggedInUser} />
      <ActiveChat />
    </Grid>
  );
};

export default Message;
