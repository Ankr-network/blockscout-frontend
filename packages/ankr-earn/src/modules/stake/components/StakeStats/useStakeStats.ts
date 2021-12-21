import { makeStyles, Theme } from '@material-ui/core';

export const useStakeStats = makeStyles<Theme>(theme => ({
  statisticWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: theme.spacing(4.5, 0),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: theme.spacing(0.5, 2),
    },
  },

  statistic: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,

    '&:after': {
      position: 'absolute',
      top: '50%',
      right: 0,
      content: '""',
      display: 'block',
      backgroundColor: `${theme.palette.background.default}`,
      height: theme.spacing(8.5),
      width: theme.spacing(0.25),
      transform: 'translate(-50%, -50%)',
    },

    '&:last-of-type:after': {
      display: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      minHeight: theme.spacing(8.5),
      justifyContent: 'space-between',

      '&:after': {
        display: 'none',
      },

      borderBottom: `2px solid ${theme.palette.background.default}`,

      '&:last-of-type': {
        borderBottom: 'none',
      },
    },
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

  statisticValue: {
    fontSize: 20,
    fontWeight: 'bold',

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },

  statisticDivider: {
    backgroundColor: `${theme.palette.background.default}`,
    height: theme.spacing(8.5),
    width: theme.spacing(0.25),
  },
}));
