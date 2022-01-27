import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  text: {
    fontWeight: 600,
  },
  textPublic: {
    marginBottom: theme.spacing(2),
  },
  copyToClip: {
    minWidth: 330,
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      minWidth: 'auto',
    },
  },
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(0, 2),
  },
}));
