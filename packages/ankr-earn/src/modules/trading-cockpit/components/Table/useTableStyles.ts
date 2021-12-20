import { makeStyles, Theme } from '@material-ui/core';

export const useTableStyles = makeStyles<Theme>(
  theme => ({
    root: {},

    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    platform: {
      display: 'inline-flex',

      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },

    outValue: {
      fontWeight: 700,
    },

    questionBtn: {
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
    },

    questionIcon: {
      color: 'inherit',
    },

    noPrimaryBtnScale: {
      '&:before': {
        display: 'none',
      },

      '&:hover': {
        background: theme.palette.primary.light,
      },
    },

    btnSkeleton: {
      borderRadius: 12,
    },
  }),
  { index: 1 },
);
