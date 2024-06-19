import { makeStyles } from 'tss-react/mui';

export const useAmountHeaderStyles = makeStyles()(theme => ({
  amountHeaderRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.grey[900],
  },
  link: {
    '&&': {
      color: theme.palette.primary.main,
    },

    '&:hover': {
      textDecoration: 'none',
    },
  },
}));
