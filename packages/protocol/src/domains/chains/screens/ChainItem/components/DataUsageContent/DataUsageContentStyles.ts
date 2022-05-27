import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  chainRequestsOverview: {
    marginTop: theme.spacing(3.25),
    marginBottom: theme.spacing(3.5),
  },

  error: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));
