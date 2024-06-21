import { makeStyles } from 'tss-react/mui';

export const useTotalAmountAttributeStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    color: theme.palette.grey[900],
  },
  value: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: theme.spacing(1),
  },
  totalAmount: {
    color: theme.palette.grey[900],
  },
  totalAmountDescription: {
    color: theme.palette.text.secondary,
  },
}));
