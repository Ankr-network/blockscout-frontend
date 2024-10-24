import { makeStyles } from 'tss-react/mui';

export const useLoadingStateStyles = makeStyles({
  name: 'NotificationsPageLoadingState',
})(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    width: '100%',
    padding: theme.spacing(4, 8),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
  },
  textWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  icon: {
    height: 40,
    width: 40,
    minWidth: 40,
  },
  title: {
    height: 22,
    minWidth: 50,
    width: '50%',
  },
  description: {
    height: 20,
    width: '100%',
  },
}));
