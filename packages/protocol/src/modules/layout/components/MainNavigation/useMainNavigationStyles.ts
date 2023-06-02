import { makeStyles } from 'tss-react/mui';

export const useMainNavigationStyles = makeStyles<boolean>()(
  (theme, isMobile) => ({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    tip: {
      fontSize: isMobile ? 14 : 12,
      fontWeight: 700,
      color: theme.palette.grey[500],
      margin: theme.spacing(3),
      display: 'block',
    },
    setting: {
      position: isMobile ? 'relative' : 'absolute',
      bottom: 0,
      width: '100%',
      borderTop: isMobile ? `1px solid ${theme.palette.grey[100]}` : 'none',
      marginTop: isMobile ? theme.spacing(3) : 0,
      paddingTop: isMobile ? theme.spacing(3) : 0,
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
