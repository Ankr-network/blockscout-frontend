import { makeStyles } from '@material-ui/core';

export const useTransactionInfoStyles = makeStyles(theme => ({
  root: {
    borderRadius: 12,

    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing('12px', 2),
    marginBottom: theme.spacing(3),
  },

  wrapper: {
    alignItems: 'center',
    display: 'flex',
  },

  link: {
    height: 'initial',
    padding: 0,
    marginLeft: 4,

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
