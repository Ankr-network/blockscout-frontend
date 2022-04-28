import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  cellBold: {
    fontWeight: 600,
  },

  cellTopUp: {
    color: theme.palette.success.main,
  },
}));
