import { makeStyles } from 'tss-react/mui';

export const useChainStepTableStyles = makeStyles()(theme => ({
  chainRow: {
    cursor: 'pointer',
  },
  inactive: {
    opacity: 0.5,
  },
  checkWrapper: {
    color: theme.palette.success.dark,
  },
  crossWrapper: {
    color: theme.palette.grey[600],
  },
  archiveDataHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  tooltipIcon: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));
