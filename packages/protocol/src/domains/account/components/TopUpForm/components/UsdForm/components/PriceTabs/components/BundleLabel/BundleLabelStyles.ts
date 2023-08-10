import { makeStyles } from 'tss-react/mui';

export const useBundleLabelStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
}));
