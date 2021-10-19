import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(2.5, 2.5, 2),
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
  },
  value: {
    marginRight: theme.spacing(1),
  },
}));
