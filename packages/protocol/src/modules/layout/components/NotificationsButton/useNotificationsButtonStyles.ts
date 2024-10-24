import { makeStyles } from 'tss-react/mui';

export interface UseStylesParams {
  isMenuOpen: boolean;
}

export const useNotificationsButtonStyles = makeStyles<
  UseStylesParams,
  'amountBadge'
>()((theme, { isMenuOpen }, classes) => ({
  root: {
    position: 'relative',
    flexShrink: 0,
    border: 'none',
    backgroundColor: isMenuOpen
      ? theme.palette.grey[200]
      : theme.palette.background.paper,

    '&:hover': {
      backgroundColor: theme.palette.grey[200],

      [`& .${classes.amountBadge}`]: {
        border: `1.5px solid ${theme.palette.grey[200]}`,
      },
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  bell: {
    fontSize: 20,
  },
  amountBadge: {
    position: 'absolute',
    top: 3,
    left: 22,
    border: isMenuOpen
      ? `1.5px solid ${theme.palette.grey[200]}`
      : `1.5px solid ${theme.palette.background.paper}`,
  },
  selectIcon: {
    '&&': {
      color: isMenuOpen
        ? theme.palette.primary.main
        : theme.palette.text.secondary,
    },

    transition: 'transform 100ms',

    transform: isMenuOpen ? 'rotate(180deg)' : 'none',
    transformOrigin: '50% 50%',
  },
}));
