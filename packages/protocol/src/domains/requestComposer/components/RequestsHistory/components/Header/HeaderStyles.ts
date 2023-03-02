import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: theme.spacing(0, 7),
  },
  title: {
    color: theme.palette.common.white,

    fontWeight: 700,
    fontSize: theme.spacing(4),
    lineHeight: theme.spacing(6),
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
  },
}));
