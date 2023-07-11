import { makeStyles } from 'tss-react/mui';

export const useCheckoutStepStyles = makeStyles()(theme => ({
  root: {
    marginTop: theme.spacing(8),
  },
  title: {
    marginBottom: theme.spacing(2),
  },

  row: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,

    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(4, 0),
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: 432,
    textAlign: 'right',
  },
  contractAddress: {
    display: 'flex',
    alignItems: 'center',

    color: theme.palette.success.main,

    svg: {
      color: theme.palette.success.main,
    },
  },
  price: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(4, 0),
  },

  planPrice: {
    '& span span': {
      marginLeft: theme.spacing(2),
    },

    '& span': {
      letterSpacing: '-0.02em',
    },

    '& span:last-of-type span': {
      color: theme.palette.primary.main,
    },
  },
  plan: {
    textTransform: 'capitalize',
  },

  chainType: {
    textTransform: 'capitalize',
  },
}));
