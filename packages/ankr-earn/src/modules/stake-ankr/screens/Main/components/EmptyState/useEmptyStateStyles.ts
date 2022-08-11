import { darken, makeStyles } from '@material-ui/core';

export const useEmptyStateStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: theme.spacing(4),
  },

  button: {
    width: '180px',
  },

  statisticWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: theme.spacing(0.5, 2),

    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      padding: theme.spacing(3, 0),
    },
  },

  statistic: {
    minHeight: theme.spacing(8.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
      flexFlow: 'row wrap',
      padding: theme.spacing(1, 0),
      borderBottom: `2px solid ${theme.palette.background.default}`,
      margin: 0,
    },

    [theme.breakpoints.up('lg')]: {
      maxWidth: '50%',
      flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      padding: theme.spacing(0, 3),
      borderBottom: 'none',
      borderRight: `2px solid ${theme.palette.background.default}`,
    },

    '&:last-of-type': {
      border: 'none',
    },
  },

  wrapper: {
    marginTop: theme.spacing(1),
  },

  desc: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {},
  },

  desciptionItem: {
    fontSize: 14,
    marginLeft: theme.spacing(1),
    textAlign: 'center',
  },

  bigLogo: {
    width: 159,
  },

  chip: {
    marginTop: theme.spacing(0.5),
    background: darken(theme.palette.background.default, 0.04),
    color: theme.palette.primary.main,
    borderRadius: 8,
  },
}));
