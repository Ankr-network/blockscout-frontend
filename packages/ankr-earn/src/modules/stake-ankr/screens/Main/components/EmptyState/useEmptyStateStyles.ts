import { makeStyles } from '@material-ui/core';

export const useEmptyStateStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: theme.spacing(4),

    // [theme.breakpoints.up('md')]: {
    //   padding: theme.spacing(3, 4),
    // },
  },

  button: {
    width: '180px',
  },

  statisticWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: theme.spacing(0.5, 2),

    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      padding: theme.spacing(3, 0),
    },
  },

  statistic: {
    minHeight: theme.spacing(8.5),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexFlow: 'row wrap',
    padding: theme.spacing(1, 0),
    borderBottom: `2px solid ${theme.palette.background.default}`,

    [theme.breakpoints.up('lg')]: {
      maxWidth: '50%',
      flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      padding: theme.spacing(0, 3),
      borderBottom: 'none',
      borderRight: `2px solid ${theme.palette.background.default}`,
    },

    '&:last-of-type': {
      border: 'none',
    },
  },

  wrapper: {
    marginTop: theme.spacing(2),
  },

  desciptionItem: {
    fontSize: 14,
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
      marginTop: 0,
      marginLeft: theme.spacing(1),
      textAlign: 'start',
    },
  },
}));
