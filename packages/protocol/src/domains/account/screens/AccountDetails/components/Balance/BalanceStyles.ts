import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  balanceRoot: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(2.5, 3.75, 3.75),

    borderRadius: theme.spacing(3),

    background: theme.palette.background.paper,

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 3, 3),
    },

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: 14,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
  },
  title: {
    color: theme.palette.text.primary,
    letterSpacing: '0.01em',

    fontWeight: 700,
    fontSize: 14,
    lineHeight: '26px',
  },
  withdrawButton: {
    height: 'auto',
    padding: 0,

    letterSpacing: '0.01em',

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '26px',

    '&:hover': {
      background: 'none',
    },
  },
  balance: {
    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',

    fontWeight: 600,
    fontSize: 45,
    lineHeight: '52px',
    height: '100%',
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      fontSize: 34,
      lineHeight: '40px',
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '3px 9px',
  },
  usdtBalance: {
    color: theme.palette.grey[600],
    letterSpacing: '0.01em',

    fontWeight: 700,
    fontSize: 14,
    lineHeight: '20px',

    [theme.breakpoints.down('xs')]: {
      letterSpacing: '0.02em',

      fontSize: 11,
      lineHeight: '16px',
    },
  },
  description: {
    color: theme.palette.grey[600],
    letterSpacing: '0.01em',

    fontWeight: 400,
    fontSize: 14,
    lineHeight: '20px',

    [theme.breakpoints.down('xs')]: {
      letterSpacing: '0.02em',

      fontSize: 11,
      lineHeight: '16px',
    },
  },
}));
