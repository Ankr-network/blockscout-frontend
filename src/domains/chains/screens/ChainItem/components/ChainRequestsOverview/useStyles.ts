import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: 18,
    height: 420,
    padding: theme.spacing(3),
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(0, 4),
  },
}));
