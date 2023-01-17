import { lighten, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSelectWalletStyles = makeStyles<Theme>(theme => ({
  walletItem: {
    position: 'relative',
    width: 200,
    height: 'auto',
    padding: theme.spacing(4, 5, 1.5, 5),
    margin: theme.spacing(1, 0, 0, 0),
    border: `1px solid ${lighten(theme.palette.text.secondary, 0.7)}`,
    borderRadius: 32,
  },
  walletName: {
    marginBottom: theme.spacing(1),
  },
  action: {
    fontSize: 11,
  },
  preferable: {
    position: 'absolute',
    left: 0,
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
