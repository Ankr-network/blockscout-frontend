import { makeStyles } from '@material-ui/core';

export const useTotalInfoStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2.5),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 4),
    },
  },

  col: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 2, 0, 0),
    },
  },

  colWithDevider: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2.5),
    border: `solid ${theme.palette.grey[200]}`,
    borderWidth: '1px 0 0',

    [theme.breakpoints.up('md')]: {
      margin: 0,
      padding: theme.spacing(0, 0, 0, 2),
      borderWidth: '0 0 0 1px',
    },

    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(0, 0, 0, 4),
    },
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5),

    color: theme.palette.text.secondary,
    fontSize: 'inherit',
    fontWeight: 700,
  },

  btn: {
    height: 50,
  },

  btnRegular: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },

  btnRound: {
    width: 50,
  },
}));
