import { alpha, makeStyles } from '@material-ui/core';

export const useClaimUnstakesStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 4, 5),
    margin: 'auto',
    position: 'relative',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: theme.spacing(7),
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

  submit: {
    borderRadius: 16,
  },
}));
