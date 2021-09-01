import { useEffect, useState, useCallback } from 'react';
import { Box, Badge, Avatar, Typography, Divider } from '@material-ui/core';
import { useConversation } from '../../../context/useActiveConvoContext';
import useStyles from './useStyles';
import { getConversations } from '../../../helpers/APICalls/conversation';
import Loading from '../../Layout/Loading';

const Chat = () => {
  const classes = useStyles();
  const [conversations, setConversations] = useState([]);
  const { updateActiveConversation } = useConversation();

  useEffect(() => {
    getConversations().then((conversations) => {
      setConversations(conversations);
    });
  }, []);

  const setActiveConvo = useCallback(
    (id: any) => {
      const activeConvo = conversations.find((convo: any) => {
        return convo._id === id;
      });

      updateActiveConversation(activeConvo);
    },
    [updateActiveConversation, conversations],
  );

  return (
    <>
      {conversations.length === 0 ? (
        <Loading />
      ) : (
        <>
          {conversations.map((convo: any) => {
            return (
              <>
                <Box className={classes.chatWrapper} key={convo._id} onClick={() => setActiveConvo(convo._id)}>
                  <Avatar className={classes.profilePic} src="" alt={convo.otherUser}>
                    {convo.otherUser.charAt(0)}
                  </Avatar>
                  <Box ml={5} mt={1}>
                    <Typography variant="h6" align="center" className={classes.chatHeader}>
                      {convo.otherUser}
                    </Typography>
                    <Typography variant="body1" align="center" className={classes.chatContent}>
                      {convo.latestMessageText}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default Chat;
