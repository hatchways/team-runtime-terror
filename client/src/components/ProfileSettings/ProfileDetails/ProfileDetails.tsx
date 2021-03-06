import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import useStyles from './useStyles';
import Navbar from '../../Navbar/Navbar';
import profCover from '../../../Images/profcover.jpg';
import profimg from '../../../Images/profimg.jpg';
import doggo from '../../../Images/dog1.jpg';
import doggo1 from '../../../Images/dog2.jpg';
import { useState, useEffect } from 'react';
import { getProfileDetails } from '../../../helpers/APICalls/profile';
import { useAuth } from '../../../context/useAuthContext';
import Loading from '../../Layout/Loading';
import { Profile } from '../../../interface/Profile';
import { useParams } from 'react-router-dom';

interface paramTypes {
  id: string;
}

const ProfileDetails = (): JSX.Element => {
  const classes = useStyles();

  const { loggedInUser } = useAuth();

  const profileId = useParams<paramTypes>();

  const [profile, setProfileData] = useState<Profile>();

  useEffect(() => {
    getProfileDetails(profileId?.id).then((profileData) => {
      setProfileData(profileData);
    });
  }, [profileId, loggedInUser]);

  return (
    <>
      {!profile ? (
        <Loading />
      ) : (
        <Grid container className={classes.root}>
          <Navbar
            LOGOUT="/logout"
            PROFILE="/profile"
            MY_SITTER="/mySitter"
            BECOME_SITTER="/becomeSitter"
            MESSAGE="/message"
            Logout="Log out"
            Profile="Profile"
            Mysitter="My Sitters"
            Becomesitter="BECOME A SITTER"
            Messages="Messages"
          />
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item>
                <Paper elevation={12} className={classes.profileWrapper}>
                  <Card className={classes.cardWrapper}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.cardImage}
                        component="img"
                        alt="profile details img"
                        height="250"
                        image={profCover}
                      />
                      <Avatar className={classes.cardAvatar} alt="Remy Sharp" src={profile.filePath} />
                    </CardActionArea>
                    <CardContent className={classes.contentWrapper}>
                      <Typography align="center" variant="h4">
                        {profile.firstName} {profile.lastName}
                      </Typography>
                      <Typography align="center" gutterBottom variant="body1">
                        {profile.description}
                      </Typography>
                      <Typography align="center" gutterBottom variant="body2">
                        <LocationOnIcon className={classes.locationIcon} color="secondary" fontSize="small" />
                        {profile.address}
                      </Typography>
                      <Typography gutterBottom variant="h4">
                        About me
                      </Typography>
                      <Typography align="left" gutterBottom variant="subtitle1" component="h2">
                        {profile.description}
                      </Typography>
                      <Box display="flex" p={2} flexDirection="row" flexBasis="1">
                        <Avatar className={classes.thumbImages} variant="square" alt="Remy Sharp" src={doggo} />
                        <Avatar className={classes.thumbImages} variant="square" alt="Remy Sharp" src={doggo1} />
                      </Box>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>

              <Grid item>
                <Paper elevation={12} className={classes.availWrapper}>
                  <Box p={5}>
                    <Typography gutterBottom align="center" variant="h4">
                      {profile.rate}
                    </Typography>
                    <Typography align="center">
                      <Rating name="read-only" readOnly />
                    </Typography>
                    {/* HANDLING FORMDATA YET TO BE IMPLEMENTED */}
                    <form>
                      <Box p={4}>
                        <Box>
                          <Typography variant="caption" align="left" style={{ textTransform: 'uppercase' }}>
                            drop in
                          </Typography>
                          <TextField id="datetime-dropin" type="datetime-local" className={classes.dateInput} />
                        </Box>
                        <Box mt={2}>
                          <Typography variant="caption" align="left" style={{ textTransform: 'uppercase' }}>
                            drop off
                          </Typography>
                          <TextField id="datetime-dropoff" type="datetime-local" className={classes.dateInput} />
                        </Box>
                        <Box mt={5} ml={7}>
                          <Button variant="contained" color="secondary" size="large">
                            SEND REQUEST
                          </Button>
                        </Box>
                      </Box>
                    </form>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProfileDetails;
