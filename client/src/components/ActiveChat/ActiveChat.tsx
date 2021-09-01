import { Box } from '@material-ui/core';
import Header from './Header/Header';
import InputBox from './InputBox/InputBox';
import Messages from './Messages/Messages';
import useStyles from './useStyles';
import { useConversation } from '../../context/useActiveConvoContext';
import Loading from '../Layout/Loading';

const ActiveChat = () => {
  const classes = useStyles();
  const { conversations } = useConversation();

  return (
    <>
      {!conversations ? (
        <Loading />
      ) : (
        <Box mt={11} className={classes.root}>
          <Header />
          <Box className={classes.chatContainer}>
            <Messages />
          </Box>

          <InputBox />
        </Box>
      )}
    </>
  );
};

export default ActiveChat;
