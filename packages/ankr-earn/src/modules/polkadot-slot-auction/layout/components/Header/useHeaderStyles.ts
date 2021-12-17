import { Theme } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  component: {
    position: 'relative',
    height: theme.spacing(10),
    boxSizing: 'border-box',
    borderBottom: `1px solid ${alpha(theme.palette.grey[100], 0.1)}`,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',

    '&&': {
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1460,
        padding: theme.spacing(0, 5),
      },
    },
  },
  leftContent: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: theme.spacing(0, 3, 0),
  },
}));
