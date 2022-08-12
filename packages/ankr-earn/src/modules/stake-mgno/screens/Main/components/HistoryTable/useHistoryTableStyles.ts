import { makeStyles } from '@material-ui/core';

export const useHistoryTableStyles = makeStyles(
  theme => ({
    root: {},

    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    btnSkeleton: {
      borderRadius: 12,
    },

    simpleText: {
      fontSize: 14,
      fontWeight: 400,
    },

    chip: {
      backgroundColor: 'rgba(53, 109, 243, 0.1)',
      color: '#356DF3',
      borderRadius: '8px',
    },

    btn: {
      height: 50,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      margin: theme.spacing(0, 0, 0, 1.5),

      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(0.5, 0, 0.5, 0.5),
      },
    },

    txLink: {
      padding: 0,
      height: 'auto',
      width: 'auto',
      minWidth: 0,

      color: theme.palette.primary.main,
      fontWeight: 500,

      transition: '0.2s all',

      '&:hover': {
        background: 'none',
        color: theme.palette.text.secondary,
      },
    },
  }),
  { index: 1 },
);
