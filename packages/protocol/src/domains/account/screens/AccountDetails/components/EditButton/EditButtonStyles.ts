import { makeStyles } from 'tss-react/mui';

import { BREAKING_WIDGET_BUTTON_WIDTH } from '../../const';

export const useEditButtonStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.down(BREAKING_WIDGET_BUTTON_WIDTH)]: {
      padding: theme.spacing(2),

      minWidth: 'unset',
    },
  },
  startIcon: {
    display: 'none',

    [theme.breakpoints.down(BREAKING_WIDGET_BUTTON_WIDTH)]: {
      display: 'inherit',

      '&&': {
        margin: 0,

        svg: {
          fontSize: 24,
        },
      },
    },

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  text: {
    [theme.breakpoints.down(BREAKING_WIDGET_BUTTON_WIDTH)]: {
      display: 'none',
    },

    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}));
