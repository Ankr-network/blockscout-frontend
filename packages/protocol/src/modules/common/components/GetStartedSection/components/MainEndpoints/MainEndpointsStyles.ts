import { makeStyles } from 'tss-react/mui';

export const useMainEndpointsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));
