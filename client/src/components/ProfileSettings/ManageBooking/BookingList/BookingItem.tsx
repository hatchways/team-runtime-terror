import { useState } from 'react';
import { Grid, Avatar, Button, Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import useStyles from './useStyles';
import { useAuth } from '../../../../context/useAuthContext';
import PaymentDialog from '../PaymentDialog';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

interface Props {
  status: string;
  date: string;
  imageSrc: string;
  ownerName: string;
}

const BookingItem = ({ status, date, imageSrc, ownerName }: Props): JSX.Element => {
  const classes = useStyles();

  const publishableKey = 'pk_test_DdPKckGX6of2znt85K6mN4Rc004w0QZ6xK';
  const secretKey =
    'sk_test_51FrLHPD6gDNbKjt9s09sTGnZ3sstFxDSkYUgTxBtKjhchVKeb0xva5YqNg4KEx2pzidZ9kTFHQE4MiOEElwg1D9000p88rLNyH';

  const stripeTestPromise = loadStripe(publishableKey as string);

  const { loggedInUser } = useAuth();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string | undefined) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box mt={4} display="flex" flexDirection="column" justifyContent="center" boxShadow="3" p={2}>
      <Box display="flex" flexDirection="row" justifyContent="space-around">
        <Typography variant="body2" gutterBottom>
          {date}
        </Typography>
        <SettingsIcon color="disabled" />
      </Box>
      <Box display="flex" flexDirection="row" mt={2} justifyContent="space-around">
        <Avatar alt="Profile Image" src={imageSrc} variant="circle" className={classes.photoAvatar} />
        <Typography className={classes.userName1}>{ownerName}</Typography>
        <Typography className={classes.status}>{status}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" mt={5} justifyContent="center">
        {status === 'COMPLETED' ? (
          <Button
            className={classes.payButton}
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
          >
            PAY
          </Button>
        ) : null}
      </Box>
      <Elements stripe={stripeTestPromise}>
        <PaymentDialog onClose={handleClose} selectedValue={selectedValue} open={open} />
      </Elements>
    </Box>
    // <Paper elevation={3} className={classes.internalPaper}>
    //   <Grid container spacing={2} className={classes.internalGrid}>
    //     <Grid item xs container direction="column" spacing={2}>
    //       <Grid item xs>
    //         <Typography variant="body2" gutterBottom>
    //           {date}
    //         </Typography>
    //       </Grid>
    //       <Grid item className={classes.avatarGrid}>
    //         <Avatar alt="Profile Image" src={imageSrc} variant="circle" className={classes.photoAvatar} />
    //         <Typography className={classes.userName}>{ownerName}</Typography>
    //       </Grid>
    //     </Grid>
    //     <Grid item className={classes.statusGrid} alignContent="center">
    //       <Typography className={classes.status}>{status}</Typography>
    //       {
    //         status === 'COMPLETED' ?
    //         (
    //           <Button size="small" variant="outlined" color="secondary">PAY</Button>
    //         ):
    //         (
    //           null
    //         )
    //       }
    //       <SettingsIcon color="disabled" />
    //     </Grid>
    //   </Grid>
    // </Paper>
    // <h1>Aman</h1>
  );
};

export default BookingItem;
