import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  link: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 1.167,
    '&.custom-link:hover': {
      color: theme.palette.primary.main,
    },
    /* just icon "back" for breadcrumbs link */
    [theme.breakpoints.down('md')]: {
      padding: 10,
      border: '1px solid #CDCDCD',
      borderRadius: '50%',
      width: 36,
      height: 36,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  text: {},
  separator: {
    fontSize: 22,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  breadcrumbs: {
    alignItems: 'baseline',
  },
  mobileBackButton: {
    transform: 'rotate(180deg)',
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5,
  },
}));
