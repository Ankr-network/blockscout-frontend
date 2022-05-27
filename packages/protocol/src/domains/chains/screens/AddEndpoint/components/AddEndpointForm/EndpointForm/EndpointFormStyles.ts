import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  agreementText: {
    '&': {
      display: 'inline-flex',
      paddingLeft: theme.spacing(1),
      lineHeight: 1.5,
    },
  },
  buttonWrapper: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 210,
    },
  },

  text: {
    fontSize: 17,
    fontWeight: 600,
  },
  httpAddress: {
    '& label': { marginBottom: theme.spacing(2), fontWeight: 700 },
  },
  inputBase: {
    backgroundColor: theme.palette.background.paper,
  },
  pasteButton: {
    padding: 0,
    background: 'transparent',

    '&:hover': {
      background: 'transparent',
    },
  },
}));
