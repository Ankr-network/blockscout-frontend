import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  tableRoot: {
    margin: 0,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
}));
