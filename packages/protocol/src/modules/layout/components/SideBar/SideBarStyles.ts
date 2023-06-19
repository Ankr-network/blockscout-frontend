import { makeStyles } from 'tss-react/mui';

export const SIDEBAR_WIDTH = 220;
const MOBILE_HEADER_HEIGHT = 130;

export const useStyles = makeStyles<boolean>()((theme, isMobileSiderBar) => ({
  root: {
    position: isMobileSiderBar ? 'relative' : 'fixed',

    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(10),

    width: isMobileSiderBar ? '100%' : SIDEBAR_WIDTH,
    height: isMobileSiderBar
      ? `calc(100% - ${MOBILE_HEADER_HEIGHT}px)`
      : '100%',
    padding: isMobileSiderBar
      ? theme.spacing(8, 4, 0, 4)
      : theme.spacing(8, 4, 4, 4),

    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
}));
