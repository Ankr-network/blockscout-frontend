import { makeStyles, Theme } from '@material-ui/core';

export const useContainerStyles = makeStyles<Theme, { maxWidth?: string }>(
  theme => ({
    root: {
      width: '100%',
      maxWidth: ({ maxWidth }) =>
        maxWidth ? maxWidth : 1160 + theme.spacing(5 * 2),

      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      boxSizing: 'border-box',

      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
      },
    },
  }),
);
