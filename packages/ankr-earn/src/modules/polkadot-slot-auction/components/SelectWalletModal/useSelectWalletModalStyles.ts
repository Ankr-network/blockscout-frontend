import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSelectWalletModalStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4, 0),
    maxWidth: 560,
  },
  close: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
  },
}));
