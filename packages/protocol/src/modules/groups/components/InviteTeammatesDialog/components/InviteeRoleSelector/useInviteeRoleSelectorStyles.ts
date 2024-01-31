import { menuItemClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useInviteeRoleSelectorStyles = makeStyles()(theme => ({
  input: {
    padding: theme.spacing(3, 3, 3, 4),

    borderRadius: 'inherit',

    '&&': {
      margin: 0,
    },

    '&:focus': {
      borderRadius: 'inherit',

      backgroundColor: theme.palette.background.default,
    },
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,

    padding: theme.spacing(2, 1),
  },
  menuItem: {
    height: 40,
    padding: theme.spacing(0, 3),

    borderRadius: 12,

    [`&.${menuItemClasses.selected}`]: {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));
