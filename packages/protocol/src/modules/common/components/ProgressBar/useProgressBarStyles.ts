import { makeStyles } from 'tss-react/mui';

export const useProgressBarStyles = makeStyles()(theme => ({
  progressLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
}));
