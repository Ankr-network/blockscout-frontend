import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const usePolkadotSlotAuctionStyles = makeStyles<Theme>(theme => ({
  wrapper: {
    margin: theme.spacing(7, 'auto', 12.5),
  },
  tab: {
    cursor: 'pointer',
    fontWeight: 500,
  },
}));
