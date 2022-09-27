import { makeStyles } from '@material-ui/core';

export const useReferralsTableStyles = makeStyles(
  () => ({
    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    btnSkeleton: {
      borderRadius: 12,
    },

    simpleText: {
      fontSize: 14,
      fontWeight: 400,
    },

    icon: {
      width: 32,
      height: 32,
    },
  }),
  { index: 1 },
);
