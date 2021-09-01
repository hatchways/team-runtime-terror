import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'date-fns';
import {
  Box,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
} from '@material-ui/core';
import useStyles from './useStyles';
import { FetchOptions } from '../../../interface/FetchOptions';
import { useAuth } from '../../../context/useAuthContext';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const Availability = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [daysOfWeek, setDaysOfWeek] = React.useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [startDate, setStartDate] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'));
  const [endDate, setEndDate] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'));
  const [rate, setRate] = React.useState<{ dollar: string | number; name: string }>({
    dollar: '',
    name: 'hai',
  });
  useEffect(() => {
    const incomingData = async () => {
      const fetchOptions: FetchOptions = {
        method: 'GET',
        credentials: 'include',
      };
      const data = await fetch(`/availability/fetch/${loggedInUser!.email}`, fetchOptions)
        .then((res) => res.json())
        .catch(() => ({
          error: { message: 'Unable to connect to server. Please try again' },
        }));
      setStartDate(new Date(data.startDate));
      setEndDate(new Date(data.endDate));
      const days = {} as any;
      data.daysOfWeek.forEach((value: string) => {
        days[value] = true;
      });
      setDaysOfWeek(Object.assign(daysOfWeek, days));
    };
    incomingData();
  }, [loggedInUser, daysOfWeek, rate]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleRate = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof rate;
    setRate({
      ...rate,
      [name]: event.target.value,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDaysOfWeek({ ...daysOfWeek, [event.target.name]: event.target.checked });
  };

  const availability = {
    email: loggedInUser!.email,
    startDate: startDate,
    endDate: endDate,
    daysOfWeek: daysOfWeek,
    rate: rate.dollar,
  };

  const handleSubmit = async () => {
    await axios
      .post(`/availability/update`, availability)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormControl>
      <Box component="div" m={2}>
        <Typography className={classes.heading} component="h1" variant="h5">
          Availability
        </Typography>
      </Box>
      <Box className={classes.box} m={1} p={1}>
        <Box p={1}>
          <Typography className={classes.typo} component="h1" variant="h6">
            Availability Timeline
          </Typography>
        </Box>
        <Paper className={classes.paper} elevation={1}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                className={classes.date}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                className={classes.date}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Paper>
      </Box>
      <Box className={classes.box} m={1} p={1}>
        <Box p={1}>
          <Typography className={classes.typo} component="h1" variant="h6">
            Days of week
          </Typography>
        </Box>
        <Paper className={classes.paper} elevation={1}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={daysOfWeek.monday}
                checked={daysOfWeek.monday}
                onChange={handleChange}
                name="monday"
                color="primary"
              />
            }
            label="Monday"
          />
          <FormControlLabel
            control={<Checkbox checked={daysOfWeek.tuesday} onChange={handleChange} name="tuesday" color="primary" />}
            label="Tuesday"
          />
          <FormControlLabel
            control={
              <Checkbox checked={daysOfWeek.wednesday} onChange={handleChange} name="wednesday" color="primary" />
            }
            label="Wednesday"
          />
          <FormControlLabel
            control={<Checkbox checked={daysOfWeek.thursday} onChange={handleChange} name="thursday" color="primary" />}
            label="Thursday"
          />
          <FormControlLabel
            control={<Checkbox checked={daysOfWeek.friday} onChange={handleChange} name="friday" color="primary" />}
            label="Friday"
          />
          <FormControlLabel
            control={<Checkbox checked={daysOfWeek.saturday} onChange={handleChange} name="saturday" color="primary" />}
            label="Saturday"
          />
          <FormControlLabel
            control={<Checkbox checked={daysOfWeek.sunday} onChange={handleChange} name="sunday" color="primary" />}
            label="Sunday"
          />
        </Paper>
      </Box>

      <Box component="div" display="block" m={1} p={1}>
        <Box p={1}>
          <Typography className={classes.typo} component="h1" variant="h6">
            Rate
          </Typography>
        </Box>
        <Paper className={classes.paper} elevation={1}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="age-native-simple">Rate</InputLabel>
            <Select
              native
              value={rate.dollar}
              onChange={handleRate}
              inputProps={{
                name: 'dollar',
                id: 'age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>$10</option>
              <option value={20}>$20</option>
              <option value={30}>$30</option>
            </Select>
          </FormControl>
        </Paper>
      </Box>
      <Button color="secondary" className={classes.submit} variant="contained" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </FormControl>
  );
};

export default Availability;
