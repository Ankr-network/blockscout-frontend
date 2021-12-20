import { makeStyles, Theme } from '@material-ui/core';

export const useRightsStyles = makeStyles<Theme>(theme => ({
  root: {
    fontWeight: 400,
    whiteSpace: 'nowrap',
    fontSize: 14,
  },
}));
