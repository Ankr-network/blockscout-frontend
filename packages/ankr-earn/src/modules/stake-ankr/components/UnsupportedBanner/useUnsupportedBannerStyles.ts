import { makeStyles } from '@material-ui/core';

export const useUnsupportedBannerStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4, 2, 4),
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
    },
  },

  bigLogo: {
    width: 159,
    marginBottom: theme.spacing(2),
  },

  title: {
    marginBottom: theme.spacing(2),
  },

  button: {
    width: 180,
  },

  desc: {
    fontSize: 16,
    fontWeight: 400,
    marginBottom: theme.spacing(4),

    '& a': {
      color: theme.palette.primary.main,

      '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  },
}));
