import { makeStyles } from '@material-ui/core';

export const useTransactionInfoStyles = makeStyles(theme => ({
  root: {
    borderRadius: 12,
    boxShadow: `0px 0px 1px ${theme.palette.text.secondary}, 0px 9px 12px -6px ${theme.palette.grey[500]}`,

    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 2),
    margin: 'auto',

    position: 'fixed',
    top: theme.spacing(2),
    left: 0,
    right: 0,
    maxWidth: 740,
    width: `calc(100% - ${2 * theme.spacing(5)}px)`,
    zIndex: 1500,

    [theme.breakpoints.down('sm')]: {
      maxWidth: `calc(100vw - ${2 * theme.spacing(2)}px)`,
      width: `calc(100% - ${2 * theme.spacing(2)}px)`,
    },
  },

  wrapper: {
    alignItems: 'center',
    display: 'flex',
  },

  errorReason: {
    marginLeft: theme.spacing(0.5),
  },

  link: {
    height: 'initial',
    padding: 0,
    marginLeft: theme.spacing(0.5),

    '&:hover': {
      backgroundColor: 'inherit',
    },

    '& path': {
      stroke: theme.palette.text.secondary,
    },
  },

  status: {
    borderRadius: 2,

    marginRight: theme.spacing(1),
    height: 26,
    width: 4,
  },

  default: {
    backgroundColor: theme.palette.primary.main,
  },

  success: {
    backgroundColor: theme.palette.success.main,
  },

  error: {
    backgroundColor: theme.palette.error.main,
  },

  title: {
    fontSize: 14,
  },

  close: {
    cursor: 'pointer',
  },
}));
