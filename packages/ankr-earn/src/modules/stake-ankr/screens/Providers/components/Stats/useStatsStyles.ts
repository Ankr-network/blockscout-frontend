import { makeStyles, Theme } from '@material-ui/core';

export const useStatsStyles = makeStyles<Theme>(theme => ({
  statisticWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: theme.spacing(0.5, 2),

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      padding: theme.spacing(4.5, 0),
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

    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
      flexGrow: 1,
      justifyContent: 'start',
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
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },

  questionBtn: {
    marginTop: theme.spacing(-0.5),
  },

  questionIcon: {
    color: theme.palette.text.secondary,
  },
}));
