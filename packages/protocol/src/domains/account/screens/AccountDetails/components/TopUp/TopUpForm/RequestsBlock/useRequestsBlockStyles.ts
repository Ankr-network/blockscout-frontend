import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useRequestsBlockStyles = makeStyles<Theme>(theme => ({
  pricing: {
    fontWeight: 700,
    marginBottom: -10,
    marginTop: theme.spacing(9.5),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    '& span': {
      alignItems: 'center',
      display: 'inline-flex',
    },
  },
  skeleton: {
    height: 32,
    marginTop: -7,
    width: '60%',
    margin: 'auto',
    borderRadius: theme.spacing(1),
  },
}));
