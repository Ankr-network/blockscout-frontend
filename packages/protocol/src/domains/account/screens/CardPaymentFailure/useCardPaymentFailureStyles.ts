import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useCardPaymentFailureStyles = makeStyles<Theme>(theme => ({
  title: {
    fontSize: 34,
    lineHeight: '40px',
    fontWeight: 700,
  },
  description: {
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 400,
    marginBottom: theme.spacing(3.75),
  },
}));
