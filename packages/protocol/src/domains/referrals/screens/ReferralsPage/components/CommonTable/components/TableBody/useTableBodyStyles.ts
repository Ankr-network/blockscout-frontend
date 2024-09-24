import { makeStyles } from 'tss-react/mui';

const name = 'TableBody';

export const useTableBodyStyles = makeStyles({ name })(theme => ({
  placeholder: {
    margin: theme.spacing(15, 'auto'),
  },
}));
