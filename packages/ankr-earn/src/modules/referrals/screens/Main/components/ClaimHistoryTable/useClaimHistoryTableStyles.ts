import { makeStyles } from '@material-ui/core';

export const useClaimHistoryTableStyles = makeStyles(
  () => ({
    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    simpleText: {
      fontSize: 14,
      fontWeight: 400,
    },

    amount: {
      alignItems: 'flex-end',
    },
  }),
  { index: 1 },
);
