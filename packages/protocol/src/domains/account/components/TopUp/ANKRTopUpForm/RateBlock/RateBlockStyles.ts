import { makeStyles, Theme } from '@material-ui/core';

export const useRateBlockStyles = makeStyles<Theme>(theme => ({
  rate: {
    fontWeight: 400,
    marginBottom: theme.spacing(0.5),

    [theme.breakpoints.down('sm')]: {
      order: 1,
      width: '100%',
    },
  },
  skeleton: {
    height: 32,
    marginTop: -7,
    width: '60%',
    margin: 'auto',
    borderRadius: theme.spacing(1),
  },
}));
