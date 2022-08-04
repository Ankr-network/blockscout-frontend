import { makeStyles, Theme } from '@material-ui/core';

export const useTableStyles = makeStyles<Theme>(
  theme => ({
    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    btnSkeleton: {
      borderRadius: 12,
    },

    expandLogo: {
      marginTop: theme.spacing(1),
    },
  }),
  { index: 1 },
);
