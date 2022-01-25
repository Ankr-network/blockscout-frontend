import { Theme } from '@material-ui/core';
import { makeStyles, StyleRules } from '@material-ui/core/styles';

export const useConnectTooltipStyles = makeStyles<Theme>(
  (theme: Theme): StyleRules => ({
    root: {},

    tooltip: {
      padding: 0,
      border: 'none',
    },
  }),
);
