import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FONTS } from 'modules/themes/mainTheme';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2.5, 2.5, 2),
    fontFamily: FONTS.secondary,
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: '18px !important',
  },
  top: {
    fontFamily: 'inherit',
  },
  bottom: {
    fontFamily: 'inherit',
  },
}));
