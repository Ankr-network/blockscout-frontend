import { makeStyles } from 'tss-react/mui';
import {
  NOTICE_WIDTH,
  NOTICE_MARGIN,
  CHART_HEIGHT,
  LG_CHART_HEIGHT,
} from '../RequestsChart';

export const useFailedRequestsBannerStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(7.5),
    borderRadius: 30,
    marginBottom: theme.spacing(10),
    minHeight: theme.spacing(65),

    [theme.breakpoints.down('xl')]: {
      padding: theme.spacing(5),
    },

    [theme.breakpoints.down('sm')]: {
      minHeight: theme.spacing(117.5),
    },
  },
  container: {
    position: 'relative',
  },
  containerWithNotice: {
    paddingRight: NOTICE_WIDTH + NOTICE_MARGIN,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    },
  },
  chart: {
    height: CHART_HEIGHT,

    [theme.breakpoints.down('xl')]: {
      height: LG_CHART_HEIGHT,
    },
  },
  skeleton: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing(7.5),
    marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(7.5),
    minHeight: theme.spacing(65),

    [theme.breakpoints.down('xl')]: {
      padding: theme.spacing(5),
    },

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      minHeight: theme.spacing(117.5),
    },
  },
  holder: {
    width: '100%',
  },
  rect1: {
    width: theme.spacing(75),
    height: theme.spacing(7.5),
    marginBottom: theme.spacing(6),
    borderRadius: theme.spacing(10),

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  rect2: {
    width: theme.spacing(43),
    height: theme.spacing(3.5),
    borderRadius: theme.spacing(5),

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  rect: {
    width: theme.spacing(75),
    height: theme.spacing(49),
    borderRadius: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: theme.spacing(5),
    },
  },
}));
