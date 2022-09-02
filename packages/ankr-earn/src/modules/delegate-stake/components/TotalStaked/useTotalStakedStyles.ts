import { makeStyles } from '@material-ui/core';

export const useTotalStakedStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2.5),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 3),
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

  content: {
    display: 'flex',
    flexDirection: 'column',
    height: 230,

    [theme.breakpoints.up('lg')]: {
      height: 170,
    },
  },

  colWithDevider: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2.5),

    [theme.breakpoints.up('md')]: {
      margin: 0,
      padding: theme.spacing(0, 0, 0, 2),
      borderWidth: '0 0 0 1px',
    },

    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(0, 0, 0, 4),
    },
  },

  contentFooter: {
    marginTop: 'auto',
  },

  root: {
    display: 'flex',
    alignItems: 'center',
  },

  amount: {
    marginBottom: theme.spacing(1),
    maxWidth: 170,

    fontWeight: 700,
    fontSize: 32,
    lineHeight: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakpoints.up('md')]: {
      maxWidth: 350,
    },
  },

  usdAmount: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
    lineHeight: 1,
    fontSize: 'inherit',
  },

  token: {
    marginLeft: theme.spacing(1),
    fontWeight: 600,
    fontSize: 14,
  },

  footer: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
  },

  btn: {
    height: 50,
  },

  btnRegular: {
    fontWeight: 600,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },

  btnRound: {
    width: 50,
  },
}));
