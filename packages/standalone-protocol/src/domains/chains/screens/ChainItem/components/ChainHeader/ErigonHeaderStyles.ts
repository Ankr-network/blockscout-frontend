import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(1),
    textAlign: 'center',
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(11),
    },
  },
  img: {
    maxWidth: 128,
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: 20,
    textTransform: 'uppercase',

    [theme.breakpoints.down('sm')]: {
      fontSize: 50,
    },
  },
  description: {
    maxWidth: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },

    '& a': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
  },
  features: {
    display: 'grid',
    columnGap: theme.spacing(4),
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      rowGap: theme.spacing(4),
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  feature: {
    display: 'block',
    padding: theme.spacing(2, 6),
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 12,
    transition: 'background-color .2s',

    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 2),
    },
  },
  top: {
    marginBottom: theme.spacing(1.25),
  },
}));
