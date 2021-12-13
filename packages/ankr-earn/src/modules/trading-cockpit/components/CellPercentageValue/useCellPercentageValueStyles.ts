import { alpha, makeStyles, Theme } from '@material-ui/core';

export const useCellPercentageValueStyles = makeStyles<Theme>(theme => ({
  text: {
    color: alpha('#00D085', 0.5),
  },
}));
