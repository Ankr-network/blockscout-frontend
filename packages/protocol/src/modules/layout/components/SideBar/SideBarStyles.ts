import { makeStyles } from 'tss-react/mui';

import { SHOULD_SHOW_HEADER_BANNER } from 'modules/layout/const';

export const SIDEBAR_WIDTH = 220;

const MOBILE_HEADER_HEIGHT = 130;

interface ISideBarStylesProps {
  bannerHeight: number;
  isMobileSideBar: boolean;
}

export const useStyles = makeStyles<ISideBarStylesProps>()(
  (theme, { bannerHeight, isMobileSideBar }) => ({
    root: {
      position: isMobileSideBar ? 'relative' : 'fixed',
      zIndex: 3,

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(10),
      top:
        !isMobileSideBar && SHOULD_SHOW_HEADER_BANNER ? `${bannerHeight}px` : 0,

      width: isMobileSideBar ? '100%' : SIDEBAR_WIDTH,
      height: isMobileSideBar
        ? `calc(100% - ${MOBILE_HEADER_HEIGHT}px)`
        : `calc(100vh - ${
            SHOULD_SHOW_HEADER_BANNER ? `${bannerHeight}px` : '0px'
          })`,
      padding: isMobileSideBar
        ? theme.spacing(8, 4, 0, 4)
        : theme.spacing(8, 4, 4, 4),

      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    accountStatus: {
      width: 'auto',
    },
    balanceRoot: {
      display: 'none',

      borderRadius: 16,
      border: `1px solid ${theme.palette.grey[100]}`,
      padding: theme.spacing(4, 5),

      width: 312,

      [theme.breakpoints.down('md')]: {
        display: 'block',
      },

      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  }),
);
