import { makeStyles } from 'tss-react/mui';

export const useThemeSwitcherStyles = makeStyles<boolean>()(
  (theme, isMobileSideBar) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      border: isMobileSideBar ? `2px solid ${theme.palette.grey[100]}` : 'none',
      borderWidth: isMobileSideBar ? 2 : 0,
      [`& svg`]: {
        color: theme.palette.grey[600],
      },
    },
  }),
);
