import { makeStyles } from 'tss-react/mui';

const name = 'PromoBalance';

export const usePromoBalanceStyles = makeStyles({ name })(theme => ({
  promo: {
    borderBottom: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3),
    },
  },
  currentBalance: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
    },
  },
}));
