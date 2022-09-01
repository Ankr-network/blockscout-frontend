import { makeStyles, Theme } from '@material-ui/core';
import { ReactText } from 'react';

const DESKOP_SPACING_X = 5;

export const useContainerStyles = makeStyles<Theme, { maxWidth?: ReactText }>(
  theme => ({
    root: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      boxSizing: 'border-box',

      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(DESKOP_SPACING_X),
        paddingRight: theme.spacing(DESKOP_SPACING_X),
      },
    },

    sizeLg: {
      maxWidth: 1160 + theme.spacing(DESKOP_SPACING_X * 2),
    },

    sizeXl: {
      maxWidth: 1340 + theme.spacing(DESKOP_SPACING_X * 2),
    },

    sizeCustom: {
      maxWidth: ({ maxWidth }) => maxWidth,
    },
  }),
);
