import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  text: {
    fontWeight: 600,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    display: 'flex',
    alignItems: 'center',

    '& >:not(:last-child)': {
      marginRight: theme.spacing(2.5),
    },
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),

    '& $copyToClip:not(:last-child)': {
      marginRight: theme.spacing(2.5),
    },
  },
  copyToClip: {
    flexGrow: 1,
  },
}));
