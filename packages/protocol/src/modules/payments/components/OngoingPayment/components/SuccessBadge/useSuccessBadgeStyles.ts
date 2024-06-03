import { makeStyles } from 'tss-react/mui';

export const useSuccessBadgeStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: theme.spacing(0.5, 2),

    borderRadius: 8,

    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.main,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(1),

    color: theme.palette.success.main,
  },
}));
