import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  label: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.5, 1),
    borderRadius: 6,
  },
  tooltip: {
    display: 'inline',
  },
}));
