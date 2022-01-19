import { makeStyles, Theme } from '@material-ui/core';

export const useNoAssetsStyles = makeStyles<Theme>(theme => ({
  button: {
    height: theme.spacing(5),
    borderRadius: theme.spacing(2),
  },
}));
