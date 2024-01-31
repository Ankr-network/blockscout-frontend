import { makeStyles } from 'tss-react/mui';

import { tooltipBoxShadow } from 'uiKit/Theme/themeUtils';

export const useTextTooltipStyles = makeStyles()(theme => ({
  tooltip: {
    padding: theme.spacing(1.5, 3),

    borderRadius: 12,

    backgroundColor: theme.palette.grey[900],

    boxShadow: tooltipBoxShadow,
  },
  tooltipPlacementTop: {
    '&&&': {
      marginBottom: theme.spacing(2),
    },
  },
  tooltipPlacementBottom: {
    '&&&': {
      marginTop: theme.spacing(2),
    },
  },
  tooltipPlacementLeft: {
    '&&&': {
      marginRight: theme.spacing(2),
    },
  },
  tooltipPlacementRight: {
    '&&&': {
      marginLeft: theme.spacing(2),
    },
  },
}));
