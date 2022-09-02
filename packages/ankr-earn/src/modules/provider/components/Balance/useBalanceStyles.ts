import { makeStyles } from '@material-ui/core';

export const useBalanceStyles = makeStyles(() => ({
  tokenValue: {
    fontSize: 14,
    letterSpacing: '-0.02em',
  },

  usdValue: {
    fontSize: 13,
    fontWeight: 400,
    opacity: 0.5,
  },
}));
