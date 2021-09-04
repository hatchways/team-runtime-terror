import useStyles from './useStyles';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Card,
  CardActionArea,
  Divider,
  CardContent,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { getAllProfiles } from '../../../helpers/APICalls/profile';
import { Profile } from '../../../interface/Profile';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Layout/Loading';

const ProfileListings = () => {
  const classes = useStyles();

  const [profilesData, setProfilesData] = useState<Profile[]>([]);

  const setProfiles = (profiles: Profile[]) => {
    setProfilesData(profiles);
  };

  useEffect(() => {
    async function fetchProfiles() {
      const fetchedProfiles = await getAllProfiles();

      if (fetchedProfiles) {
        setProfiles(fetchedProfiles.profiles!);
      }
    }

    fetchProfiles();
  }, []);

  return (
    <>
      {!profilesData ? (
        <Loading />
      ) : (
        <Grid container className={classes.root}>
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
          <Grid item xs={12}>
            <Grid container direction="column">
              <Grid item>
                <Box justifyContent="center">
                  <Typography variant="h4" align="center">
                    Your search results
                  </Typography>
                  <Box display="flex" justifyContent="center" mt={3}>
                    <TextField
                      label="Search by location"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField margin="normal" variant="outlined" type="date" />
                  </Box>

                  <Box display="flex" flexWrap="wrap" justifyContent="center" pt={5} className={classes.profileArea}>
                    {profilesData.map((profile) => {
                      return (
                        <Card key={profile._id} className={classes.cardWrapper}>
                          <CardActionArea component={Link} to={`/profile-details/${profile._id}`}>
                            <Avatar
                              className={classes.cardAvatar}
                              alt={`Avatar of ${profile.firstName}`}
                              src={profile.filePath}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" align="center">
                                {profile.firstName} {profile.lastName}
                              </Typography>
                              <Typography gutterBottom variant="body1" align="center">
                                {profile.address}
                              </Typography>
                              <Typography align="center">
                                <Rating readOnly />
                              </Typography>
                              <Typography align="center" variant="body2" color="textSecondary">
                                {profile.description}
                              </Typography>

                              <Divider variant="fullWidth" style={{ margin: '5px' }} />

                              <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography variant="body2" color="textSecondary">
                                  <LocationOnIcon color="secondary" fontSize="small" />
                                  {profile.address}
                                </Typography>

                                <Typography variant="body1" color="textSecondary">
                                  {profile.rate}
                                </Typography>
                              </Box>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      );
                    })}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProfileListings;
