import { makeStyles } from 'tss-react/mui';

export const usePromoBalanceStyles = makeStyles()(theme => ({
  promo: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));
