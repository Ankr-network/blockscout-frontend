import { makeStyles } from 'tss-react/mui';

export const useSubscriptionEditorStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(5, 8),

    borderRadius: 20,
    border: `2px solid ${theme.palette.grey[100]}`,
  },
  price: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    span: {
      span: {
        fontSize: 14,
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
      boxShadow: `0 0 0 2px ${theme.palette.grey[100]}`,
    },

    transition: 'color 0.3s, background-color 0.3s',

    color: theme.palette.error.main,

    minHeight: 48,

    borderRadius: 17,

    '&:hover': {
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
