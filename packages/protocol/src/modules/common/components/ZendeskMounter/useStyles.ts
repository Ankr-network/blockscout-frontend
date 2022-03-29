import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  launcherContainer: {
    position: 'fixed',
    bottom: 15,
    right: theme.spacing(2),
    zIndex: 10000,

    [theme.breakpoints.down('sm')]: {
      bottom: 85,
    },
  },
  launcher: {
    background: theme.palette.primary.main,
    borderRadius: 34,
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.15)',
    border: 'none',
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
  launcherText: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: '130%',
    color: '#fff',
    marginLeft: 4,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  icon: {
    width: 24,
    height: 24,
  },
}));
