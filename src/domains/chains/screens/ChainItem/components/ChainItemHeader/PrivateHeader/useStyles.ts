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
    justifyContent: 'space-between',

    '& $copyToClip:not(:last-child)': {
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(2.5),
      },
    },

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  copyToClip: {
    flexGrow: 1,
    maxWidth: '48%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
  preloaderWrapper: {
    minHeight: 120,
    position: 'relative',
  },
}));
