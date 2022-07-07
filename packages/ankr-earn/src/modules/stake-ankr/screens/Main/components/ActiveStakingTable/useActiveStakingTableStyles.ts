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

    cell: {
      borderBottom: `1px solid ${theme.palette.background.default}`,

      [theme.breakpoints.up('md')]: {
        border: 'none',
      },
    },

    expandedCell: {
      margin: theme.spacing(0, 0, 1, 0),
      borderBottom: `1px solid ${theme.palette.background.default}`,

      [theme.breakpoints.up('md')]: {
        border: 'none',

        '&:first-child': {
          borderRadius: '0 0 0 18px',
        },

        '&:last-child': {
          borderRadius: '0 0 18px 0',
        },
      },
    },

    table: {
      backgroundColor: 'inherit',
      padding: 0,

      [theme.breakpoints.up('md')]: {
        backgroundColor: 'inherit',
      },
    },

    row: {
      margin: theme.spacing(2, 0, 2),
      padding: theme.spacing(2),
      borderRadius: 18,
      backgroundColor: theme.palette.common.white,

      [theme.breakpoints.up('md')]: {
        margin: 0,
        padding: 0,
        border: 'none',
        backgroundColor: 'inherit',
      },
    },

    expandedRow: {
      margin: theme.spacing(2, 0, 2),
      padding: theme.spacing(2),

      [theme.breakpoints.up('md')]: {
        borderBottom: `1px solid ${theme.palette.background.default}`,

        '&:first-of-type': {
          borderTop: `1px solid ${theme.palette.background.default}`,
        },

        '&:last-of-type': {
          borderBottom: 'none',
        },

        margin: 0,
        padding: 0,
        backgroundColor: 'inherit',
      },
    },
  }),
  { index: 1 },
);
