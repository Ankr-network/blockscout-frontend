import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme, boolean>(theme => ({
  root: isSelected => ({
    margin: '0 15px',

    color: theme.palette.primary.main,

    cursor: 'pointer',
    letterSpacing: '0.01em',

    fontWeight: 600,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,

    [theme.breakpoints.down('xs')]: {
      margin: '0 6px',
      fontSize: 12,
    },
    ...(isSelected
      ? {
          margin: '0 6px',
          padding: '3px 9px',

          borderRadius: 6,

          backgroundColor: theme.palette.primary.main,

          color: '#ffffff',

          fontWeight: 700,

          [theme.breakpoints.down('xs')]: {
            margin: 0,
            padding: '0 6px',

            fontSize: theme.spacing(1.5),
          },
        }
      : {}),
  }),
}));
