import { makeStyles } from 'tss-react/mui';

export const useOngoingPaymentsStyles = makeStyles()(theme => ({
  title: {
    marginBottom: theme.spacing(5),

    color: theme.palette.grey[900],
  },
}));
