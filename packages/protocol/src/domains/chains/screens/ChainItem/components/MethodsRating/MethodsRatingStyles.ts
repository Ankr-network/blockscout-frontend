import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  requestsRatingRoot: {
    padding: theme.spacing(2.75, 3.75, 3.125, 3.125),

    borderRadius: theme.spacing(3),

    background: theme.palette.background.paper,
  },
}));
