import { Toolbar, Typography, Grid, Box } from '@material-ui/core';
import useStyles from './useStyles';

// interface Props {}
const Notification = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.notificationText}>Notification</Typography>
    </Box>
  );
};
export default Notification;
