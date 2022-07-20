import { makeStyles } from '@material-ui/core';

export const useFiltersStyles = makeStyles(theme => ({
  root: {
    display: 'flex',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
    },

    [theme.breakpoints.down('md')]: {
      flexFlow: 'column nowrap',
    },
  },
  selectsWrapper: {
    display: 'flex',
    gap: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      flexFlow: 'column nowrap',
      gap: theme.spacing(2.2),
      marginBottom: theme.spacing(2.2),
    },
  },
  selectWrapper: {
    minWidth: '230px',
    width: 'min-content',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  tabs: {
    display: 'flex',
    flexFlow: 'row wrap',
    gap: theme.spacing(1.5),

    [theme.breakpoints.down('md')]: {
      flexFlow: 'row wrap',
    },
  },
  tab: {
    padding: '10px 14px',
    height: 'min-content',
    background: theme.palette.common.white,
    color: theme.palette.grey['500'],
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all .1s ease',
    userSelect: 'none',
    whiteSpace: 'nowrap',

    '&:hover': {
      color: theme.palette.common.white,
      background: theme.palette.primary.main,
    },
  },
  tabActive: {
    color: theme.palette.common.white,
    background: theme.palette.primary.main,
  },
}));
