import { makeStyles } from 'tss-react/mui';

export const useMainNavigationStyles = makeStyles<boolean>()(
  (theme, isMobileSideBar) => ({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    main: {
      height: isMobileSideBar ? 'auto' : '100%',
      display: isMobileSideBar ? 'block' : 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    tip: {
      fontSize: isMobileSideBar ? 14 : 12,
      fontWeight: 700,
      color: theme.palette.grey[500],
      margin: theme.spacing(3),
      display: 'block',
    },
    skeleton: {
      height: theme.spacing(6),
      borderRadius: theme.spacing(1.5),
      margin: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
    },
    setting: {
      width: '100%',
      borderTop: isMobileSideBar
        ? `1px solid ${theme.palette.grey[100]}`
        : 'none',
      marginTop: isMobileSideBar ? theme.spacing(3) : 0,
      paddingTop: isMobileSideBar ? theme.spacing(3) : 0,
    },
    logout: {
      width: '100%',
      '&& a': {
        color: theme.palette.text.secondary,
        background: 'transparent',
        fontWeight: 400,

        '&:hover ': {
          cursor: 'pointer',

          '& svg': {
            color: theme.palette.text.secondary,
          },
        },
      },
    },
  }),
);
