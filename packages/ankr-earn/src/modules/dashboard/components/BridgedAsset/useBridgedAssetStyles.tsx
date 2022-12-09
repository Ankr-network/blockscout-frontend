import { makeStyles } from '@material-ui/core';

export const useStakingBridgeAssetStyles = makeStyles(theme => ({
  amountInfoSplitter: {
    width: 'auto',
    height: 10,
    margin: theme.spacing('-2px', '6px', 0, '6px'),
    borderLeft: `1px solid ${theme.palette.text.secondary}`,
  },

  wrapper: {
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
  },

  tradeButton: {
    fontSize: 16,
    height: 44,
    width: 130,

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));
