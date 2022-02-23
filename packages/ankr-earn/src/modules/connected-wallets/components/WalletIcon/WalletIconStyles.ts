import { makeStyles } from '@material-ui/core';

export const useWalletIconStyles = makeStyles(theme => ({
  icon: {
    display: 'block',
    width: 22,
    height: 22,
    borderRadius: 4,
    color: theme.palette.text.secondary,
    objectFit: 'contain',
  },
}));
