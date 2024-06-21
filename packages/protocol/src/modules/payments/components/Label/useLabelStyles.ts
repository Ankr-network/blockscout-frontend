import { makeStyles } from 'tss-react/mui';

export const useLabelStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
}));
