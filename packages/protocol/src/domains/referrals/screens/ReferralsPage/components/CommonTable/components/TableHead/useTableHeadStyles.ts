import { makeStyles } from 'tss-react/mui';

const name = 'TableHead';

export const useTableHeadStyles = makeStyles({ name })(theme => ({
  cell: {
    verticalAlign: 'top',

    [theme.breakpoints.down('sm')]: {
      height: 40,
    },
  },
}));
