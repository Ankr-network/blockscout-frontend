import { makeStyles } from '@material-ui/core';

export const useAddTokenBtnStyles = makeStyles(theme => ({
  root: {
    border: '1px solid #E2E8F3',
    background: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    minWidth: 124,
    padding: theme.spacing(0, 1.5),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 1),
    },

    '&:hover': {
      color: theme.palette.primary.main,
      background: theme.palette.background.paper,
    },
  },

  tokenIcon: {
    marginRight: theme.spacing(1),
  },

  plusIcon: {
    width: 12,
    height: 12,
    marginLeft: 'auto',

    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1.5),
    },
  },
}));
