import { makeStyles } from 'tss-react/mui';

export const useFiltersStyles = makeStyles({
  name: 'NotificationsMenuFilters',
})(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 5),
    gap: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));
