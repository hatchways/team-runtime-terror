import { Box, FormControl, FilledInput } from '@material-ui/core';
import { useConversation } from '../../../context/useActiveConvoContext';
import { useAuth } from '../../../context/useAuthContext';
import useStyles from './useStyles';
import { sendMessage } from '../../../helpers/APICalls/conversation';

const InputBox = () => {
  const classes = useStyles();

  const { conversations } = useConversation();
  const { loggedInUser } = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const payLoad = {
      messageText: event.target.text.value,
      recipientId: conversations!.otherUserId,
      senderId: loggedInUser!.id,
      conversationId: conversations!._id,
    };

    sendMessage(payLoad);
  };

  return (
    <Box>
      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput classes={{ root: classes.input }} disableUnderline placeholder="Type something..." name="text" />
        </FormControl>
      </form>
    </Box>
  );
};

export default InputBox;
