import { alpha, makeStyles, Theme } from '@material-ui/core';

export const useHistoryDialogStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(7, 0, 2),
    backgroundColor: theme.palette.background.paper,
    maxWidth: 600,
    margin: '0 auto',
  },

  container: {
    '&&': {
      maxWidth: 600,
      padding: theme.spacing(0, 3.75),
    },
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  header: {
    marginBottom: theme.spacing(2.5),
  },

  transactionTypeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },

  transactionType: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 600,
    width: 'auto',
    background: alpha(theme.palette.text.secondary, 0.15),
    borderRadius: 16,
    padding: theme.spacing(0.5),
  },

  typeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    background: 'none',
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(0.5),
    padding: theme.spacing(0.5, 0.75),

    '&:hover': {
      background: 'none',
      color: theme.palette.primary.main,
    },

    '&:last-of-type': {
      marginRight: 0,
    },
  },

  typeButtonActive: {
    color: theme.palette.primary.main,
    cursor: 'default',
    background: theme.palette.background.paper,
    borderRadius: 12,

    '&:hover': {
      background: theme.palette.background.paper,
    },
  },

  networkSeparator: {
    borderRight: `1px solid ${alpha(theme.palette.text.secondary, 0.15)}`,
  },

  th: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    height: 40,
    textAlign: 'left',
    padding: theme.spacing(0, 2.5),

    '&:first-of-type': {
      borderRadius: '6px 0 0 6px',
    },

    '&:last-of-type': {
      borderRadius: '0 6px 6px 0',
    },
  },

  tr: {
    height: 50,
    borderBottom: `1px solid ${theme.palette.background.default}`,

    '&:last-of-type': {
      borderBottom: `none`,
    },
  },

  td: {
    padding: theme.spacing(0, 2.5),
    textAlign: 'left',
    minHeight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  amount: {
    cursor: 'pointer',
  },

  empty: {
    padding: theme.spacing(14, 0, 22),
    textAlign: 'center',
    color: theme.palette.action.disabledBackground,
    fontSize: 22,
  },

  txLink: {
    padding: 0,
    height: 'auto',
    width: 'auto',
    minWidth: 0,

    color: theme.palette.text.secondary,
    fontWeight: 500,

    transition: '0.2s all',

    '&:hover': {
      background: 'none',
      color: theme.palette.text.primary,
    },
  },
}));
