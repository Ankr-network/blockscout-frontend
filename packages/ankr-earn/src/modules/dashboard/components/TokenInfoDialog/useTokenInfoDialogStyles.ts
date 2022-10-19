import { makeStyles } from '@material-ui/core';

export const useTokenInfoDialogStyles = makeStyles(theme => ({
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

  header: {
    marginBottom: theme.spacing(2.5),
  },

  tokenAddress: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    margin: theme.spacing(0, 1),
  },

  description: {
    color: theme.palette.text.primary,
    fontSize: 14,
    margin: theme.spacing(0, 1),

    '& a': {
      color: theme.palette.primary.main,

      '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
      },
    },
  },

  row: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
  },

  rowName: {
    color: theme.palette.text.secondary,
    fontSize: 14,
  },

  buttons: {
    margin: theme.spacing(4),

    height: 40,
  },

  complete: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: 24,
    width: 24,
  },

  completeIcon: {
    height: 18,
    width: 18,
  },

  copyIcon: {
    height: 24,
    width: 24,
    color: theme.palette.text.secondary,
    transition: '0.2s color',
    cursor: 'pointer',
    flexShrink: 0,

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
