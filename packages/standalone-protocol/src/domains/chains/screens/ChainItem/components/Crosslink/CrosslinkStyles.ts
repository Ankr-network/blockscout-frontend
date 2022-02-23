import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    borderRadius: 12,
    padding: theme.spacing(1.25, 4),
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    maxWidth: 220,
    position: 'absolute',
    top: 20,
    right: 20,
  },
}));
