import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: '10px',
      marginRight: '10px',
      width: 200,
    },
    box: {
      display: 'block',
    },
    submit: {
      padding: '5px',
      width: '15%',
      fontSize: '15px',
      margin: '5px auto',
    },
    paper: {
      padding: '12px',
    },
    input: {
      width: '15%',
    },
    heading: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    date: {
      margin: 'auto',
    },
    typo: {
      /* textTransform: "uppercase" */
    },
  }),
);

export default useStyles;
