import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(3.5),
    marginTop: 'auto',
  },
  wrappper: {
    minWidth: 250,
  },
}));
