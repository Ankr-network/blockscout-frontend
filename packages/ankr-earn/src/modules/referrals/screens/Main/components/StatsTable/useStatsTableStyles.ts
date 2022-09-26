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
