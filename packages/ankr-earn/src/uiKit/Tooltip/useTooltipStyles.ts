import { makeStyles, Theme } from '@material-ui/core';

const SCROLLBAR_SIZE = 12;

export const useTooltipStyles = makeStyles<Theme, { maxHeight?: number }>(
  theme => ({
    tooltip: {
      backgroundColor: theme.palette.background.paper,
      fontSize: 13,
      borderRadius: 12,
    },

    arrow: {
      color: theme.palette.background.paper,
    },

    lightTooltip: {
      boxShadow: '0px 2px 10px rgba(154, 161, 176, 0.3)',
      border: 'none',
    },

    lightArrow: {
      '&:before': {
        boxShadow: '0px 0px 2px rgba(154, 161, 176, 0.3)',
      },
    },

    outlinedTooltip: {
      border: '1px solid #E2E8F3',
    },

    outlinedArrow: {
      '&:before': {
        border: '1px solid #E2E8F3',
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
