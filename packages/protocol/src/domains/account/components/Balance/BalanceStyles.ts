import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  tooltip: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));
