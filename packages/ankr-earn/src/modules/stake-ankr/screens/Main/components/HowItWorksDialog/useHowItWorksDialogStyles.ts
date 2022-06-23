import { makeStyles } from '@material-ui/core';

export const useHowItWorksDialogStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(7, 0, 5),
    maxWidth: 700,
  },

  container: {
    padding: 0,

    '&&': {
      maxWidth: 600,
      padding: theme.spacing(0, 2),
    },
  },

  header: {
    marginBottom: theme.spacing(2.5),
  },

  title: {
    margin: theme.spacing(2, 0, 1, 2),
  },

  article: {
    color: theme.palette.text.primary,
    fontSize: 14,
    margin: theme.spacing(2, 0, 4),
  },

  footerBtn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(0, 2),
    margin: theme.spacing(2, 0, 2),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(4, 0, 0),
      flexDirection: 'row',
    },
  },

  button: {
    width: '100%',
    margin: theme.spacing(2, 0, 0),

    [theme.breakpoints.up('sm')]: {
      margin: 0,
    },
  },

  docsButton: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  graph: {
    width: '100%',
  },

  block: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  circle: {
    width: 36,
    height: 36,
    minWidth: 36,
    padding: 0,
    fontSize: 18,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: '50%',
  },
}));
