import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(2.5, 3.5),
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `2px solid ${theme.palette.background.paper}`,
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  left: {
    width: '48%',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      paddingBottom: theme.spacing(2.5),
      borderBottom: `2px solid ${theme.palette.background.paper}`,
      marginBottom: theme.spacing(2.5),
    },
  },
  text: {
    fontWeight: 600,
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  bottom: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  right: {
    width: '48%',
    marginLeft: theme.spacing(1),
    '& $copyToClip:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  copyToClip: {
    minWidth: 360,
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      minWidth: 'auto',
    },
  },
}));
