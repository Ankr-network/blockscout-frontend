import { makeStyles, Theme } from '@material-ui/core';

export const useTableStyles = makeStyles<Theme>(
  () => ({
    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    btnSkeleton: {
      borderRadius: 12,
    },
  }),
  { index: 1 },
);
