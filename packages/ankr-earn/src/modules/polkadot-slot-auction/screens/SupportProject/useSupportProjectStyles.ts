import { makeStyles } from '@material-ui/core';

export const useSupportProjectStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    maxWidth: 700,
    margin: theme.spacing('60px', 'auto'),
    padding: '50px 50px 50px 50px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 18,
  },
  title: {
    margin: theme.spacing(0, 0, 8, 0),
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    border: 'none',

    '& a:hover': {
      backgroundColor: 'inherit',
    },
  },
}));
