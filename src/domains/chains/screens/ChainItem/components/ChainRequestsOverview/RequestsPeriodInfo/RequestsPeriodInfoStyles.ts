import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    textAlign: 'center',
    cursor: 'pointer',
    opacity: 0.5,
    paddingTop: theme.spacing(3),
    transition: 'opacity 0.2s ease-in',
    width: '30%',

    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(2.5),
    },
  },
  description: {
    marginBottom: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  timeframe: {
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  active: {
    opacity: 1,
    cursor: 'default',
    position: 'relative',

    '& $timeframe': {
      fontWeight: 'bold',
    },

    '&:before': {
      content: '""',
      display: 'block',
      width: '100%',
      height: 3,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: 0,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
