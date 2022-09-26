import { makeStyles } from '@material-ui/core';

export const useTabsStyles = makeStyles(theme => ({
  tabs: {
    display: 'flex',
    flexDirection: 'row',
  },

  tabSelected: {
    '&.Mui-selected': {
      borderBottom: 'none',
    },
  },

  tabArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing(4.5),

    '&:first-of-type': {
      marginLeft: 0,
    },
  },

  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  tabText: {
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 24,
  },

  tabActive: {
    cursor: 'default',
  },

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
