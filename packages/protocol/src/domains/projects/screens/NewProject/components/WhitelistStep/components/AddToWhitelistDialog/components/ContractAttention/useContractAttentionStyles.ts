import { makeStyles } from 'tss-react/mui';

export const useContractAttentionStyles = makeStyles()(theme => ({
  top: {
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
  icon: {
    fontSize: 20,
    color: theme.palette.error.main,
    marginRight: theme.spacing(2),
    position: 'relative',
    top: 2,
  },
  code: {
    display: 'inline-flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  codeBadge: {
    borderRadius: 8,
    padding: theme.spacing(0.5, 2),
    background: theme.palette.background.default,
    fontSize: 14,
  },
}));
