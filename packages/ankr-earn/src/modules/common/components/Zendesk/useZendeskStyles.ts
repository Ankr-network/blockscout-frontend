import { makeStyles } from '@material-ui/core';

export const useZendeskStyles = makeStyles(theme => ({
  launcherContainer: {
    position: 'fixed',
    bottom: 15,
    right: theme.spacing(2),
    zIndex: theme.zIndex.modal,
  },

  launcher: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 34,
    boxShadow: `0px 4px 14px ${theme.palette.grey[300]}`,
    transition: 'all 200ms',

    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },

    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },

  launcherText: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: '130%',
    color: theme.palette.common.white,
    marginLeft: theme.spacing(0.5),

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  icon: {
    [theme.breakpoints.down('xs')]: {
      width: '1em',
      height: '1em',
      fontSize: 32,
    },
  },
}));
