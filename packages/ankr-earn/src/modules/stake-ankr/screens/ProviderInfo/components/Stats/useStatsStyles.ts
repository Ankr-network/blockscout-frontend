import { makeStyles } from '@material-ui/core';

export const useStatsStyles = makeStyles(theme => ({
  statisticWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: theme.spacing(0.5, 2),
    marginBottom: theme.spacing(3),
    border: `2px solid ${theme.palette.background.default}`,

    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      padding: theme.spacing(3, 0),
    },
  },

  statistic: {
    minHeight: theme.spacing(8.5),
    display: 'flex',
    justifyContent: 'space-between',
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

  statisticLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: `${theme.palette.text.secondary}`,
    fontSize: 14,
    fontWeight: 'bold',

    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(1),
    },
  },

  value: {
    fontSize: 18,
    fontWeight: 700,
  },
}));
