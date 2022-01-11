import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSelectWalletModalStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(4, 0),
    maxWidth: 560,
  },
  close: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    border: 'none',
  },
}));
