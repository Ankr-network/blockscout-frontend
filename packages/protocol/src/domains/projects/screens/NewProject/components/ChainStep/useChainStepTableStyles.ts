import { makeStyles } from 'tss-react/mui';

export const useChainStepTableStyles = makeStyles()(theme => ({
  chainRow: {
    cursor: 'pointer',
  },
  inactive: {
    opacity: 0.5,
  },
  checkWrapper: {
    borderRadius: 8,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
  },
  crossWrapper: {
    borderRadius: 8,
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.grey.A100,
  },
}));
