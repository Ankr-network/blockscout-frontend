import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMethodCallStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(4, 3.75, 3.125, 3.125),
    borderRadius: theme.spacing(3),
    background: theme.palette.background.paper,
    marginBottom: theme.spacing(3.75),
    position: 'relative',
  },
}));
