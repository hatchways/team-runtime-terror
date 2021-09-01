import { Box, Typography } from '@material-ui/core';
import { useConversation } from '../../../context/useActiveConvoContext';
import { useAuth } from '../../../context/useAuthContext';
import ReceiverMessage from '../ReceiverMessage/ReceiverMessage';
import SenderMessage from '../SenderMessage/SenderMessage';
import useStyles from './useStyles';

const Messages = () => {
  const classes = useStyles();
  const { conversations } = useConversation();
  const { loggedInUser } = useAuth();

  return (
    <Box className={classes.messageWrapper}>
      {conversations!.messages!.map((message) => {
        return message!.senderId === loggedInUser!.id ? (
          <SenderMessage key={message!.id} text={message!.messageText} />
        ) : (
          <ReceiverMessage key={message!.id} text={message!.messageText} />
        );
      })}
    </Box>
  );
};

export default Messages;
