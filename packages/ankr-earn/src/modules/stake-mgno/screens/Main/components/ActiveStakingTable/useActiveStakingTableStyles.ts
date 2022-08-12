import { alpha, makeStyles } from '@material-ui/core';

export const useActiveStakingTableStyles = makeStyles(
  theme => ({
    root: {},

    btn: {
      height: 40,
      lineHeight: 40,
      width: 100,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      margin: theme.spacing(0.5, 0, 0.5, 0.5),
      backgroundColor: theme.palette.background.paper,

      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 0, 0, 1.5),
      },
    },

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
      },
    },

    table: {
      backgroundColor: 'inherit',
      padding: 0,
    },

    expandTable: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(2),
    },

    expandWrapper: {
      padding: theme.spacing(3),
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
        borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,

        '&:first-of-type': {
          borderTop: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
        },

        '&:last-of-type': {
          borderBottom: 'none',
        },

        margin: 0,
        padding: 0,
      },
    },
  }),
  { index: 1 },
);
