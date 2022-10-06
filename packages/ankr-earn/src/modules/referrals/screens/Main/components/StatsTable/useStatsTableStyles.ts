import { makeStyles } from '@material-ui/core';

export const useStatsTableStyles = makeStyles(
  theme => ({
    root: {},

    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    btn: {
      height: 44,
      width: 130,
    },

    row: {
      margin: theme.spacing(2, 0, 2),
      padding: theme.spacing(2),
      borderRadius: 18,
      backgroundColor: theme.palette.common.white,

      [theme.breakpoints.up('md')]: {
        margin: 0,
        padding: 0,
        border: 'none',
        backgroundColor: 'inherit',
      },
    },

    cell: {
      borderBottom: `1px solid ${theme.palette.background.default}`,

      [theme.breakpoints.up('md')]: {
        border: 'none',
      },
    },

    unlockWrapper: {
      display: 'flex',
      alignItems: 'center',
    },

    unlockValue: {
      fontWeight: 600,
      fontSize: 13,
      marginLeft: theme.spacing(0.5),
    },
  }),
  { index: 1 },
);
