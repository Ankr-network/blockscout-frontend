import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  icon: {
    '&&': {
      border: 'none',
      padding: theme.spacing(1),
      fontSize: 11,
    },
  },
  expanded: {
    transform: 'rotate(180deg)',
  },
}));
