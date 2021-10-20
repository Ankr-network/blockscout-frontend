import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  topTitle: {
    marginBottom: theme.spacing(2.5),
  },
  bottomTitle: {
    fontWeight: 400,
    maxWidth: 728,
    lineHeight: '100%',
    letterSpacing: '-0.02em',

    [theme.breakpoints.down('xl')]: {
      fontSize: 50,
    },
  },
}));
