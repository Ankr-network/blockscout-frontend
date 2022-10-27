import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const usePlansStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: theme.spacing(3.75),
    rowGap: theme.spacing(2),
    marginTop: theme.spacing(5),
    position: 'relative',

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  plan: {
    background: theme.palette.common.white,
    borderRadius: 40,
    padding: 4,
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      borderRadius: 28,
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    background: theme.palette.common.white,
    borderRadius: 36,
    padding: 36,

    [theme.breakpoints.down('xs')]: {
      padding: 24,
      borderRadius: 24,
    },
  },

  premium: {
    background:
      'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',

    '& $container': {
      background: theme.palette.common.white,
    },
  },

  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: 35,

    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
  },
  premiumTitle: {
    '& span': {
      lineHeight: 1.167,
    },
  },
  label: {
    marginBottom: theme.spacing(1),
    fontSize: 20,

    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  description: {
    fontWeight: 400,

    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  features: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 28,
    marginBottom: theme.spacing(5),
  },
  feature: {
    background: theme.palette.background.default,
    borderRadius: 20,
    padding: theme.spacing(1, 2),
    display: 'inline-block',
    marginBottom: theme.spacing(0.5),
    '&:nth-child(2n+1)': {
      marginRight: theme.spacing(0.5),
    },
  },
  featureText: {
    fontWeight: 600,
  },
  link: {
    padding: 0,
    height: 'auto',
    '&:hover': {
      background: 'none',
    },
  },
}));
