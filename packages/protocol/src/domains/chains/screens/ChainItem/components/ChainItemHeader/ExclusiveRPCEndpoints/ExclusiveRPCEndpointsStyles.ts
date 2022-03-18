import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  text: {
    fontWeight: 600,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  bottom: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0, 2),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },

    '& $copyToClip:not(:last-child)': {
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(2.5),
      },
    },
  },
  copyToClip: {
    flex: 1,
    maxWidth: '100%',
    minWidth: 0,
    marginBottom: 6,
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
}));
