import { makeStyles } from 'tss-react/mui';

export const usePremiumOnlyChainCardStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  button: {
    backgroundColor: theme.palette.background.paper,
  },
}));
