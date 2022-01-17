import { lighten, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSelectWalletStyles = makeStyles<Theme>(theme => ({
  walletItem: {
    position: 'relative',
    width: 200,
    height: 'auto',
    padding: theme.spacing(4, 5, 1.5, 5),
    border: `1px solid ${lighten(theme.palette.text.secondary, 0.7)}`,
    borderRadius: 32,

    '&:not(:first-child)': {
      marginLeft: theme.spacing(4),
    },
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.background.default,
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
