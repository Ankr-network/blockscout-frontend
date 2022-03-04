import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(3.5, 4),
    textAlign: 'left',
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,
  },
  top: {
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
  },
  description: {
    fontWeight: 400,
    color: theme.palette.grey['500'],
  },
}));
