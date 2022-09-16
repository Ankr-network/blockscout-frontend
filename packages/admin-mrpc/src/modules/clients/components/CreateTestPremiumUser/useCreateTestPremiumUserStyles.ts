import { makeStyles } from '@material-ui/core';

export const useCreateTestPremiumUserStyles = makeStyles(theme => {
  return {
    button: {
      marginRight: 20,
      textTransform: 'none',
    },
    paper: {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      position: 'absolute',
      width: 540,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    input: {
      width: '100%',
    },
  };
});
