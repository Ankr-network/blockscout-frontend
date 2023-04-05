import { makeStyles } from 'tss-react/mui';
import { menuItemClasses } from '@mui/material';

export const useGroupItemStyles = makeStyles<boolean>()(
  (theme, isSelected) => ({
    menuItem: {
      padding: theme.spacing(2),
      paddingRight: theme.spacing(3),

      borderRadius: 14,

      letterSpacing: '-0.01em',
      color: theme.palette.grey[900],

      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',

      [`&.${menuItemClasses.selected}`]: {
        width: '100%',

        backgroundColor: theme.palette.background.default,

        color: theme.palette.primary.main,

        fontWeight: 600,
      },
    },
    startIcon: {
      '&&': {
        visibility: isSelected ? 'visible' : 'hidden',

        fontSize: 24,
      },
    },
  }),
);
