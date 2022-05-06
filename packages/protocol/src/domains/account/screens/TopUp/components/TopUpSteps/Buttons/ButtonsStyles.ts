import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(() => ({
  root: {
    display: 'flex',
    gap: 12,
  },
  button: {
    minWidth: 210,
  },
}));
