import { makeStyles } from 'tss-react/mui';

export interface UseStylesParams {
  isMenuOpen: boolean;
}

export const useBalanceButtonStyles = makeStyles<UseStylesParams>()(
  (theme, { isMenuOpen }) => ({
    buttonRoot: {
      flexShrink: 0,
      border: 'none',
      backgroundColor: isMenuOpen
        ? theme.palette.grey[200]
        : theme.palette.background.paper,

      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    sidebarTypeButtonRoot: {
      border: `2px solid ${theme.palette.grey[100]}`,
    },

    mobileTypeButtonRoot: {
      padding: theme.spacing(2.5, 3),
      border: `2px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing(3),
      backgroundColor: theme.palette.background.paper,

      [theme.breakpoints.down('xs')]: {
        display: 'inline-flex',
        minWidth: 40,
      },
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
    },

    mobileTypeContent: {
      gap: theme.spacing(1.5),
    },

    label: {
      fontWeight: 500,
      fontSize: theme.spacing(3.5),
    },
    mobileTypeLabel: {
      fontWeight: 600,
      fontSize: 11,
      lineHeight: theme.spacing(4),

      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    balance: {
      marginRight: theme.spacing(1),

      '& > span': {
        color: theme.palette.text.secondary,
      },

      '& > span > span': {
        color: theme.palette.text.primary,
      },
    },
    selectIcon: {
      '&&': {
        color: theme.palette.text.secondary,
      },

      transition: 'transform 100ms',

      transform: isMenuOpen ? 'rotate(180deg)' : 'none',
      transformOrigin: '50% 50%',
    },
  }),
);
