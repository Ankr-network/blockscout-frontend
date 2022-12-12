import { makeStyles } from '@material-ui/core';

export const useAirdropModalStyles = makeStyles(theme => ({
  root: {
    maxWidth: 620,

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 5, 5),
    },
  },

  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2.5),
  },

  text: {
    marginBottom: theme.spacing(3),
    fontWeight: 400,

    '& a': {
      color: theme.palette.primary.main,
      wordBreak: 'break-word',

      '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  },
}));
