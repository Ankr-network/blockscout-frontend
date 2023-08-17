import { makeStyles } from 'tss-react/mui';

export const useSignoutButtonStyles = makeStyles()(theme => ({
  signoutButton: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2),
    minWidth: 'auto',
    padding: 0,
    maxHeight: 40,
    transition: 'none',
  },
}));
