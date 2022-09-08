import { lighten, makeStyles } from '@material-ui/core';

export const usePortfolioChartStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
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
    color: theme.palette.text.secondary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  total: {
    fill: theme.palette.text.primary,
    fontSize: 24,
    fontWeight: 700,

    [theme.breakpoints.up('md')]: {
      fontSize: 36,
    },
  },

  apr: {
    color: theme.palette.text.secondary,
    fontSize: 13,
    fontWeight: 600,

    '& b': {
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.up('md')]: {
      fontSize: 14,
    },
  },

  activeTooltip: {
    opacity: 1,
    padding: theme.spacing(0.5),
    border: `1px solid ${theme.palette.text.primary}`,
  },

  chartContainer: {
    position: 'relative',
  },

  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: 100,
    bottom: 100,
    left: 0,
    right: 0,
    textAlign: 'center',
    maxWidth: 200,
    maxHeight: 95,

    [theme.breakpoints.up('md')]: {
      top: 130,
      bottom: 130,
      maxWidth: 260,
    },
  },

  hoverInfo: {
    alignItems: 'center',
    display: 'flex',
    borderTop: `1px solid ${lighten(theme.palette.text.secondary, 0.8)}`,
    padding: theme.spacing(1.5, 0),
    marginTop: theme.spacing(1),
    width: 174,
  },

  hoverInfoBlock: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    margin: '0 auto',

    '& $apr:first-child': {
      textAlign: 'right',
      marginRight: theme.spacing(1.25),
      width: '100%',
    },

    '& $apr:last-child': {
      textAlign: 'left',
      paddingLeft: theme.spacing(1.25),
      borderLeft: `1px solid ${lighten(theme.palette.text.secondary, 0.8)}`,
      width: '100%',
    },
  },

  chartWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  amountWrapper: {
    alignItems: 'center',
    display: 'flex',
  },

  icon: {
    marginRight: theme.spacing(0.5),
    height: 28,
    width: 28,
  },
}));
