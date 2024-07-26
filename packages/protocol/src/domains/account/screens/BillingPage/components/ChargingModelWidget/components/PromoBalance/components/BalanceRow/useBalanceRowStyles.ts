import { makeStyles } from 'tss-react/mui';

export const useBalanceRowStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(7.5),

    height: 40,
  },
  title: {
    flexBasis: 148,

    color: theme.palette.text.primary,
  },
  balance: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    color: theme.palette.text.primary,
  },
  requests: {
    color: theme.palette.text.secondary,
  },
}));
