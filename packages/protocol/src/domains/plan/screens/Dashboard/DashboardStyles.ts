import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
  },
  text: {
    fontWeight: 600,
  },

  copyToClip: {
    minWidth: 330,
    width: '100%',

    [theme.breakpoints.down('lg')]: {
      minWidth: 'auto',
    },
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));
