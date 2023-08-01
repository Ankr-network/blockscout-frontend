import { makeStyles } from 'tss-react/mui';

export const useSubscriptionEditorStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),

    padding: theme.spacing(5, 8),

    borderRadius: 20,

    backgroundColor: theme.palette.background.default,
  },
  price: {
    span: {
      span: {
        fontSize: 16,
      },
    },
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  upgradeButton: {
    minHeight: 48,

    borderRadius: 17,
  },
  cancelButton: {
    '&&': {
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },

    color: theme.palette.error.main,

    minHeight: 48,

    borderRadius: 17,

    '&:hover': {
      boxShadow: 'none',
      color: theme.palette.error.main,
    },
  },
  warning: {
    textAlign: 'center',

    color: theme.palette.text.secondary,

    fontSize: 12,
    fontWeight: 500,
    lineHeight: '135%',
  },
}));
