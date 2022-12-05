import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const usePricingTopUpStyles = makeStyles<Theme>(theme => ({
  formBlockTitle: {
    marginBottom: theme.spacing(1.5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formAmount: {
    fontWeight: 400,
  },
  balanceSkeleton: {
    width: 145,
    height: 24.5,
    borderRadius: 8,
  },
  topUp: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 0, 0.5),
    },
  },
}));
