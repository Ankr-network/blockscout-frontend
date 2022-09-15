import { makeStyles } from '@material-ui/core';

export const useNoAssetsStyles = makeStyles(theme => ({
  button: {
    width: 160,
    height: theme.spacing(5),
    borderRadius: theme.spacing(2),
  },
}));
