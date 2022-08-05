import { makeStyles } from '@material-ui/core';

export const useTabsStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: 150,

    '& .MuiTab-root': {
      fontSize: 24,
    },

    '& .MuiTabs-indicator': {
      display: 'none',
    },

    [theme.breakpoints.up('sm')]: {
      height: 70,
    },
  },

  btn: {
    height: 40,
    backgroundColor: 'transparent',

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 0, 1.5),
    },

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
