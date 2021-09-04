import { Grid, Container } from '@material-ui/core';
import BookingList from './BookingList/BookingList';
import CalendarDisplay from './Calendar/CalendarDisplay';
import useStyles from './useStyles';
import Navbar from '../../Navbar/Navbar';

const ManageBooking = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Container className={classes.bookingContainer}>
      <Navbar
        LOGOUT="/logout"
        PROFILE="/profile"
        MY_SITTER="/manage-bookings"
        BECOME_SITTER="/becomeSitter"
        MESSAGE="/messages"
        Logout="Log out"
        Profile="Profile"
        Mysitter="My Sitters"
        Becomesitter="BECOME A SITTER"
        Messages="Messages"
      />
      <Grid item>
        <BookingList />
      </Grid>

      <Grid item className={classes.calendar}>
        <CalendarDisplay />
      </Grid>
    </Container>
  );
};

export default ManageBooking;
