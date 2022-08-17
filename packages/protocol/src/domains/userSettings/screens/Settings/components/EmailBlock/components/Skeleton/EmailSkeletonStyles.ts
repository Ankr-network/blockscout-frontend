import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  email: {
    width: theme.spacing(52),

    fontSize: 34,

    [theme.breakpoints.down('md')]: {
      fontSize: 30,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
}));
