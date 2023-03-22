import { makeStyles } from 'tss-react/mui';

export const useRefreshButtonStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(3),
  },
  refreshButton: {
    overflow: 'visible',

    padding: 0,
    minWidth: 'auto',

    '&&': {
      border: 'none',
      boxShadow: 'none',
      minHeight: 24,
      height: 24,
    },

    transition: 'color .3s, background-color .3s',

    '&:hover': {
      backgroundColor: 'transparent',
    },

    '&:disabled': {
      backgroundColor: 'transparent',
    },
  },
}));
