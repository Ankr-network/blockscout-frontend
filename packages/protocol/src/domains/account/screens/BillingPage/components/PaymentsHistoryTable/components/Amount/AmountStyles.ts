import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<boolean | undefined>()(
  (theme, direction) => ({
    cell: {
      color: direction ? theme.palette.success.main : undefined,
    },
  }),
);
