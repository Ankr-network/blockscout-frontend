import { makeStyles } from '@material-ui/core';

export const useReferralsTableStyles = makeStyles(
  theme => ({
    table: {
      backgroundColor: 'inherit',
      padding: 0,
    },

    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    row: {
      margin: theme.spacing(2, 0, 2),
      padding: theme.spacing(2, 2, 0),
      borderRadius: 18,
      backgroundColor: theme.palette.common.white,

      [theme.breakpoints.up('md')]: {
        margin: 0,
        padding: 0,
        border: 'none',
        backgroundColor: 'inherit',
      },
    },

    cell: {
      borderBottom: `1px solid ${theme.palette.background.default}`,

      [theme.breakpoints.up('md')]: {
        border: 'none',
      },
    },

    simpleText: {
      fontSize: 14,
      fontWeight: 400,
    },

    icon: {
      width: 32,
      height: 32,
    },

    amount: {
      alignItems: 'flex-end',

      [theme.breakpoints.up('md')]: {
        alignItems: 'inherit',
      },
    },
  }),
  { index: 1 },
);
