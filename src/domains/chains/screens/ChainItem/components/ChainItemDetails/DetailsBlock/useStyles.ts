import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(2.5, 2.5, 2),
    textAlign: 'center',
    flexGrow: 1,
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
  },

  dot: {
    position: 'relative',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 6,
      height: 6,
      borderRadius: '50%',
      left: -10,
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
