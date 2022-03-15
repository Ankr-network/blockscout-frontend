import { makeStyles } from '@material-ui/core';

export const useStakeFeeInfoStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
}));
