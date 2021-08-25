import { useAuth } from '../../context/useAuthContext';
<<<<<<< HEAD
import useStyles from './useStyles';
import { Button, Card, Typography, Avatar, CardActions, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ProfilePhoto = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
=======
import { useState } from 'react';
import useStyles from './useStyles';
import { Button, Card, Typography, Avatar, CardActions, Paper, Input, FormLabel } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import formDataAPI from '../../helpers/APICalls/formDataAPI';

const ProfilePhoto = () => {
  const classes = useStyles();
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState(' Upload a file from your device!!!!');
  const [uploadedFile, setUploadedFile] = useState({});
  const [isInputClicked, setIsInputClicked] = useState(false);
  const { loggedInUser } = useAuth();
  const [avatarImage, setAvatarImage] = useState(`https://robohash.org/${loggedInUser!.email}.png`);

  const onInputChange = (e: any) => {
    setFile(e.target.files[0]);
    setFilename(`Upload ${e.target.files[0].name}`);
    setIsInputClicked(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { fileName, filePath } = await formDataAPI(file);
      setUploadedFile({ fileName, filePath });
      setAvatarImage(filePath);
      setIsInputClicked(false);
    } catch (err) {
      setFilename(`Failed to upload image!`);
    }
  };
>>>>>>> ae795a08e4f75fa7bbf9a612ce4f81bd52d16c94

  return (
    <Paper elevation={5} className={classes.photoPaper}>
      <Card className={classes.photoCard}>
        <Typography variant="h5" className={classes.photoHeader}>
          Profile Photo
        </Typography>

<<<<<<< HEAD
        <Avatar
          alt="Profile Image"
          src={`https://robohash.org/${loggedInUser!.email}.png`}
          className={classes.photoAvatar}
          variant="circle"
        />

=======
        <Avatar alt="Profile Image" src={avatarImage} className={classes.photoAvatar} variant="circle" />
>>>>>>> ae795a08e4f75fa7bbf9a612ce4f81bd52d16c94
        <Typography variant="subtitle1" className={classes.photoText}>
          Be sure to use a photo that clearly shows your face
        </Typography>
        <CardActions>
<<<<<<< HEAD
          <Button
            variant="outlined"
            fullWidth
            className={classes.photoButton}
            classes={{
              root: classes.buttonRoot,
            }}
          >
            Upload a file from your device
          </Button>
=======
          <form action="/" method="POST" className={classes.form} encType="multipart/form-data" onSubmit={handleSubmit}>
            {!isInputClicked && (
              <FormLabel htmlFor="imageUpload" className={classes.photoLabel}>
                <Input fullWidth type="file" id="imageUpload" onChange={onInputChange} className={classes.photoInput} />
                Upload a file from your device
              </FormLabel>
            )}

            {isInputClicked && (
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                className={classes.photoButton}
                classes={{
                  root: classes.buttonRoot,
                }}
              >
                {filename}
              </Button>
            )}
          </form>
>>>>>>> ae795a08e4f75fa7bbf9a612ce4f81bd52d16c94
        </CardActions>
        <Typography variant="subtitle1" className={classes.photoText}>
          <DeleteIcon className={classes.deleteIcon} /> Delete photo
        </Typography>
      </Card>
    </Paper>
  );
};
<<<<<<< HEAD

=======
>>>>>>> ae795a08e4f75fa7bbf9a612ce4f81bd52d16c94
export default ProfilePhoto;