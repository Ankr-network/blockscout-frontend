import { makeStyles, Theme } from '@material-ui/core';

const SCROLLBAR_SIZE = 12;

export const useTooltipStyles = makeStyles<Theme, { maxHeight?: number }>(
  theme => ({
    lightTooltip: {
      backgroundColor: theme.palette.background.paper,
      fontSize: 13,
      boxShadow: '0px 2px 10px rgba(154, 161, 176, 0.3)',
      borderRadius: 12,
      border: 'none',
    },

    lightArrow: {
      color: theme.palette.background.paper,

      '&:before': {
        boxShadow: '0px 0px 2px rgba(154, 161, 176, 0.3)',
      },
    },

    withScroll: {
      maxHeight: ({ maxHeight }) => maxHeight ?? '',
      overflowY: 'auto',

      '&::-webkit-scrollbar': {
        width: `${SCROLLBAR_SIZE}px`,
        height: `${SCROLLBAR_SIZE}px`,
      },

      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.background.default,
        borderRadius: `${SCROLLBAR_SIZE}px`,
        border: `3px solid ${theme.palette.background.paper}`,
      },
    },
  }),
  { index: 1 },
);
