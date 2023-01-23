import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  balanceRoot: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(2 * 2.5, 2 * 3.75, 2 * 3.75),

    borderRadius: theme.spacing(2 * 3),

    background: theme.palette.background.paper,

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2 * 2, 2 * 3, 2 * 3),
    },

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: theme.spacing(2 * 1.75),
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
    lineHeight: theme.spacing(2 * 3.25),
  },
  withdrawButton: {
    height: 'auto',
    padding: 0,

    letterSpacing: '0.01em',

    fontWeight: 600,
    fontSize: 14,
    lineHeight: theme.spacing(2 * 3.25),

    '&:hover': {
      background: 'none',
    },
  },
  balance: {
    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',

    fontWeight: 600,
    fontSize: 45,
    lineHeight: theme.spacing(2 * 6.5),
    height: '100%',
    marginBottom: theme.spacing(2 * 2),

    [theme.breakpoints.down('xs')]: {
      fontSize: 34,
      lineHeight: theme.spacing(2 * 5),
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(2 * 0.375, 2 * 1.125),
  },
  usdtBalance: {
    color: theme.palette.grey[600],
    letterSpacing: '0.01em',

    fontWeight: 700,
    fontSize: 14,
    lineHeight: theme.spacing(2 * 2.5),

    [theme.breakpoints.down('xs')]: {
      letterSpacing: '0.02em',

      fontSize: 11,
      lineHeight: theme.spacing(2 * 2),
    },
  },
  description: {
    color: theme.palette.grey[600],
    letterSpacing: '0.01em',

    fontWeight: 400,
    fontSize: 14,
    lineHeight: theme.spacing(2 * 2.5),

    [theme.breakpoints.down('xs')]: {
      letterSpacing: '0.02em',

      fontSize: 11,
      lineHeight: theme.spacing(2 * 2),
    },
  },
}));
