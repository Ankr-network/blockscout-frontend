import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useCardPaymentSuccessStyles = makeStyles()((theme: Theme) => ({
  title: {
    fontSize: 34,
    lineHeight: theme.spacing(2 * 5),
    fontWeight: 700,
  },
  description: {
    fontSize: 20,
    lineHeight: theme.spacing(2 * 3.5),
    fontWeight: 400,
    marginBottom: theme.spacing(2 * 3.75),
  },
}));
