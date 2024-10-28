import { makeStyles } from 'tss-react/mui';

import { DEFAULT_MENU_PAPER_SHADOW } from 'modules/common/styles/const';

export const useNotificationsMenuStyles = makeStyles<boolean>()(
  (theme, isOpened) => ({
    paper: {
      width: 240,
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),

      borderRadius: 16,

      boxShadow: DEFAULT_MENU_PAPER_SHADOW,

      transform: 'translateY(12px)',
    },
    button: {
      width: 32,
      minWidth: 32,
      height: 32,
      backgroundColor: isOpened ? theme.palette.grey[100] : 'unset',
    },
    icon: {
      width: 20,
      height: 20,
      '&&': {
        color: theme.palette.text.secondary,
      },
    },
    menuIcon: {
      width: 24,
      height: 24,
      color: theme.palette.text.secondary,
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
  }),
);
