import { makeStyles } from 'tss-react/mui';
import {
  NOTICE_WIDTH,
  NOTICE_MARGIN,
  CHART_HEIGHT,
  LG_CHART_HEIGHT,
} from './const';

export const useFailedRequestsBannerStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(7.5),
    borderRadius: 30,
    marginBottom: theme.spacing(10),

    [theme.breakpoints.down('xl')]: {
      padding: theme.spacing(5),
    },
  },
  container: {
    position: 'relative',
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
}));
