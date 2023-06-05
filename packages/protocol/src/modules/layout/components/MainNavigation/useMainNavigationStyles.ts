import { makeStyles } from 'tss-react/mui';

export const useMainNavigationStyles = makeStyles<boolean>()(
  (theme, isMobileSiderBar) => ({
    root: {
      height: '100%',
      display: 'flex',
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
    setting: {
      position: isMobileSiderBar ? 'relative' : 'absolute',
      bottom: 0,
      width: '100%',
      borderTop: isMobileSiderBar
        ? `1px solid ${theme.palette.grey[100]}`
        : 'none',
      marginTop: isMobileSiderBar ? theme.spacing(3) : 0,
      paddingTop: isMobileSiderBar ? theme.spacing(3) : 0,
      paddingRight: isMobileSiderBar ? 0 : theme.spacing(8),
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
