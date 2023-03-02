import { makeStyles } from 'tss-react/mui';

export const useLearnMoreStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
  },
}));
