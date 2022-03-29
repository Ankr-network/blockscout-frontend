import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,
    padding: theme.spacing(4),
    '&.harmony': {
      border: `2px solid ${theme.palette.grey[300]}`,
    },
  },
  header: {
    paddingBottom: theme.spacing(3),
  },
}));
