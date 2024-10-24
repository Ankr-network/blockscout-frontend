import { makeStyles } from 'tss-react/mui';

export const useFiltersStyles = makeStyles({
  name: 'NotificationsPageFilters ',
})(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
  },
  fitlers: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  menuWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  checkbox: {
    '--checkbox-background': 'unset',
  },
}));
