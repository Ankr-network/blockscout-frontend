import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,
    padding: theme.spacing(4),
  },
  header: {
    paddingBottom: theme.spacing(3),
  },
}));
