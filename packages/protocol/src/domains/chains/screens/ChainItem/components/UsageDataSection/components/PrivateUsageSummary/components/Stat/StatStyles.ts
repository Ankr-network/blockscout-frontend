import { makeStyles, Theme } from '@material-ui/core';

export const useStatStyles = makeStyles<Theme>(theme => ({
  stat: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: theme.spacing(2),
    margin: theme.spacing(1.5, 0),

    flex: 1,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.25),

    flex: 1,

    width: '100%',

    [theme.breakpoints.down('xs')]: {
      gap: theme.spacing(0.5),
    },
  },
  title: {
    color: theme.palette.grey[600],
    letterSpacing: '0.01em',

    fontWeight: 400,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,
  },
  value: {
    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',

    fontWeight: 700,
    fontSize: theme.spacing(3.5),
    lineHeight: `${theme.spacing(4)}px`,

    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(2),
      lineHeight: `${theme.spacing(2.5)}px`,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      lineHeight: `${theme.spacing(4)}px`,
    },
  },
  skeleton: {
    width: '50%',
    height: theme.spacing(4),

    transform: 'none',

    [theme.breakpoints.down('lg')]: {
      height: theme.spacing(2.5),
    },

    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(4),
    },
  },
}));
