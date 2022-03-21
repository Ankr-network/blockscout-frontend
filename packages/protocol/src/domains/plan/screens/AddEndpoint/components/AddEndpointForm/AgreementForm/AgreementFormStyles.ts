import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3.5),
  },
  checkbox: {
    width: '60%',
  },
  agreementText: {
    '&': {
      display: 'inline-flex',
      paddingLeft: theme.spacing(1),
      lineHeight: 1.5,
    },
  },
  buttonWrapper: {
    width: '40%',
    textAlign: 'right',
  },
  button: {
    maxWidth: 295,
  },
}));
