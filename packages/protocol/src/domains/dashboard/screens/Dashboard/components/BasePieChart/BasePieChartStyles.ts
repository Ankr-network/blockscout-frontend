import { makeStyles } from 'tss-react/mui';

export const useBasePieChartStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(6),
    borderRadius: 30,

    /* TODO: reuse this styles in other scrollable widgets */
    backgroundImage: 'none',
    paddingBottom: 0,
    position: 'relative',

    '&:after': {
      content: '""',
      display: 'block',
      position: 'sticky',
      left: 0,
      bottom: -1,
      width: '100%',
      height: 24,
      backgroundColor: theme.palette.background.paper,
    },

    [theme.breakpoints.down('xl')]: {
      minHeight: 190,
    },
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),

    [theme.breakpoints.down('xl')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  chart: {
    width: 100,
    height: 100,
  },
}));
