import { makeStyles, Theme } from '@material-ui/core';

export const useTableStyles = makeStyles<Theme>(
  theme => ({
    root: {},

    tableHead: {
      border: 'none',
      background: theme.palette.background.paper,
      borderRadius: 12,
    },

    th: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },

      '&:first-child': {
        [theme.breakpoints.up('sm')]: {
          paddingLeft: theme.spacing(3),
        },
      },

      '&:last-child': {
        [theme.breakpoints.up('sm')]: {
          paddingRight: theme.spacing(3),
        },
      },
    },

    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    td: {
      color: theme.palette.text.secondary,

      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        border: 'none',
        fontSize: 16,
      },
    },

    outValue: {
      fontWeight: 700,
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
      borderRadius: 60,
    },
  }),
  { index: 1 },
);
