import { makeStyles } from 'tss-react/mui';

export const useProjectNameStyles = makeStyles()(theme => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  tooltip: {
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  name: {
    color: theme.palette.text.primary,
    display: 'block',
  },
  button: {
    padding: theme.spacing(0),
    margin: theme.spacing(0, 0, 0, 1),
    minWidth: theme.spacing(6),
    minHeight: theme.spacing(6),
    width: theme.spacing(6),
    height: theme.spacing(6),

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
}));
