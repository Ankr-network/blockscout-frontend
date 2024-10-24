import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useNotificationsStyles = makeStyles({ name: 'Notifications' })(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto',
      gap: theme.spacing(2),
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(3),
      width: '100%',
      padding: theme.spacing(4, 8),
      backgroundColor: theme.palette.background.paper,
      borderRadius: 12,
      cursor: 'pointer',

      [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(4, 4),
      },
    },
    infoWrapper: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      gap: theme.spacing(2),
      overflow: 'hidden',

      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(3),
      },
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleText: {
      color: isLightTheme(theme)
        ? theme.palette.text.primary
        : theme.palette.common.white,
    },
    text: {
      display: '-webkit-box',
      '-webkit-line-clamp': '2',
      '-webkit-box-orient': 'vertical',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      height: '3em',
      lineHeight: '1.5em',

      color: isLightTheme(theme)
        ? theme.palette.text.primary
        : theme.palette.grey[500],

      [theme.breakpoints.up('sm')]: {
        display: 'inline',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        height: 20,
        lineHeight: '19.6px',
      },
    },
    message: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(5),
    },
    chevronIcon: {
      color: theme.palette.text.secondary,
      height: 20,
      width: 20,
    },
    date: {
      whiteSpace: 'nowrap',
    },
    desktopElement: {
      display: 'none',

      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    mobileElement: {
      display: 'flex',

      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  }),
);
