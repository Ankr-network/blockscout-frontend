import { makeStyles } from '@material-ui/core';

export const useUnstakeDialogStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(8, 0, 4),
    backgroundColor: theme.palette.background.paper,
    maxWidth: 600,
    margin: '0 auto',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0, 4),
    },
  },

  footer: {
    paddingTop: theme.spacing(4),
  },

  container: {
    maxWidth: 520 + theme.spacing(4),
    padding: theme.spacing(0, 2),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 4),
    },
  },

  title: {
    maxWidth: 395,
    margin: theme.spacing(0, 'auto', 5),
    textAlign: 'center',
  },

  networkTitle: {
    margin: theme.spacing(-2, 'auto', 4, 'auto'),
  },

  closeBtn: {
    position: 'absolute',
    top: theme.spacing(2.5),
    right: theme.spacing(2.5),

    width: theme.spacing(4),
    minWidth: 0,
    height: theme.spacing(4),
    padding: 0,

    borderRadius: '50%',
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  info: {
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(1.75),
    fontSize: 15,
  },

  timer: {
    whiteSpace: 'nowrap',
  },

  stepper: {
    maxWidth: 340,
    margin: '0 auto',
  },
}));
