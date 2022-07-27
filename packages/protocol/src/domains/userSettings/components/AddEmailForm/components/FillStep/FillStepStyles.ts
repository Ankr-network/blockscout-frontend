import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  inputRow: {
    display: 'flex',
    gridGap: theme.spacing(1.5),

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  emailTextfieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 'auto',
  },
  emailTextfield: {
    flex: 'auto',
  },
  emailInputRoot: {
    borderRadius: 17,
    height: 48,
  },
  submitButton: {
    borderRadius: 17,
    minWidth: 103,
  },
}));
