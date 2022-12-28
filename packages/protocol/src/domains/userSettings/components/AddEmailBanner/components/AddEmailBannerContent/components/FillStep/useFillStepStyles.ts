import { makeStyles, Theme } from '@material-ui/core';

export const useFillStepStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    '& *': {
      lineHeight: '24px',
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
}));
