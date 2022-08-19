import { makeStyles } from '@material-ui/core';

export const usePortfolioChartStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(7),
    padding: theme.spacing(7, 5),

    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(3.5),
    },

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
    fontSize: 24,
    fontWeight: 'bold',

    [theme.breakpoints.up('md')]: {
      fontSize: 32,
    },
  },

  apr: {
    fill: theme.palette.text.secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },

  activeTooltip: {
    opacity: 1,
    padding: theme.spacing(0.5),
    border: `1px solid ${theme.palette.text.primary}`,
  },

  chartWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
