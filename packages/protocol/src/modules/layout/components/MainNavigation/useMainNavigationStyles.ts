import { makeStyles } from 'tss-react/mui';

export const useMainNavigationStyles = makeStyles<boolean>()(
  (theme, isMobileSiderBar) => ({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    main: {
      height: isMobileSiderBar ? 'auto' : '100%',
      display: isMobileSiderBar ? 'block' : 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    tip: {
      fontSize: isMobileSiderBar ? 14 : 12,
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
      borderTop: isMobileSiderBar
        ? `1px solid ${theme.palette.grey[100]}`
        : 'none',
      marginTop: isMobileSiderBar ? theme.spacing(3) : 0,
      paddingTop: isMobileSiderBar ? theme.spacing(3) : 0,
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
