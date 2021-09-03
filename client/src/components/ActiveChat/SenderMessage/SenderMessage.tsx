import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';

interface Props {
  text: string;
}

function SenderMessage({ text }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    </Box>
  );
}

export default SenderMessage;
