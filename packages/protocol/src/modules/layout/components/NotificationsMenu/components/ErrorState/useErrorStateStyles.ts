import { makeStyles } from 'tss-react/mui';

export const useErrorStateStyles = makeStyles({ name: 'ErrorState' })(
  theme => ({
    root: {
      padding: theme.spacing(15, 4, 4, 4),
    },
  }),
);
