import { makeStyles } from '@material-ui/core';

export const useActiveStakingTableStyles = makeStyles(
  theme => ({
    root: {},

    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    btnSkeleton: {
      borderRadius: 12,
    },

    lockPeriodDescription: {
      fontSize: 14,
      color: theme.palette.text.secondary,
      marginTop: theme.spacing(1),
    },

    unlockedText: {
      fontSize: 14,
      color: theme.palette.primary.main,
    },
  }),
  { index: 1 },
);
