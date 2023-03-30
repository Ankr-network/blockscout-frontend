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
}));
