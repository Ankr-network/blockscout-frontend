import { alpha, makeStyles } from '@material-ui/core';

export const useRestakeStyles = makeStyles(theme => ({
  root: {
    maxWidth: 730,
    padding: theme.spacing(6, 7),
    margin: 'auto',
    position: 'relative',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 4),
    },
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: theme.spacing(5),
  },

  table: {
    marginBottom: theme.spacing(3),
  },

  row: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),

    borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.4)}`,

    '&:last-child': {
      borderBottom: 'none',
    },
  },

  rowName: {
    fontSize: 14,
    lineHeight: '24px',
    fontWeight: 'bold',
  },

  rowValue: {
    color: theme.palette.text.primary,
    fontSize: 14,
    lineHeight: '17px',
  },

  stakeBtn: {
    borderRadius: 16,
  },
}));
