import { makeStyles } from '@material-ui/core';

export const useBaseAnkrAmountStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },

  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'inherit',
    justifyContent: 'center',
  },

  usdAmount: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
}));
