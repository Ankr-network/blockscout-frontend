import { makeStyles } from 'tss-react/mui';

export const useEmptyStateStyles = makeStyles({ name: 'EmptyState' })(
  theme => ({
    root: {
      padding: theme.spacing(15, 4, 4, 4),
    },
  }),
);
