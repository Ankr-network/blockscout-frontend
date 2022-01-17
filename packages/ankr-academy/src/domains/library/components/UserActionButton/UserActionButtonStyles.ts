import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useUserActionButtonStyles = makeStyles<Theme>(theme => ({
  btn: {
    display: 'block',
    margin: `${theme.spacing(6)}px auto`,
  },
}));
