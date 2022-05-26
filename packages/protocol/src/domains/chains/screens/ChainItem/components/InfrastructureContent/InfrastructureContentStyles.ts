import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  table: {
    marginTop: theme.spacing(3.5),
  },
}));
