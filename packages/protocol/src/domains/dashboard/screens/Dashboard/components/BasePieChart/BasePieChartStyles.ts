import { makeStyles } from 'tss-react/mui';

export const useBasePieChartStyles = makeStyles()(theme => ({
  root: {
    overflow: 'hidden',

    display: 'flex',
    flexDirection: 'column',

    padding: theme.spacing(5, 2, 5, 5),
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
      height: 20,
      backgroundColor: theme.palette.background.paper,
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    [theme.breakpoints.down('xl')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  chart: {
    width: 100,
    height: 100,

    [theme.breakpoints.up('xl')]: {
      width: 120,
      height: 120,
    },
  },
}));
