import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useGroupMenuButtonStyles = makeStyles<boolean>()(
  (theme, isOpen) => ({
    root: {
      padding: 0,
      minWidth: 'unset',
      borderRadius: 16,
      color: theme.palette.text.primary,
      backgroundColor: isOpen
        ? theme.palette.grey[200]
        : theme.palette.background.paper,

      '&:hover': {
        backgroundColor: theme.palette.grey[200],

        color: isLightTheme(theme) ? undefined : theme.palette.common.white,
      },
    },
    endIcon: {
      '&&&': {
        marginLeft: theme.spacing(1),

        color: isOpen
          ? theme.palette.primary.main
          : theme.palette.text.secondary,
      },
    },
    groupName: {
      marginLeft: theme.spacing(2),
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth: '150px',
      overflow: 'hidden',

      [theme.breakpoints.down('sm')]: {
        maxWidth: '100px',
      },

      [theme.breakpoints.down('xs')]: {
        maxWidth: '50px',
        display: 'none',
      },
    },
  }),
);
