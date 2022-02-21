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
    maxWidth: '50%',
    padding: theme.spacing(0, 3),

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
      maxWidth: '100%',
      padding: 0,

      '&:after': {
        display: 'none',
      },

      borderBottom: `2px solid ${theme.palette.background.default}`,

      '&:last-of-type': {
        borderBottom: 'none',
      },
    },
  },

  questionBtn: {
    marginTop: theme.spacing(-0.5),
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
    cursor: 'pointer',

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

  statisticDivider: {
    backgroundColor: `${theme.palette.background.default}`,
    height: theme.spacing(8.5),
    width: theme.spacing(0.25),
  },
}));
