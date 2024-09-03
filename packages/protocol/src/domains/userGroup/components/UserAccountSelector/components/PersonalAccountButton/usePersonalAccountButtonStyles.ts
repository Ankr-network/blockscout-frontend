import { makeStyles } from 'tss-react/mui';

export const usePersonalAccountButtonStyles = makeStyles()(theme => ({
  root: {
    gap: theme.spacing(3),

    '&&': {
      padding: 0,
    },

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  startIcon: {
    '&&&': {
      margin: 0,
    },
  },
  accountInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(0.5),
  },
  accountSettings: {
    fontSize: 14,
    fontWeight: 500,
  },
  accountName: {
    color: theme.palette.grey[900],
    textAlign: 'left',
  },
}));
