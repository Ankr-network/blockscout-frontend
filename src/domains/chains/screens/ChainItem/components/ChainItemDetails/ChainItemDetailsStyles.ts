import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  },
  block: {
    [theme.breakpoints.down('lg')]: {
      width: '48%',
      marginBottom: theme.spacing(3.5),
    },

    '&:not(:last-child)': {
      marginBottom: theme.spacing(3.5),
    },
  },
}));
