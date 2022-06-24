import { makeStyles, Theme } from '@material-ui/core';

export const useStakeStatsStyles = makeStyles<Theme>(theme => ({
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

  usd: {
    color: theme.palette.text.disabled,
    width: '100%',
    textAlign: 'right',
    fontSize: 12,
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakpoints.up('md')]: {
      width: 'auto',
      maxWidth: 120,
      textAlign: 'center',
      marginTop: theme.spacing(0.5),
    },
  },

  questionBtn: {
    marginTop: theme.spacing(-0.5),
  },

  questionIcon: {
    color: theme.palette.text.secondary,
  },

  statisticLabel: {
    color: `${theme.palette.text.secondary}`,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },

  statisticValueWrapper: {
    cursor: 'help',

    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
    },
  },

  statisticValue: {
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 120,

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },

  statisticToken: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
}));
