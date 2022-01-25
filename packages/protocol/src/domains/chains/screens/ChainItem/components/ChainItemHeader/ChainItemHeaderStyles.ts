import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(2.5, 3.5),
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `2px solid ${theme.palette.background.default}`,
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  left: {
    width: '49%',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      paddingBottom: theme.spacing(2.5),
      borderBottom: `2px solid ${theme.palette.background.default}`,
      marginBottom: theme.spacing(2.5),
    },
  },
  tooltip: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
  text: {
    fontWeight: 600,
  },
  right: {
    width: '49%',

    '& $copyToClip:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },

    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  preloaderWrapper: {
    minHeight: 120,
    position: 'relative',
  },
}));
