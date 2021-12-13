import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: theme.spacing(0, 2),
    color: theme.palette.text.secondary,
    background: 'none',
    fontWeight: 400,
    transition: 'color 0.2s',
    '&:hover': {
      color: theme.palette.primary.main,
      background: 'none',
    },
    '&& svg': {
      fontSize: 10,
      transition: '0.2s all',
    },
  },
  buttonActive: {
    '&& svg': {
      transform: 'rotate(180deg)',
    },
  },
  popover: {
    boxShadow: 'none',
  },
  menuPaper: {
    background: '#FFFFFF',
    border: '1px solid #E2E7F0',
    borderRadius: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    padding: theme.spacing(0.5, 2),
    minWidth: 150,

    '& a': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'start',
      padding: 0,
      height: 'auto',
      width: '100%',

      '& span': {
        padding: theme.spacing(2, 0),
      },

      '&:after': {
        display: 'block',
        content: '""',
        width: '100%',
        height: 1,
        background: '#E2E7F0',
      },

      '&:last-of-type:after': {
        display: 'none',
      },
    },
  },
}));
