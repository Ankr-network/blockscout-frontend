import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSelectWalletStyles = makeStyles<Theme>(theme => ({
  walletItem: {
    padding: theme.spacing(4, 5, 1.5, 5),
    background: theme.palette.background.paper,
    borderRadius: 32,
    position: 'relative',
    '&:not(:first-child)': {
      marginLeft: theme.spacing(4),
    },
  },
  walletName: {
    marginBottom: theme.spacing(1),
  },
  action: {
    fontSize: 11,
  },
  preferable: {
    position: 'absolute',
    left: -6,
    top: 8,
    background: 'rgba(39, 113, 255, 0.3)',
    padding: theme.spacing(0.5, 1),
    fontSize: 13,
    color: 'white',
    borderRadius: 4,
  },
  link: {
    cursor: 'pointer',
  },
}));
