import { makeStyles } from 'tss-react/mui';

export const useChainRequestsLabelStyles = makeStyles()(theme => ({
  subtitle: {
    fontSize: 14,
  },
  label: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1, 1.5),
    border: '1px solid rgba(31, 34, 38, 0.1)',
    borderRadius: 18,
    lineHeight: 1,
  },
}));
