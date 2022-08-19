import { lighten, makeStyles } from '@material-ui/core';

export const usePortfolioChartLegendStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },

  title: {
    color: theme.palette.text.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },

  amount: {
    color: theme.palette.text.primary,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },

  wrapper: {
    borderBottom: `1px solid ${lighten(theme.palette.text.secondary, 0.5)}`,

    display: 'flex',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    whiteSpace: 'nowrap',
  },

  apr: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    lineHeight: '14px',
    paddingRight: theme.spacing(1),
    borderRight: `1px solid ${lighten(theme.palette.text.secondary, 0.5)}`,

    '& b': {
      color: theme.palette.primary.main,
    },
  },

  yield: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    lineHeight: '14px',
    paddingLeft: theme.spacing(1),

    '& b': {
      color: theme.palette.primary.main,
    },
  },

  legends: {
    marginLeft: 'auto',
    marginTop: 0,
    maxWidth: 350,

    [theme.breakpoints.down('lg')]: {
      marginLeft: 0,
      marginTop: theme.spacing(3),
      maxWidth: '100%',
    },
  },

  items: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },

  legendItem: {
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(1.25),
    width: '100%',

    borderRadius: theme.spacing(1),
    cursor: 'pointer',
    transition: 'all 200ms',
  },

  legendItemHover: {
    backgroundColor: theme.palette.background.default,
  },

  legendItemTitle: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 14,
    fontWeight: 'bold',

    '& small': {
      color: theme.palette.text.secondary,
    },
  },

  legendItemSubtitle: {
    color: theme.palette.text.secondary,
    fontSize: 13,
  },

  icon: {
    margin: theme.spacing(0, 1),
    height: 26,
    width: 28,
  },

  color: {
    backgroundColor: theme.palette.text.secondary,
    borderRadius: '50%',

    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: 10,
    width: 10,
  },
}));
