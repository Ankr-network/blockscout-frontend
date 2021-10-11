import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 350px',
    gap: theme.spacing(3.5),
    height: 400,
  },
}));
