import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme, boolean>(theme => ({
  root: isSelected => ({
    padding: theme.spacing(0.5, 1.5),
    borderRadius: 6,

    color: theme.palette.primary.main,

    cursor: 'pointer',
    letterSpacing: '0.01em',

    fontWeight: 500,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,

    [theme.breakpoints.down('xs')]: {
      padding: '0 6px',
      fontSize: 12,
    },
    ...(isSelected
      ? {
          backgroundColor: theme.palette.primary.main,
          color: '#ffffff',
        }
      : {}),
  }),
}));
