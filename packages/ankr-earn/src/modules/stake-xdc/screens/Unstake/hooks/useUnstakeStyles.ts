import { alpha, makeStyles } from '@material-ui/core';

export const useUnstakeStyles = makeStyles(theme => ({
  liquidityPoolArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(-1.5, 0, 0, 0),
    padding: theme.spacing(1, 0, 1, 0),
    border: `1px solid ${alpha(theme.palette.text.secondary, 0.15)}`,
    borderRadius: 8,
  },
  unstakePeriodInfoArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: theme.spacing(2.75, 0, 0, 0),
    padding: theme.spacing(0, 0, 0, 1),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },

  liquidityPoolTooltip: {
    margin: theme.spacing('-1px', 0, 0, '3px'),
  },
}));
