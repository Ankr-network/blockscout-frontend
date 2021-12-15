import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeTermStyles = makeStyles<Theme>(theme => ({
  root: {
    alignSelf: 'center',

    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
    },
  },
}));
