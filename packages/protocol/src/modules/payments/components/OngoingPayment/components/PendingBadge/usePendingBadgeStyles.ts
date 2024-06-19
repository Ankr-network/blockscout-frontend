import { makeStyles } from 'tss-react/mui';

export const usePendingBadgeStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: theme.spacing(0.5, 2),

    borderRadius: 8,

    backgroundColor: theme.palette.grey[100],
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(1),
  },
}));
