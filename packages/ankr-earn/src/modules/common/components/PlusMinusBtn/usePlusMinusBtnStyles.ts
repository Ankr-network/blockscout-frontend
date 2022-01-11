import { makeStyles, Theme } from '@material-ui/core';

export const usePlusMinusBtnStyles = makeStyles<Theme>(theme => ({
  root: {
    width: 48,
    height: 48,
    minWidth: 48,
    padding: 0,
    borderRadius: '50%',

    '& svg': {
      color: 'inherit',
    },
  },
}));
