import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  text: {
    fontWeight: 600,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  root: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  copyToClip: {
    flex: 1,
    maxWidth: '100%',
    minWidth: 0,
  },
  preloaderWrapper: {
    minHeight: 85,
    position: 'relative',
  },
  button: {
    height: 23,
    padding: 0,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  section: {
    display: 'flex',
    gap: theme.spacing(2),
    flex: 1,

    maxWidth: '100%',
  },
}));
