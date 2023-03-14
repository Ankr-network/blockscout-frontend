import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useChainCardStyles = makeStyles<void, 'button' | 'information'>()(
  (theme, _params, classes) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 30,
      padding: theme.spacing(5),
      minHeight: 208,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        [`& .${classes.button}`]: {
          opacity: 1,
        },

        [`& .${classes.information}`]: {
          bottom: 104,
        },
      },
    },
    maininfo: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    title: {
      color: theme.palette.text.primary,
      display: 'block',
      fontSize: 20,
      lineHeight: '28px',
      fontWeight: 700,
      marginBottom: theme.spacing(1),
    },
    subtitle: {
      color: theme.palette.grey[isLightTheme(theme) ? 800 : 500],
      display: 'block',
      fontSize: 14,
      lineHeight: '20.02px',
      fontWeight: 400,
      marginBottom: theme.spacing(1.5),
    },
    icon: {
      width: 80,
      height: 80,
    },
    information: {
      color: theme.palette.grey[isLightTheme(theme) ? 800 : 500],
      display: 'inline-block',
      fontSize: 14,
      lineHeight: '20.02px',
      fontWeight: 400,
      position: 'absolute',
      width: 200,
      bottom: theme.spacing(5),
      transition: 'bottom 0.5s ease 0s',
      '& button': {
        boxShadow: 'none !important',
      },

      [theme.breakpoints.down('md')]: {
        bottom: 104,
      },
    },
    timeSwitcher: {
      '&&': {
        fontSize: 12,
        border: `2px solid ${theme.palette.background.default}`,
      },
    },
    skeleton: {
      width: '100%',
      maxWidth: 140,
      marginTop: theme.spacing(2 * 0.5),
      height: 21,
      transform: 'none',
    },
    button: {
      opacity: 0,
      transition: 'opacity 0.5s ease 0s',

      [theme.breakpoints.down('md')]: {
        opacity: 1,
      },
    },
  }),
);
