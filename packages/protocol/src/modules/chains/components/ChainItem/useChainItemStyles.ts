import { makeStyles } from 'tss-react/mui';

export const useChainItemStyles = makeStyles()(theme => ({
  chainItemWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.5, 2, 0.5, 1),
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));
