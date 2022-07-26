import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  error: {
    color: theme.palette.error.main,
    marginLeft: theme.spacing(1.5),
    marginTop: theme.spacing(0.375),
  },
}));
