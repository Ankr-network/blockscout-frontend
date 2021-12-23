import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const usePolkadotSlotAuctionStyles = makeStyles<Theme>(
  (theme: Theme) => ({
    wrapper: {},

    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    tabs: {
      display: 'flex',
      flexDirection: 'row',
    },
    tabArea: {
      margin: theme.spacing(0, 4.5, 5, 0),
    },
    tab: {
      fontWeight: 700,
      cursor: 'pointer',
    },
    tabActive: {
      cursor: 'default',
    },

    networkSwitcher: {
      margin: theme.spacing(0, 0, 5, 0),
    },
  }),
);
