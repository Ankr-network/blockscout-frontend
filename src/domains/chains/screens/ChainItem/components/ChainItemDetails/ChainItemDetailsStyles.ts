import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {},
  block: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3.5),
    },
  },
}));
