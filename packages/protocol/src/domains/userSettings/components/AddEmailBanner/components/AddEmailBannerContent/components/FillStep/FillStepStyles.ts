import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    '& *': {
      lineHeight: '24px',
    },
  },
  description: {
    fontSize: 20,
    letterSpacing: '0.05em',

    color: theme.palette.grey[700],
    marginBottom: theme.spacing(3.75),
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
      marginBottom: theme.spacing(2),
    },
  },
  featureContainer: {
    display: 'grid',
    justifyContent: 'space-evenly',
    marginBottom: theme.spacing(3.75),

    gridTemplateColumns: 'repeat(4, 110px)',
    gridGap: theme.spacing(3.75),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 110px)',
    },

    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
      gridGap: theme.spacing(1.5),
      gridTemplateColumns: '1fr',
    },
  },
  feature: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      gridGap: theme.spacing(2),
    },
  },
  featureIcon: {
    width: 28,
    height: 28,
    color: theme.palette.primary.main,
  },
  featureText: {
    fontSize: 17,
  },
  notShowAgain: {
    alignSelf: 'center',
    letterSpacing: '0.04em',
    padding: 0,
    marginTop: theme.spacing(1.75),

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
  },
}));
