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
    content: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
    balance: {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: theme.spacing(3.5),
    },
    balanceValue: {
      color: theme.palette.text.primary,
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
