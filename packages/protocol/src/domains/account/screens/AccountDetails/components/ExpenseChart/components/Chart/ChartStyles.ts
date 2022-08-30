import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  chartRoot: {
    padding: `${theme.spacing(2.5)}px ${theme.spacing(3.75)}px`,
    borderRadius: 30,

    backgroundColor: theme.palette.background.paper,
  },
}));
