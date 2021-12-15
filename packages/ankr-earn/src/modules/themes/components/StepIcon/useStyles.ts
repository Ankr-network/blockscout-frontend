import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  icon: {
    width: 20,
    height: 20,
    background: theme.palette.background.default,
    borderRadius: '50%',
  },
  active: {
    background: theme.palette.primary.main,
  },
}));
