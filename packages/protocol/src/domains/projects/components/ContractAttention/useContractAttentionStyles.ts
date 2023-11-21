import { makeStyles } from 'tss-react/mui';

export const useContractAttentionStyles = makeStyles()(theme => ({
  top: {
    display: 'flex',

    marginBottom: theme.spacing(3),
  },
  icon: {
    position: 'relative',
    top: 2,

    marginRight: theme.spacing(2),

    color: theme.palette.error.main,

    fontSize: 20,
  },
  code: {
    display: 'inline-flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  codeBadge: {
    padding: theme.spacing(0.5, 2),

    borderRadius: 8,

    background: theme.palette.background.default,

    fontSize: 14,
  },
}));
