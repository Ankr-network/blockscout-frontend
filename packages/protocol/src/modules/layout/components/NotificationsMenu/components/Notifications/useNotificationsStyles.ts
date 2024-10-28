import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useNotificationsStyles = makeStyles({ name: 'Notifications' })(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto',
      padding: theme.spacing(0, 4),
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
      width: '100%',
      padding: theme.spacing(4, 0),
      borderBottom: `1px solid ${theme.palette.divider}`,
      cursor: 'pointer',

      '&:last-of-type': {
        borderBottom: 'none',
      },
    },
    infoWrapper: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      gap: theme.spacing(1),
      overflow: 'hidden',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(2),
    },
    titleText: {
      display: 'inline',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    text: {
      display: 'inline',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: isLightTheme(theme)
        ? theme.palette.text.primary
        : theme.palette.grey[500],
    },
    date: {
      whiteSpace: 'nowrap',
    },
  }),
);
