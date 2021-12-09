import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(0, 3),
    display: 'flex',
    justifyContent: 'space-around',

    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  },
  block: {
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
}));
