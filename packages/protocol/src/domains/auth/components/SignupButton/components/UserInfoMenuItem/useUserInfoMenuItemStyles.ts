import { makeStyles } from 'tss-react/mui';

export const useUserInfoMenuItemStyles = makeStyles()(theme => ({
  root: {
    '&.MuiListItem-button:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    maxHeight: 52,
  },

  left: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    width: '100%',
  },
}));
