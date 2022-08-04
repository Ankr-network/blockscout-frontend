import { makeStyles } from '@material-ui/core';

export const usePortfolioChartStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(7),
    padding: theme.spacing(7),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(4),
    },
  },

  title: {
    marginBottom: theme.spacing(3),
  },

  chartText: {
    fill: theme.palette.text.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  total: {
    fill: theme.palette.text.primary,
    fontSize: 36,
    fontWeight: 'bold',
  },

  apr: {
    fill: theme.palette.text.secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },

  tooltip: {
    opacity: 0,
    position: 'absolute',
    textAlign: 'center',
    padding: 0,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    border: 'none',
    borderRadius: theme.spacing(1),
    pointerEvents: 'none',
    fontSize: '1rem',
  },

  activeTooltip: {
    opacity: 1,
    padding: theme.spacing(0.5),
    border: `1px solid ${theme.palette.text.primary}`,
  },
}));
