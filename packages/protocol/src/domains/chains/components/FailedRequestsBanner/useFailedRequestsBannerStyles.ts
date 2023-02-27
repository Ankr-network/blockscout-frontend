import { makeStyles } from 'tss-react/mui';
import {
  ONE_ROW_SCREEN_WIDTH,
  NARROW_TWO_COLUMN_WIDTH,
  NOTICE_WIDTH,
  NOTICE_MARGIN,
  COMMON_HEIGHT,
  NARROW_NOTICE_MARGIN,
} from './const';

export const useFailedRequestsBannerStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(7.5),
    borderRadius: 30,
    marginBottom: theme.spacing(10),
  },
  container: {
    position: 'relative',
    paddingRight: NOTICE_WIDTH + NOTICE_MARGIN,
    [theme.breakpoints.down(NARROW_TWO_COLUMN_WIDTH)]: {
      paddingRight: NOTICE_WIDTH + NARROW_NOTICE_MARGIN,
    },
    [theme.breakpoints.down(ONE_ROW_SCREEN_WIDTH)]: {
      paddingRight: 0,
    },
  },
  chart: {
    height: COMMON_HEIGHT,
  },
}));
