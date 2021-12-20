import { makeStyles, Theme } from '@material-ui/core';

export const useFaqStyles = makeStyles<Theme>(theme => ({
  box: {
    position: 'relative',
    padding: 0,
    maxWidth: 700,
    margin: theme.spacing(0, 'auto', 4, 'auto'),
    borderRadius: 18,
    border: 'none',
  },
}));
