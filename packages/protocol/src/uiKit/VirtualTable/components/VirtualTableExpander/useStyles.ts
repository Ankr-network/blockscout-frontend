import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  icon: {
    '&&': {
      border: 'none',
      padding: theme.spacing(2 * 1),
      fontSize: 11,
    },
  },
  expanded: {
    transform: 'rotate(180deg)',
  },
}));
