import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  inputBase: {
    paddingRight: 0,
    borderRadius: 16,
    fontSize: 14,

    '& label': { marginBottom: theme.spacing(2), fontWeight: 700 },
  },
  domain: {
    marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(3.5),
    maxHeight: 56,
  },
  addButton: {
    padding: 0,
    background: 'transparent',

    '&:hover': {
      background: 'transparent',
    },
  },
}));
