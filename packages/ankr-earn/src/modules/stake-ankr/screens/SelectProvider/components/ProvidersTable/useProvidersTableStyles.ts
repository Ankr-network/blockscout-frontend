import { makeStyles } from '@material-ui/core';

export const useProvidersTableStyles = makeStyles(theme => ({
  row: {},

  btn: {
    [theme.breakpoints.up('md')]: {
      opacity: 0,
      transition: 'all 0.2s',
    },

    '$row:hover &': {
      opacity: 1,
    },
  },

  cell: {
    '&:first-of-type': {
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(5.5),
      },
    },
  },

  cellProvider: {
    '&&': {
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(2),
      },
    },
  },

  skeletonBtn: {
    float: 'right',
    height: 40,
    width: '100%',
    borderRadius: 12,

    [theme.breakpoints.up('md')]: {
      width: 140,
    },
  },
}));
