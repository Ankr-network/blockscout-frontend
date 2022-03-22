import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  description: {
    display: 'flex',
  },
  archive: {
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
  },
}));
