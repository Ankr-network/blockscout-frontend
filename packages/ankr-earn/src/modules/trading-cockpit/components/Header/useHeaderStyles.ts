import { makeStyles, Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  paper: {
    padding: theme.spacing(3),
  },
}));
