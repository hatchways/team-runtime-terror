import { Box, Typography, Badge, Avatar } from '@material-ui/core';
import useStyles from './useStyles';
import { MoreHoriz } from '@material-ui/icons';
import { useConversation } from '../../../context/useActiveConvoContext';

const Header = () => {
  const classes = useStyles();
  const { conversations } = useConversation();

  return (
    <Box p={2} className={classes.header} display="flex" flexDirection="row">
      <Badge anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} className={classes.badge}>
        <Avatar className={classes.profilePic} src="">
          {conversations!.otherUser.charAt(0)}
        </Avatar>
      </Badge>
      <Typography className={classes.username} align="center" variant="h5">
        {conversations!.otherUser}
      </Typography>
      <MoreHoriz className={classes.hamburger} />
    </Box>
  );
};

export default Header;
