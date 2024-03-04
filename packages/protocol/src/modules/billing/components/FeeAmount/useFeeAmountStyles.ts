import { makeStyles } from 'tss-react/mui';

export const useFeeAmountStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  amount: {
    color: theme.palette.grey[900],
  },
  txButton: {
    border: 'unset',

    '&&': {
      padding: theme.spacing(2),
    },
  },
  externalLinkIcon: {
    color: theme.palette.text.secondary,
  },
}));
