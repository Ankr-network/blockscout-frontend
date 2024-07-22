import { makeStyles } from 'tss-react/mui';

export const useComingSoonChainCardStyles = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    border: `2px solid ${theme.palette.grey['200']}`,
  },
  badge: {
    borderRadius: 8,
    padding: theme.spacing(0.5, 2),
    backgroundColor: theme.palette.background.paper,
    fontSize: 14,
    textTransform: 'lowercase',
  },
}));
