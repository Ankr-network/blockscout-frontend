import { makeStyles } from '@material-ui/core';

export const usePolkadotSlotAuctionStyles = makeStyles(theme => ({
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
    marginLeft: theme.spacing(4.5),

    '&:first-of-type': {
      marginLeft: 0,
    },
  },

  tab: {
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: 24,

    [theme.breakpoints.up('md')]: {
      fontSize: 30,
    },
  },
  tabActive: {
    cursor: 'default',
  },
}));
