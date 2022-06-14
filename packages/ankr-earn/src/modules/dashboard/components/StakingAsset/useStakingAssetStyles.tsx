import { makeStyles } from '@material-ui/core';

export const useStakingAssetStyles = makeStyles(theme => ({
  amountInfoSplitter: {
    width: 'auto',
    height: 10,
    margin: theme.spacing('-2px', '6px', 0, '6px'),
    borderLeft: `1px solid ${theme.palette.text.secondary}`,
  },
  amountInfoIcon: {
    margin: theme.spacing('-2px', 0, 0, '3px'),

    '& > button:active': {
      transform: 'none',
    },
  },

  tradeButton: {
    width: 115,
  },
}));
