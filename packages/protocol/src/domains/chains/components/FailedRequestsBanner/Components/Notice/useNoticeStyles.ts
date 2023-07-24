import { makeStyles } from 'tss-react/mui';

import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

import {
  CHART_HEIGHT,
  LG_CHART_HEIGHT,
  NOTICE_WIDTH,
} from '../../../RequestsChart/const';

export const useNoticeStyles = makeStyles<boolean>()(
  (theme, usePrimaryBorderColor) => ({
    notice: {
      width: NOTICE_WIDTH,
      background: usePrimaryBorderColor
        ? theme.palette.primary.main
        : getPremiumColorGradient(theme),
      borderRadius: theme.spacing(5),
      padding: 2,
      position: 'absolute',
      right: 0,
      height: `${CHART_HEIGHT + 50}px`,
      top: -50,

      [theme.breakpoints.down('xl')]: {
        height: LG_CHART_HEIGHT,

        top: 0,
      },

      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(6),
        position: 'relative',
        width: '100%',
        height: 'auto',
      },
    },
    noticeContent: {
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
      fontSize: 16,
      lineHeight: '20.2px',

      '& em': {
        fontStyle: 'normal',
        color: theme.palette.primary.main,
      },
    },
    button: {
      marginTop: theme.spacing(4),
    },
  }),
);
