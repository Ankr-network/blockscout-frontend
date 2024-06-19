import { makeStyles } from 'tss-react/mui';

export const useTxDetailsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  title: {
    color: theme.palette.grey[900],
  },
}));
