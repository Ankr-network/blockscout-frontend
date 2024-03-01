import { makeStyles } from 'tss-react/mui';

export const SIDEBAR_WIDTH = 220;

const MOBILE_HEADER_HEIGHT = 130;

export const useStyles = makeStyles<boolean>()((theme, isMobileSideBar) => ({
  root: {
    position: isMobileSideBar ? 'relative' : 'fixed',
    zIndex: 3,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(10),

    width: isMobileSideBar ? '100%' : SIDEBAR_WIDTH,
    height: isMobileSideBar ? `calc(100% - ${MOBILE_HEADER_HEIGHT}px)` : '100%',
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
    borderRadius: 16,
    border: `1px solid ${theme.palette.grey[100]}`,
    padding: theme.spacing(4, 5),

    width: 312,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));
