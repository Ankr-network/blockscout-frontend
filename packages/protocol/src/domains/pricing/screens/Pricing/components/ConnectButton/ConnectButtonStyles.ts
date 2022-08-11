import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  unlockBtn: {
    marginTop: theme.spacing(3.5),
    height: 52,
    padding: theme.spacing(1, 3),
    flexShrink: 0,
  },
  unlockBtnTitle: {
    fontSize: 19,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
}));
