import { makeStyles } from 'tss-react/mui';

export const useEmailBlockStyles = makeStyles()(theme => ({
  root: {
    width: 424,
    height: 40,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2, 2, 2, 3),
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    color: theme.palette.text.secondary,
  },
  icon: {
    strokeWidth: 1.5,
  },
}));
