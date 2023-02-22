import { makeStyles } from 'tss-react/mui';
import { premiumColor } from 'uiKit/Theme/themeUtils';
import {
  COMMON_HEIGHT,
  MARGIN_TOP,
  MAX_TWO_COLUMN_WIDTH,
  NOTICE_WIDTH,
  ONE_ROW_SCREEN_WIDTH,
} from '../../const';

export const useNoticeStyles = makeStyles()(theme => ({
  notice: {
    width: NOTICE_WIDTH,
    height: COMMON_HEIGHT + MARGIN_TOP,
    background: premiumColor,
    borderRadius: theme.spacing(5),
    padding: 2,
    position: 'absolute',
    right: 0,
    top: -MARGIN_TOP,
    [theme.breakpoints.down(MAX_TWO_COLUMN_WIDTH)]: {
      height: COMMON_HEIGHT,
      top: 0,
    },
    [theme.breakpoints.down(ONE_ROW_SCREEN_WIDTH)]: {
      marginTop: theme.spacing(6),
      position: 'relative',
      width: '100%',
      height: 'auto',
    },
  },
  noticeContent: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600,
    color: theme.palette.grey[900],
    width: '100%',
    height: '100%',
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(7.5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down(MAX_TWO_COLUMN_WIDTH)]: {
      padding: theme.spacing(5),
      fontSize: 14,
      lineHeight: '20.2px',
    },

    '& em': {
      fontStyle: 'normal',
      color: theme.palette.primary.main,
    },
  },
  button: {
    marginTop: theme.spacing(4),
  },
}));
