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
    fontWeight: 700,
    cursor: 'pointer',

    [theme.breakpoints.up('md')]: {
      fontSize: 30,
    },
  },

  tabActive: {
    cursor: 'default',
  },

  chip: {
    borderRadius: 8,
    marginLeft: theme.spacing(1),
    height: 20,
    width: 24,
  },

  btn: {
    height: 40,
    width: 120,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    margin: theme.spacing(0.5, 0, 0.5, 0.5),
    backgroundColor: '#fff',

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 0, 1.5),
    },
  },
}));
