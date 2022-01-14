import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useWalletIconStyles = makeStyles<Theme>(theme => ({
  icon: {
    display: 'block',
    width: 22,
    height: 22,
    borderRadius: 4,
    color: theme.palette.text.secondary,
    objectFit: 'contain',
  },
}));
