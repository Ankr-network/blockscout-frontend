import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(2.5, 2.5, 2),
    textAlign: 'center',
    flex: 1,
  },
  top: {
    marginBottom: theme.spacing(1),

    '& span': {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  bottom: {
    '& span': {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  value: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  skeleton: {
    width: '60%',
    height: 35,
    margin: 'auto',

    [theme.breakpoints.down('sm')]: {
      height: 23.3,
    },
  },
}));
