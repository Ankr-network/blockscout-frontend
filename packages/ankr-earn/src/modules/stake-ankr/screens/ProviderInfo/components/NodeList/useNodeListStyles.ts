import { makeStyles } from '@material-ui/core';

export const useNodeListStyles = makeStyles(
  theme => ({
    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    btnSkeleton: {
      borderRadius: 12,
    },

    simpleText: {
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: 14,
      fontWeight: 400,

      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
      },
    },

    green: {
      color: theme.palette.success.main,
    },

    red: {
      color: theme.palette.error.main,
    },
  }),
  { index: 1 },
);
