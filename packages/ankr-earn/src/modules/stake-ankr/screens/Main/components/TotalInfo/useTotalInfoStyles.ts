import { makeStyles } from '@material-ui/core';

export const useTotalInfoStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2.5),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 4),
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

  epochText: {
    color: theme.palette.text.secondary,
    fontSize: 'inherit',
    fontWeight: 500,
  },

  epochValue: {
    color: theme.palette.text.primary,
    fontSize: 'inherit',
    fontWeight: 400,
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
