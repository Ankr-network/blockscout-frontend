import { makeStyles, Theme } from '@material-ui/core/styles';
import { defaultTheme } from '../../../themes/mainTheme';

export const useSocialsStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    margin: theme.spacing(0, -1),
  },
  link: {
    color: defaultTheme.palette.text.secondary,
    transition: 'color 0.2s',
    background: 'none',
    minWidth: 0,
    padding: theme.spacing(1),
    '&:hover': {
      color: theme.palette.primary.main,
      background: 'none',
    },
  },
}));
