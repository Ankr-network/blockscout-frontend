import { makeStyles } from 'tss-react/mui';

export const useTeamMenuStyles = makeStyles()(theme => ({
  menuIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
  deleteMenuItem: {
    color: theme.palette.action.disabled,

    '&:hover': {
      backgroundColor: 'transparent',
    },

    '& svg': {
      color: theme.palette.action.disabled,
    },
  },
}));
