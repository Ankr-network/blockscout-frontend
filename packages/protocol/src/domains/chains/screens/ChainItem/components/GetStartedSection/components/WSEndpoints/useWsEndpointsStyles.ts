import { makeStyles } from 'tss-react/mui';

export const useWsEdnpointsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 1.75),
  },
}));
