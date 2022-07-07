import { alpha, makeStyles } from '@material-ui/core';

export const useUnstakingTableStyles = makeStyles(
  theme => ({
    root: {},

    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    btnSkeleton: {
      borderRadius: 12,
    },

    providerName: {
      fontSize: 14,
    },

    chip: {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
      borderRadius: 8,
    },

    btn: {
      height: 50,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      margin: theme.spacing(0.5, 0, 0.5, 0.5),

      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 0, 0, 1.5),
      },
    },
  }),
  { index: 1 },
);
