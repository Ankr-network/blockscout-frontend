import { makeStyles } from 'tss-react/mui';
import {
  MAX_TWO_COLUMN_WIDTH,
  NARROW_NOTICE_MARGIN,
  NARROW_TWO_COLUMN_WIDTH,
  NOTICE_MARGIN,
  NOTICE_WIDTH,
  ONE_ROW_SCREEN_WIDTH,
} from '../../const';

export const useHeaderStyles = makeStyles()(theme => ({
  information: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: `calc(100% - ${NOTICE_WIDTH + NOTICE_MARGIN}px)`,
    [theme.breakpoints.down(NARROW_TWO_COLUMN_WIDTH)]: {
      width: `calc(100% - ${NOTICE_WIDTH + NARROW_NOTICE_MARGIN}px)`,

      flexDirection: 'column',
      gap: theme.spacing(3.5),
    },
    [theme.breakpoints.down(MAX_TWO_COLUMN_WIDTH)]: {
      width: '100%',
    },
  },
  title: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
  },
  infotitle: {
    display: 'flex',
    gap: theme.spacing(10),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down(NARROW_TWO_COLUMN_WIDTH)]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down(ONE_ROW_SCREEN_WIDTH)]: {
      flexDirection: 'column',
      gap: theme.spacing(4),
    },
  },
  text: {
    color: theme.palette.grey[600],
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 400,
    marginLeft: theme.spacing(3),
  },
  info: {
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 700,
    color: theme.palette.grey[900],
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down(NARROW_TWO_COLUMN_WIDTH)]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },
}));
