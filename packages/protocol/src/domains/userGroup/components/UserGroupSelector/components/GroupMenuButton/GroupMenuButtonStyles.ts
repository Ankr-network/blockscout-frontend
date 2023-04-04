import { makeStyles } from 'tss-react/mui';

export const useGroupMenuButtonStyles = makeStyles<boolean>()(
  (theme, isMenuOpen) => ({
    root: {
      padding: 0,
      minWidth: 'unset',

      color: theme.palette.grey[600],

      '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.grey[600],
      },
    },
    endIcon: {
      marginLeft: theme.spacing(),
    },
    arrow: {
      transition: 'transform 100ms',

      transform: isMenuOpen ? 'rotate(180deg)' : 'none',
      transformOrigin: '50% 50%',
    },
  }),
);
