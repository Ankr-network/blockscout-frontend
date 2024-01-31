import { makeStyles } from 'tss-react/mui';

export const useUserRoleMenuButtonStyles = makeStyles<boolean>()(
  (theme, isMenuOpen) => ({
    root: {
      padding: theme.spacing(1.5, 2, 1.5, 3),
      minWidth: '132px',
      justifyContent: 'space-between',

      color: theme.palette.text.primary,

      '&:hover': {
        color: theme.palette.text.primary,
        border: `2px solid ${theme.palette.primary.main}`,
      },

      '&&': {
        border: isMenuOpen ? `2px solid ${theme.palette.primary.main}` : 'none',
      },
    },
    endIcon: {
      marginLeft: theme.spacing(),
    },
    selectIcon: {
      color: theme.palette.text.primary,
      transition: 'transform 100ms',

      transform: isMenuOpen ? 'rotate(180deg)' : 'none',
      transformOrigin: '50% 50%',
    },
  }),
);
